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
  status: "success" | "failed" | "pending";
  error: string | null;
  executed_at: string | null;
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
  const { data } = await sb
    .from("organizations")
    .select("id, name, sector, phone, trial_ends, plan")
    .single();
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

export async function getIntegrations(): Promise<Integration[]> {
  const sb = createClient();
  const { data } = await sb
    .from("integrations")
    .select("id, provider, connected_at");
  return data ?? [];
}
