"use server";

import * as React from "react";
import { google } from "googleapis";
import { Resend, type CreateEmailOptions } from "resend";
import { z } from "zod";

import { ApplicationConfirmationEmail } from "@/components/emails/ApplicationConfirmation";
import { ApplicationNotificationEmail } from "@/components/emails/ApplicationNotificationEmail";
import { getGoogleConfig } from "@/lib/google-config";
import { supabase } from "@/lib/supabase";

const DEFAULT_FROM_ADDRESS = "Haiti Bright Futures <onboarding@resend.dev>";
const DEFAULT_NOTIFICATION_EMAIL = "info@hbfhaiti.org";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  school: z.string().min(2, "School is required"),
  grade: z.enum(["NS3"], { error: "Seulement NS3 est autorisé pour le moment" }),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  sex: z.enum(["Male", "Female"], { error: "Sex is required" }),
  nifCin: z.string().regex(/^\d*$/, "NIF/CIN ne doit contenir que des chiffres").optional().or(z.literal("")),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().optional().or(z.literal("")),
  guardianEmail: z.string().email("Invalid guardian email address").optional().or(z.literal("")).or(z.string().length(0)),
  consent: z.enum(["on", "true"], { error: "Consent agreement is required" }),
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

async function uploadFileToSupabase(file: File, applicationId: string, type: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/${type}-${Date.now()}.${fileExt}`;
    
    console.log(`Attempting to upload ${file.name} to Supabase storage: ${fileName}...`);
    
    const buffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from("applications")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("applications")
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error(`Error uploading ${file.name} to Supabase:`, message);
    return `ERROR: ${message}`;
  }
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

function getNotificationRecipients() {
  const configured = parseEmailList(process.env.APPLICATION_NOTIFICATION_TO);
  if (configured.length > 0) return configured;
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

function sanitizeNameForId(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

function getNamePrefixForId(value: string) {
  return sanitizeNameForId(value).slice(0, 2);
}

function generateApplicationId(firstName: string, lastName: string) {
  const digits = Math.floor(100000 + Math.random() * 900000).toString();
  const first = getNamePrefixForId(firstName);
  const last = getNamePrefixForId(lastName);
  return `HBF-${digits}-${first}${last}`;
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

  return data.id;
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
    const applicationId = generateApplicationId(validatedData.firstName, validatedData.lastName);
    const submittedAt = new Date().toLocaleString("en-US");

    const googleConfig = getGoogleConfig();

    if (process.env.GOOGLE_SHEET_ID && googleConfig) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: googleConfig.client_email,
          private_key: googleConfig.private_key,
        },
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
          "https://www.googleapis.com/auth/drive.file"
        ],
      });

      const sheets = google.sheets({ version: "v4", auth });

      const possibleSheets = ["Feuille 1", "Sheet 1"];
      let activeSheetName = "";

      // Try to find which sheet exists
      for (const name of possibleSheets) {
        try {
          await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: `'${name}'!A1`,
          });
          activeSheetName = name;
          break;
        } catch (e) {
          continue;
        }
      }

      if (!activeSheetName) {
        console.warn("Could not find 'Feuille 1' or 'Sheet 1', falling back to 'Feuille 1'");
        activeSheetName = "Feuille 1";
      }

      try {
        const existingEmailsResponse = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: `'${activeSheetName}'!J:J`,
        });

        const existingEmails = (existingEmailsResponse.data.values || [])
          .map((row) => String(row[0] ?? "").trim().toLowerCase())
          .filter(Boolean);

        if (existingEmails.includes(validatedData.email.trim().toLowerCase())) {
          return { success: false, error: "Une demande a déjà été soumise avec cet email." };
        }
      } catch (duplicateCheckError) {
        console.error("Duplicate check failed:", duplicateCheckError);
        // If it's a permission error, we should probably stop here or report it
        if (String(duplicateCheckError).includes("403")) {
          return { success: false, error: "Erreur de permission Google Sheets (Live). Vérifiez le partage du fichier." };
        }
      }
      
      // Upload files to Supabase and get their links
      const uploadResults = await Promise.all([
        essay ? uploadFileToSupabase(essay, applicationId, "essay") : null,
        studentNifFile ? uploadFileToSupabase(studentNifFile, applicationId, "nif") : null,
        photo ? uploadFileToSupabase(photo, applicationId, "photo") : null,
      ]);

      const [essayLink, nifLink, photoLink] = uploadResults;

      try {
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: `'${activeSheetName}'!A:U`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                submittedAt,
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
                essayLink || "",
                nifLink || "",
                photoLink || "",
                "Consent granted",
              ],
            ],
          },
        });
      } catch (sheetError) {
        console.error("Failed to append to Google Sheet:", sheetError);
        return { success: false, error: "Erreur lors de l'enregistrement dans Google Sheets. Vérifiez le partage." };
      }

    } else {
      console.warn("Google Sheets credentials missing, skipping sheet update.");
    }

    const resend = getResendClient();

    if (resend) {
      const applicantName = `${validatedData.firstName} ${validatedData.lastName}`;
      const attachments = await Promise.all(
        [essay, studentNifFile, photo].filter((file): file is File => Boolean(file)).map(fileToAttachment),
      );

      await sendEmailOrThrow(
        resend,
        {
          from: getFromAddress(),
          to: getNotificationRecipients(),
          replyTo: validatedData.email,
          subject: "New Application Submission from Haiti Bright Futures",
          react: React.createElement(ApplicationNotificationEmail, {
            logoUrl: getEmailLogoUrl(),
            submittedAt,
            applicationId,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            dateOfBirth: validatedData.dateOfBirth,
            school: validatedData.school,
            grade: validatedData.grade,
            address: validatedData.address,
            phone: validatedData.phone,
            email: validatedData.email,
            sex: validatedData.sex,
            nifCin: validatedData.nifCin,
            guardianName: validatedData.guardianName,
            guardianPhone: validatedData.guardianPhone,
            guardianEmail: validatedData.guardianEmail,
            essayName: essay.name,
            studentNifFileName: studentNifFile?.name || undefined,
            photoName: photo?.name || undefined,
          }),
          attachments,
        },
        "Failed to send admin notification email",
      );

      await sendEmailOrThrow(
        resend,
        {
          from: getFromAddress(),
          to: validatedData.email,
          replyTo: getNotificationRecipients(),
          subject: "Confirmation de votre soumission",
          react: React.createElement(ApplicationConfirmationEmail, {
            logoUrl: getEmailLogoUrl(),
            studentName: applicantName,
            applicationId,
          }),
        },
        "Failed to send applicant confirmation email",
      );
    } else {
      console.warn("Resend API key missing, skipping application emails.");
    }

    // AUTOMATION: Increment the 'applicants' counter in scholarship_stats
    try {
      const { data: currentStat } = await (await import("@/lib/supabase")).supabase
        .from("scholarship_stats")
        .select("value")
        .eq("id", "applicants")
        .single();
      
      if (currentStat) {
        await (await import("@/lib/supabase")).supabase
          .from("scholarship_stats")
          .update({ value: (currentStat.value || 0) + 1 })
          .eq("id", "applicants");
      }
    } catch (err) {
      console.error("Failed to auto-increment applicant counter:", err);
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("Failed to send admin notification email")) {
      const details = getContextErrorDetails(message, "Failed to send admin notification email");
      return {
        success: false,
        error: `Application saved but admin notification email failed: ${details}`,
      };
    }

    if (message.includes("Failed to send applicant confirmation email")) {
      const details = getContextErrorDetails(message, "Failed to send applicant confirmation email");
      return {
        success: false,
        error: `Application saved but confirmation email failed: ${details}`,
      };
    }

    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation error" };
    }

    console.error("Submission error:", error);
    return { success: false, error: "An error occurred during submission. Please try again." };
  }
}
