"use server";

import { google } from "googleapis";
import { Resend } from "resend";
import { z } from "zod";
import { ApplicationConfirmationEmail } from "@/components/emails/ApplicationConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  school: z.string().min(2, "Le nom de l'école est requis"),
  grade: z.string().min(1, "La classe est requise"),
  message: z.string().optional(),
});

export async function submitApplication(formData: z.infer<typeof schema>) {
  try {
    // 1. Validation
    const validatedData = schema.parse(formData);

    // 2. Google Sheets
    // Note: Ces variables d'environnement doivent être configurées dans .env.local
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:H",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString("fr-FR"),
              validatedData.firstName,
              validatedData.lastName,
              validatedData.email,
              validatedData.phone,
              validatedData.school,
              validatedData.grade,
              validatedData.message || "",
            ],
          ],
        },
      });
    } else {
      console.warn("Google Sheets credentials missing, skipping sheet update.");
    }

    // 3. Email Confirmation
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Haiti Bright Futures <onboarding@resend.dev>", // À remplacer par un email vérifié en production
        to: validatedData.email,
        subject: "Confirmation de votre demande de bourse - Haiti Bright Futures",
        react: ApplicationConfirmationEmail({
          studentName: validatedData.firstName,
          applicationId: Math.random().toString(36).substring(7).toUpperCase(),
        }),
      });
    } else {
      console.warn("Resend API Key missing, skipping confirmation email.");
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "Une erreur est survenue lors de la soumission. Veuillez réessayer." };
  }
}
