import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

/**
 * Serves the HBF logo as a public image endpoint.
 *
 * Email clients need a publicly accessible URL to display images.
 * Vercel's WAF can block direct requests to static files in /public,
 * but API routes are always reachable, so we serve the logo from here.
 */
export async function GET() {
  try {
    const logoPath = join(process.cwd(), "public", "images", "hbf-logo-transparent.png");
    const buffer = await readFile(logoPath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json({ error: "Logo not found" }, { status: 404 });
  }
}
