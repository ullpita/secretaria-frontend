import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json(null, { status: 401 });

  const { data, error } = await sb
    .from("organizations")
    .select("id, name, sector, phone, trial_ends, plan")
    .maybeSingle();

  if (error) {
    console.error("[api/org] error:", error.code, error.message);
    return NextResponse.json(null, { status: 500 });
  }

  return NextResponse.json(data);
}
