"use client";

import { useEffect, useState, useCallback } from "react";
import { Mail, Calendar, CheckCircle, XCircle, Loader2, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getPendingActions, approveAction, rejectAction, getOrg, type PendingAction } from "@/lib/supabase/queries";
import Link from "next/link";

function formatDateTime(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("fr-FR", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function ActionsPage() {
  const [actions, setActions] = useState<PendingAction[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [pending, org] = await Promise.all([getPendingActions(), getOrg()]);
    setActions(pending);
    setOrgId(org?.id ?? null);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function removeAction(id: string) {
    setActions((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-white font-semibold text-lg">Actions en attente</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          {loading ? "Chargement..." : `${actions.length} action${actions.length !== 1 ? "s" : ""} à valider`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500">
          <Loader2 size={20} className="animate-spin mr-2" /> Chargement...
        </div>
      ) : actions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-3">
          <CheckCircle size={32} className="opacity-30" />
          <p className="text-sm">Aucune action en attente.</p>
          <p className="text-xs text-slate-600">Sofia créera des actions après chaque appel.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              orgId={orgId}
              onDone={() => removeAction(action.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ActionCard({ action, orgId, onDone }: {
  action: PendingAction;
  orgId: string | null;
  onDone: () => void;
}) {
  const isEmail = action.type === "email";
  const meta = action.metadata ?? {};

  const [to, setTo] = useState(meta.to ?? "");
  const [subject, setSubject] = useState(meta.subject ?? "");
  const [body, setBody] = useState(meta.body ?? "");
  const [title, setTitle] = useState(meta.title ?? "");
  const [start, setStart] = useState(meta.start_datetime ?? "");
  const [end, setEnd] = useState(meta.end_datetime ?? "");
  const [attendee, setAttendee] = useState(meta.attendee_email ?? "");
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleApprove() {
    if (!orgId) return setError("Org non trouvée.");
    setLoading("approve");
    setError(null);
    try {
      await approveAction(action.id, orgId, isEmail
        ? { to, subject, body }
        : { title, start_datetime: start, end_datetime: end, attendee_email: attendee }
      );
      onDone();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'approbation.");
      setLoading(null);
    }
  }

  async function handleReject() {
    if (!orgId) return setError("Org non trouvée.");
    setLoading("reject");
    setError(null);
    try {
      await rejectAction(action.id, orgId);
      onDone();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors du rejet.");
      setLoading(null);
    }
  }

  return (
    <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-white/5">
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
          isEmail ? "bg-red-500/10 border-red-500/20" : "bg-blue-500/10 border-blue-500/20"
        }`}>
          {isEmail ? <Mail size={15} className="text-red-400" /> : <Calendar size={15} className="text-blue-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">{action.label}</p>
          {action.call && (
            <p className="text-slate-500 text-xs mt-0.5">
              {action.call.caller_name ?? action.call.caller_number}
              {" · "}
              <Link href={`/dashboard/calls/${action.call_id}`} className="text-emerald-500 hover:text-emerald-400 transition-colors">
                voir l&apos;appel
              </Link>
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
          <Clock size={11} />
          {action.call?.started_at ? formatDateTime(action.call.started_at) : "—"}
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-slate-600 hover:text-slate-400 transition-colors">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-5 space-y-4">
          {isEmail ? (
            <>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Destinataire</label>
                <input value={to} onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Objet</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Corps de l&apos;email</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6}
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Titre du rendez-vous</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 font-medium mb-1.5 block">Début</label>
                  <input type="datetime-local" value={start.slice(0, 16)} onChange={(e) => setStart(e.target.value)}
                    className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium mb-1.5 block">Fin</label>
                  <input type="datetime-local" value={end.slice(0, 16)} onChange={(e) => setEnd(e.target.value)}
                    className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium mb-1.5 block">Email du participant (optionnel)</label>
                <input value={attendee} onChange={(e) => setAttendee(e.target.value)}
                  placeholder="patient@example.com"
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500/40" />
              </div>
            </>
          )}

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button onClick={handleApprove} disabled={!!loading}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50">
              {loading === "approve" ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
              {isEmail ? "Envoyer l'email" : "Confirmer le RDV"}
            </button>
            <button onClick={handleReject} disabled={!!loading}
              className="flex items-center justify-center gap-2 px-4 text-sm font-medium py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all disabled:opacity-50">
              {loading === "reject" ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
              Rejeter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
