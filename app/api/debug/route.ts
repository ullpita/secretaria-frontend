import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const sb = await createClient();
  const { data: { user }, error: userError } = await sb.auth.getUser();

  if (!user) {
    return NextResponse.json({ auth: false, userError: userError?.message });
  }

  const { data: org, error: orgError } = await sb
    .from("organizations")
    .select("id, name, owner_id")
    .maybeSingle();

  return NextResponse.json({
    auth: true,
    userId: user.id,
    email: user.email,
    org: org ?? null,
    orgError: orgError?.message ?? null,
  });
}
