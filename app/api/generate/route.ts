import { NextResponse } from "next/server";
import { createPortfolioForUser } from "@/lib/services/portfolio";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support both old format { username } and new format { github, devto, medium }
    const socials = {
      github: body.github || body.username,
      devto: body.devto || undefined,
      medium: body.medium || undefined,
      twitter: body.twitter || undefined,
      linkedin: body.linkedin || undefined,
    };

    if (!socials.github) {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    console.log(`Starting generation for:`, socials);
    const user = await createPortfolioForUser(socials);

    return NextResponse.json({
      success: true,
      user: { username: user.username },
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate portfolio" },
      { status: 500 }
    );
  }
}
