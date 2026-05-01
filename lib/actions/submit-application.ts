"use server";

import { google } from "googleapis";
import { Resend } from "resend";
import { z } from "zod";

import { getGoogleConfig } from "@/lib/google-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  school: z.string().min(2, "School is required"),
  grade: z.string().min(1, "Current grade is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  sex: z.enum(["Male", "Female"], { error: "Sex is required" }),
  nifCin: z.string().min(2, "NIF/CIN number is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(8, "Guardian phone number is required"),
  guardianEmail: z.string().email("Invalid guardian email address"),
  consent: z.literal("on", { error: "Consent agreement is required" }),
});

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

async function fileToAttachment(file: File) {
  return {
    filename: file.name,
    content: Buffer.from(await file.arrayBuffer()),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function submitApplication(formData: FormData) {
  try {
    const essay = getFile(formData, "essay");
    const studentNifFile = getFile(formData, "studentNifFile");
    const photo = getFile(formData, "photo");

    if (!essay) {
      return { success: false, error: "Essay file is required." };
    }

    const validatedData = schema.parse({
      firstName: getString(formData, "firstName"),
      lastName: getString(formData, "lastName"),
      dateOfBirth: getString(formData, "dateOfBirth"),
      school: getString(formData, "school"),
      grade: getString(formData, "grade"),
      address: getString(formData, "address"),
      phone: getString(formData, "phone"),
      email: getString(formData, "email"),
      sex: getString(formData, "sex"),
      nifCin: getString(formData, "nifCin"),
      guardianName: getString(formData, "guardianName"),
      guardianPhone: getString(formData, "guardianPhone"),
      guardianEmail: getString(formData, "guardianEmail"),
      consent: getString(formData, "consent"),
    });
    const applicationId = Math.random().toString(36).substring(7).toUpperCase();

    const googleConfig = getGoogleConfig();

    if (process.env.GOOGLE_SHEET_ID && googleConfig) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: googleConfig.client_email,
          private_key: googleConfig.private_key,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "'Feuille 1'!A:U",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString("en-US"),
              applicationId,
              validatedData.firstName,
              validatedData.lastName,
              validatedData.dateOfBirth,
              validatedData.school,
              validatedData.grade,
              validatedData.address,
              validatedData.phone,
              validatedData.email,
              validatedData.sex,
              validatedData.nifCin,
              validatedData.guardianName,
              validatedData.guardianPhone,
              validatedData.guardianEmail,
              essay.name,
              studentNifFile?.name || "",
              photo?.name || "",
              "Consent granted",
            ],
          ],
        },
      });
    } else {
      console.warn("Google Sheets credentials missing, skipping sheet update.");
    }

    if (process.env.RESEND_API_KEY) {
      const applicantName = `${validatedData.firstName} ${validatedData.lastName}`;
      const attachments = await Promise.all(
        [essay, studentNifFile, photo].filter((file): file is File => Boolean(file)).map(fileToAttachment),
      );

      await resend.emails.send({
        from: "Haiti Bright Futures <onboarding@resend.dev>",
        to: "info@hbfhaiti.org",
        subject: "New Application Submission from Haiti Bright Futures",
        html: `
          <h2>New scholarship application</h2>
          <p><strong>Application ID:</strong> ${escapeHtml(applicationId)}</p>
          <p><strong>Name:</strong> ${escapeHtml(applicantName)}</p>
          <p><strong>Date of birth:</strong> ${escapeHtml(validatedData.dateOfBirth)}</p>
          <p><strong>School:</strong> ${escapeHtml(validatedData.school)}</p>
          <p><strong>Current grade:</strong> ${escapeHtml(validatedData.grade)}</p>
          <p><strong>Address:</strong> ${escapeHtml(validatedData.address)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(validatedData.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
          <p><strong>Sex:</strong> ${escapeHtml(validatedData.sex)}</p>
          <p><strong>NIF/CIN:</strong> ${escapeHtml(validatedData.nifCin)}</p>
          <p><strong>Guardian:</strong> ${escapeHtml(validatedData.guardianName)}</p>
          <p><strong>Guardian phone:</strong> ${escapeHtml(validatedData.guardianPhone)}</p>
          <p><strong>Guardian email:</strong> ${escapeHtml(validatedData.guardianEmail)}</p>
          <p><strong>Consent:</strong> Granted</p>
        `,
        attachments,
      });

      await resend.emails.send({
        from: "Haiti Bright Futures <onboarding@resend.dev>",
        to: validatedData.email,
        subject: "Confirmation de votre soumission",
        html: `
          <p>Cher candidat,</p>
          <p>Nous vous remercions d'avoir soumis votre candidature pour la bourse Haiti Bright Futures.</p>
          <p>Votre identifiant de candidature est <strong>#${escapeHtml(applicationId)}</strong>.</p>
          <p>Notre comite d'examen evaluera votre candidature et les candidats retenus seront contactes pour la prochaine etape.</p>
          <p>Cordialement,<br>Comite des bourses Haiti Bright Futures</p>
        `,
      });
    } else {
      console.warn("Resend API Key missing, skipping application emails.");
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "An error occurred during submission. Please try again." };
  }
}
