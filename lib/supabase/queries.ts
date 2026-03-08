import { createClient } from "./client";

export type CallRow = {
  id: string;
  org_id: string;
  caller_number: string;
  caller_name: string | null;
  duration_seconds: number;
  started_at: string;
  status: "completed" | "failed" | "ongoing";
  sentiment: "positive" | "neutral" | "negative";
  summary: string | null;
  transcript: { speaker: string; text: string; timestamp: string }[];
  sector: string | null;
  created_at: string;
};

export type CallAction = {
  id: string;
  call_id: string;
  type: "email" | "calendar_event" | "task";
  label: string | null;
  detail: string | null;
  status: "success" | "failed" | "pending" | "rejected";
  error: string | null;
  executed_at: string | null;
  metadata: Record<string, string> | null;
  approved_at: string | null;
  rejected_at: string | null;
};

export type PendingAction = CallAction & {
  call: { caller_name: string | null; caller_number: string; started_at: string } | null;
};

export type TaskRow = {
  id: string;
  org_id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "high" | "medium" | "low";
  due_date: string | null;
  caller_name: string | null;
  caller_phone: string | null;
  notes: string | null;
  call_id: string | null;
  created_at: string;
};

export type OrgRow = {
  id: string;
  name: string;
  sector: string | null;
  phone: string | null;
  trial_ends: string | null;
  plan: string;
};

export type Integration = {
  id: string;
  provider: string;
  connected_at: string;
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export { formatDuration };

export async function getOrg(): Promise<OrgRow | null> {
  const sb = createClient();
  const { data, error } = await sb
    .from("organizations")
    .select("id, name, sector, phone, trial_ends, plan")
    .maybeSingle();
  if (error) console.error("[getOrg] error:", error.code, error.message, error.details);
  return data;
}

export async function getCalls(): Promise<CallRow[]> {
  const sb = createClient();
  const { data } = await sb
    .from("calls")
    .select("*")
    .order("started_at", { ascending: false });
  return data ?? [];
}

export async function getCall(id: string): Promise<CallRow | null> {
  const sb = createClient();
  const { data } = await sb.from("calls").select("*").eq("id", id).single();
  return data;
}

export async function getCallActions(callId: string): Promise<CallAction[]> {
  const sb = createClient();
  const { data } = await sb
    .from("call_actions")
    .select("*")
    .eq("call_id", callId)
    .order("executed_at", { ascending: true });
  return data ?? [];
}

export async function getTasks(): Promise<TaskRow[]> {
  const sb = createClient();
  const { data } = await sb
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskRow["status"]
): Promise<void> {
  const sb = createClient();
  await sb.from("tasks").update({ status }).eq("id", taskId);
}

export async function getPendingActions(): Promise<PendingAction[]> {
  const sb = createClient();
  const { data } = await sb
    .from("call_actions")
    .select("*, call:calls(caller_name, caller_number, started_at)")
    .eq("status", "pending")
    .order("executed_at", { ascending: false });
  return (data ?? []) as PendingAction[];
}

export async function getPendingCount(): Promise<number> {
  const sb = createClient();
  const { count } = await sb
    .from("call_actions")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");
  return count ?? 0;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://web-production-0c79f.up.railway.app";

export async function approveAction(
  actionId: string,
  orgId: string,
  overrides?: { to?: string; subject?: string; body?: string; title?: string; start_datetime?: string; end_datetime?: string; attendee_email?: string }
): Promise<{ status: string; error?: string }> {
  const res = await fetch(`${BACKEND_URL}/actions/${actionId}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ org_id: orgId, ...overrides }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function rejectAction(actionId: string, orgId: string, reason?: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/actions/${actionId}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ org_id: orgId, reason }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function getIntegrations(): Promise<Integration[]> {
  const sb = createClient();
  const { data } = await sb
    .from("integrations")
    .select("id, provider, connected_at");
  return data ?? [];
}

export type PhoneConfig = {
  configured: boolean;
  phone_number: string | null;
  vapi_phone_id: string | null;
  vapi_assistant_id: string | null;
};

export async function getPhoneConfig(): Promise<PhoneConfig> {
  const sb = createClient();
  const { data, error } = await sb
    .from("organizations")
    .select("sofia_phone, vapi_phone_id, vapi_assistant_id")
    .maybeSingle();
  if (error) console.error("[getPhoneConfig] error:", error.code, error.message);
  if (!data) return { configured: false, phone_number: null, vapi_phone_id: null, vapi_assistant_id: null };
  return {
    configured: !!data.sofia_phone,
    phone_number: data.sofia_phone ?? null,
    vapi_phone_id: data.vapi_phone_id ?? null,
    vapi_assistant_id: data.vapi_assistant_id ?? null,
  };
}

export async function setupPhone(payload: {
  org_id: string;
  twilio_account_sid: string;
  twilio_auth_token: string;
  phone_number: string;
}): Promise<{ success: boolean; phone_number: string; vapi_phone_id: string; vapi_assistant_id: string }> {
  const res = await fetch(`${BACKEND_URL}/setup/phone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function provisionPhone(org_id: string): Promise<{ success: boolean; phone_number: string; vapi_phone_id: string; vapi_assistant_id: string }> {
  const res = await fetch(`${BACKEND_URL}/setup/phone/provision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ org_id }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function requestAccountDeletion(): Promise<void> {
  const sb = createClient();
  const { data: sessionData } = await sb.auth.getSession();
  let token = sessionData.session?.access_token;

  if (!token) {
    const { data: userData } = await sb.auth.getUser();
    if (!userData.user) throw new Error("Not authenticated");
    const { data: refreshed } = await sb.auth.refreshSession();
    token = refreshed.session?.access_token;
    if (!token) throw new Error("Could not refresh session");
  }

  const res = await fetch(`${BACKEND_URL}/auth/account/request-delete`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await res.text());
}
