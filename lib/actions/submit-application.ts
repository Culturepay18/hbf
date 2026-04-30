"use server";

import { google } from "googleapis";
import { Resend } from "resend";
import { z } from "zod";
import { ApplicationConfirmationEmail } from "@/components/emails/ApplicationConfirmation";

import { getGoogleConfig } from "@/lib/google-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Invalid phone number"),
  school: z.string().min(2, "School name is required"),
  grade: z.string().min(1, "Grade is required"),
  message: z.string().min(10, "Motivation message is required"),
});

export async function submitApplication(formData: z.infer<typeof schema>) {
  try {
    // 1. Validation
    const validatedData = schema.parse(formData);
    const applicationId = Math.random().toString(36).substring(7).toUpperCase();

    // 2. Google Sheets
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
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toLocaleString("en-US"),
              applicationId,
              validatedData.firstName,
              validatedData.lastName,
              validatedData.email,
              validatedData.phone,
              validatedData.school,
              validatedData.grade,
              validatedData.message,
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
        from: "Haiti Bright Futures <onboarding@resend.dev>", 
        to: validatedData.email,
        subject: "Application Confirmation - Haiti Bright Futures",
        react: ApplicationConfirmationEmail({
          studentName: validatedData.firstName,
          applicationId: applicationId,
        }),
      });
    } else {
      console.warn("Resend API Key missing, skipping confirmation email.");
    }

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: "An error occurred during submission. Please try again." };
  }
}
