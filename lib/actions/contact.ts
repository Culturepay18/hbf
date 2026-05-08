"use server";

import { google } from "googleapis";
import { Resend, type CreateEmailOptions } from "resend";
import { z } from "zod";

import { getGoogleConfig } from "@/lib/google-config";

const DEFAULT_FROM_ADDRESS = "Haiti Bright Futures <onboarding@resend.dev>";
const DEFAULT_NOTIFICATION_EMAIL = "info@hbfhaiti.org";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message is too short"),
});

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

function getContextErrorDetails(message: string, context: string) {
  const prefix = `${context}:`;
  return message.startsWith(prefix) ? message.slice(prefix.length).trim() : message;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseEmailList(value: string | undefined) {
  if (!value) return [];

  return value
    .split(/[,;]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

function getContactRecipients() {
  const contactConfigured = parseEmailList(process.env.CONTACT_NOTIFICATION_TO);
  if (contactConfigured.length > 0) return contactConfigured;

  const appConfigured = parseEmailList(process.env.APPLICATION_NOTIFICATION_TO);
  if (appConfigured.length > 0) return appConfigured;

  return [DEFAULT_NOTIFICATION_EMAIL];
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_ADDRESS;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return apiKey ? new Resend(apiKey) : null;
}

async function sendEmailOrThrow(resend: Resend, payload: CreateEmailOptions, context: string) {
  const { data, error } = await resend.emails.send(payload);

  if (error) {
    const details = error.statusCode ? `${error.message} (status ${error.statusCode})` : error.message;
    throw new Error(`${context}: ${details}`);
  }

  if (!data?.id) {
    throw new Error(`${context}: provider returned no email id`);
  }
}

export async function submitContactForm(formData: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(formData);
    const googleConfig = getGoogleConfig();

    if (process.env.GOOGLE_SHEET_ID && googleConfig) {
      console.log("Tentative de connexion a Google Sheets avec l'ID:", process.env.GOOGLE_SHEET_ID);

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: googleConfig.client_email,
          private_key: googleConfig.private_key,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "'Feuille 1'!A:E",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                new Date().toLocaleString("en-US"),
                validatedData.name,
                validatedData.email,
                validatedData.subject,
                validatedData.message,
              ],
            ],
          },
        });
        console.log("Donnees envoyees avec succes !");
      } catch (sheetError: unknown) {
        const message = getErrorMessage(sheetError);
        console.error("Erreur specifique Google Sheets (contact):", message);
      }
    } else {
      console.warn("Google Sheets config missing for contact form, skipping sheet update.");
    }

    const resend = getResendClient();
    if (!resend) {
      return { success: false, error: "Email service is not configured." };
    }

    await sendEmailOrThrow(
      resend,
      {
        from: getFromAddress(),
        to: getContactRecipients(),
        replyTo: validatedData.email,
        subject: `[Contact] ${validatedData.subject}`,
        html: `
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(validatedData.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(validatedData.subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(validatedData.message).replace(/\n/g, "<br/>")}</p>
        `,
      },
      "Failed to send contact notification email",
    );

    await sendEmailOrThrow(
      resend,
      {
        from: getFromAddress(),
        to: validatedData.email,
        replyTo: getContactRecipients(),
        subject: "We received your message",
        html: `
          <p>Hello ${escapeHtml(validatedData.name)},</p>
          <p>Thank you for contacting Haiti Bright Futures.</p>
          <p>We received your message about <strong>${escapeHtml(validatedData.subject)}</strong> and our team will get back to you soon.</p>
          <p>Best regards,<br/>Haiti Bright Futures Team</p>
        `,
      },
      "Failed to send contact confirmation email",
    );

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation error" };
    }

    const message = getErrorMessage(error);

    if (message.includes("Failed to send contact notification email")) {
      const details = getContextErrorDetails(message, "Failed to send contact notification email");
      return {
        success: false,
        error: `Message saved but notification email failed: ${details}`,
      };
    }

    if (message.includes("Failed to send contact confirmation email")) {
      const details = getContextErrorDetails(message, "Failed to send contact confirmation email");
      return {
        success: false,
        error: `Message sent to team, but confirmation email to sender failed: ${details}`,
      };
    }

    console.error("Erreur systeme:", message);
    return { success: false, error: message || "Failed to send message" };
  }
}
