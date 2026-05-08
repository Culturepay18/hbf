"use server";

import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function createAdminUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string || "Admin";

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  try {
    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert into public.profiles table
    const { error } = await supabase
      .from("profiles")
      .insert([
        { 
          email, 
          password: hashedPassword, 
          role 
        }
      ]);

    if (error) {
      if (error.message.includes("unique_violation")) {
        return { success: false, error: "User with this email already exists." };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Error creating user:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function deleteAdminUser(id: string) {
  try {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to delete user." };
  }
}

export async function resetAdminPassword(id: string, newPassword: string) {
  if (!newPassword) return { success: false, error: "New password is required." };

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const { error } = await supabase
      .from("profiles")
      .update({ password: hashedPassword })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to reset password." };
  }
}
