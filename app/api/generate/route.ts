import { NextResponse } from "next/server";
import { createPortfolioForUser } from "@/lib/services/portfolio";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in with GitHub." },
        { status: 401 }
      );
    }

    const providerToken = session.provider_token || process.env.GITHUB_TOKEN;

    const body = await req.json();

    // Support both old format { username } and new format { github, devto, medium }
    const socials = {
      github: body.github || body.username || session.user.user_metadata?.user_name,
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
    const user = await createPortfolioForUser(socials, providerToken);

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
