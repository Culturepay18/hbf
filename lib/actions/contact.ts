"use server";

import { google } from "googleapis";
import { z } from "zod";

import { getGoogleConfig } from "@/lib/google-config";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message is too short"),
});

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
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
        return { success: true };
      } catch (sheetError: unknown) {
        const message = getErrorMessage(sheetError);
        console.error("Erreur specifique Google Sheets:", message);
        return { success: false, error: `Erreur Sheets: ${message}` };
      }
    }

    console.error("Variables d'environnement Google Sheets manquantes");
    return { success: false, error: "Configuration .env manquante" };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation error" };
    }

    const message = getErrorMessage(error);
    console.error("Erreur systeme:", message);
    return { success: false, error: message || "Failed to send message" };
  }
}
