"use server";

import * as React from "react";
import { google } from "googleapis";
import { Resend, type CreateEmailOptions } from "resend";
import { z } from "zod";

import { ContactConfirmationEmail } from "@/components/emails/ContactConfirmationEmail";
import { ContactNotificationEmail } from "@/components/emails/ContactNotificationEmail";
import { getGoogleConfig } from "@/lib/google-config";

const DEFAULT_FROM_ADDRESS = "Haiti Bright Futures <onboarding@resend.dev>";
const DEFAULT_NOTIFICATION_EMAIL = "info@hbfhaiti.org";
const DEFAULT_CONTACT_SHEET_RANGE = "A:E";

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

function getPublicSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (value) return value.replace(/\/$/, "");
  return "https://hbfhaiti.org";
}

function getEmailLogoUrl() {
  return `${getPublicSiteUrl()}/api/logo`;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  return apiKey ? new Resend(apiKey) : null;
}

function getContactSpreadsheetId() {
  const configured = process.env.GOOGLE_CONTACT_SHEET_ID?.trim();
  if (!configured) {
    return process.env.GOOGLE_SHEET_ID?.trim() || "";
  }

  const urlMatch = configured.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return urlMatch ? urlMatch[1] : configured;
}

function getContactSheetRange() {
  return process.env.GOOGLE_CONTACT_SHEET_RANGE?.trim() || DEFAULT_CONTACT_SHEET_RANGE;
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
    const submittedAt = new Date().toLocaleString("en-US");

    const spreadsheetId = getContactSpreadsheetId();
    if (spreadsheetId && googleConfig) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: googleConfig.client_email,
          private_key: googleConfig.private_key,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // Detect sheet name (Feuille 1 or Sheet 1)
      const possibleSheets = ["Feuille 1", "Sheet 1"];
      let activeSheetName = "";
      
      for (const name of possibleSheets) {
        try {
          await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `'${name}'!A1`,
          });
          activeSheetName = name;
          break;
        } catch (e) { continue; }
      }

      if (!activeSheetName) activeSheetName = "Feuille 1";

      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: activeSheetName === "Feuille 1" ? "Feuille 1!A:E" : "Sheet 1!A:E",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                submittedAt,
                validatedData.name,
                validatedData.email,
                validatedData.subject,
                validatedData.message,
              ],
            ],
          },
        });
      } catch (sheetError: unknown) {
        const message = getErrorMessage(sheetError);
        console.error("Erreur Google Sheets (contact):", message);
      }
    } else {
      console.warn("Google Sheets config missing for contact form.");
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
        react: React.createElement(ContactNotificationEmail, {
          logoUrl: getEmailLogoUrl(),
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          submittedAt,
        }),
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
        react: React.createElement(ContactConfirmationEmail, {
          logoUrl: getEmailLogoUrl(),
          name: validatedData.name,
          subject: validatedData.subject,
        }),
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
