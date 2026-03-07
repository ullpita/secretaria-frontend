import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_error`);
  }

  // New user → no org yet → onboarding ; existing user → dashboard
  const { data: org } = await supabase
    .from("organizations")
    .select("id")
    .single();

  return NextResponse.redirect(`${origin}${org ? "/dashboard" : "/onboarding/step-2"}`);
}
