import pg from 'pg';
import pkg from '@next/env';
const { loadEnvConfig } = pkg;

loadEnvConfig(process.cwd());

const { Client } = pg;
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  await client.connect();
  console.log("Connected to DB. Adding columns...");

  try {
    await client.query(`
      ALTER TABLE innovation_projects 
      ADD COLUMN IF NOT EXISTS problem TEXT,
      ADD COLUMN IF NOT EXISTS solution TEXT,
      ADD COLUMN IF NOT EXISTS budget TEXT,
      ADD COLUMN IF NOT EXISTS impact TEXT,
      ADD COLUMN IF NOT EXISTS impact_label TEXT DEFAULT 'Projected Impact';
    `);
    console.log("Columns added successfully.");

    // Now let's migrate the existing 3 projects to split their description
    // into problem, solution, budget, impact. We can just hardcode the update for the 3 known slugs.
    const projectsToUpdate = [
      {
        slug: "green-haiti",
        problem: "Excess plastic waste in Cap-Haitien streets leading to clogged drainage and pollution.",
        solution: "A network of community recycling hubs that convert plastic waste into affordable construction materials.",
        budget: "$2,500",
        impact: "Up to 10 tons of plastic waste processed annually and job creation through local recycling hubs.",
        impact_label: "Projected impact"
      },
      {
        slug: "eco-light",
        problem: "Students in underserved areas lack consistent access to lighting for studying after sunset.",
        solution: "Low-cost, solar-powered study lamps manufactured from recycled electronic components and wood.",
        budget: "Estimated Pilot Budget, $4,000 – $6,000",
        impact: "Provide reliable study lighting for 150 – 250 students in underserved areas.",
        impact_label: "Projected Impact"
      },
      {
        slug: "aquapur",
        problem: "Limited access to clean drinking water in peripheral neighborhoods of Cap-Haitien.",
        solution: "A natural filtration system using locally sourced sand, charcoal, and gravel.",
        budget: "Estimated budget, $4,500 - $7,500",
        impact: "Provide clean water access for up to 50 families during the pilot phase.",
        impact_label: "Outcome"
      }
    ];

    for (const p of projectsToUpdate) {
      await client.query(`
        UPDATE innovation_projects
        SET problem = $1, solution = $2, budget = $3, impact = $4, impact_label = $5
        WHERE slug = $6
      `, [p.problem, p.solution, p.budget, p.impact, p.impact_label, p.slug]);
    }
    console.log("Data migrated successfully.");

  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.end();
  }
}

migrate();
