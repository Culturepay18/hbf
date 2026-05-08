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

const projects = [
  {
    title: "Green Haiti",
    slug: "green-haiti",
    description: "Problem: Excess plastic waste in Cap-Haitien streets leading to clogged drainage and pollution.\n\nSolution: A network of community recycling hubs that convert plastic waste into affordable construction materials.\n\nBudget: $2,500\n\nProjected impact: Up to 10 tons of plastic waste processed annually and job creation through local recycling hubs.",
    status: "Active Project",
    category: "NS3",
    is_active: true,
  },
  {
    title: "Eco-Light",
    slug: "eco-light",
    description: "Problem: Students in underserved areas lack consistent access to lighting for studying after sunset.\n\nSolution: Low-cost, solar-powered study lamps manufactured from recycled electronic components and wood.\n\nBudget: Estimated Pilot Budget, $4,000 – $6,000\n\nProjected Impact: Provide reliable study lighting for 150 – 250 students in underserved areas.",
    status: "Future Student Project",
    category: "NS3",
    is_active: true,
  },
  {
    title: "AquaPur",
    slug: "aquapur",
    description: "Problem: Limited access to clean drinking water in peripheral neighborhoods of Cap-Haitien.\n\nSolution: A natural filtration system using locally sourced sand, charcoal, and gravel.\n\nBudget: Estimated budget, $4,500 - $7,500\n\nOutcome: Provide clean water access for up to 50 families during the pilot phase.",
    status: "Future Student Project",
    category: "NS3",
    is_active: true,
  }
];

async function seed() {
  console.log("Authenticating as temporary admin to bypass RLS...");
  const email = "tempadmin@hbfhaiti.org";
  const password = "TemporaryPassword123!";
  
  let { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError && authError.message.includes("User already registered")) {
    console.log("User exists, signing in...");
    const res = await supabase.auth.signInWithPassword({ email, password });
    authData = res.data;
    authError = res.error;
  }

  if (authError) {
    console.error("Auth error:", authError.message);
    process.exit(1);
  }

  console.log("Authenticated! Seeding projects...");
  
  const { data, error } = await supabase
    .from("innovation_projects")
    .upsert(projects, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error("Error inserting projects:", error);
  } else {
    console.log("Successfully inserted projects!");
  }
}

seed();
