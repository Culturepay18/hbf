import { createClient } from "@supabase/supabase-js";
import pkg from '@next/env';
import ws from 'ws';

const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: { WebSocket: ws },
  realtime: { transport: ws }
});

async function createAdmin() {
  console.log("Creating admin user...");
  const email = "info@hbfhaiti.org";
  const password = "Hbf-admin@2026";
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error creating user:", error.message);
  } else {
    console.log("Successfully created user:", data.user?.email);
    console.log("Please note: You might need to confirm the email in the Supabase Dashboard if email confirmations are enabled.");
  }
}

createAdmin();
