"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Phone, PhoneOff, Clock, Calendar, Mail,
  CheckSquare, TrendingUp, TrendingDown, Minus,
  CheckCircle, XCircle, RefreshCw, User, Headphones, Loader2
} from "lucide-react";
import { getCall, getCallActions, formatDuration, type CallRow, type CallAction } from "@/lib/supabase/queries";

const SENTIMENT_CONFIG = {
  positive: { icon: TrendingUp,   label: "Positif",  color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  neutral:  { icon: Minus,        label: "Neutre",   color: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20" },
  negative: { icon: TrendingDown, label: "Négatif",  color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20" },
};
const STATUS_CONFIG = {
  completed: { icon: Phone,    label: "Terminé",  color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  failed:    { icon: PhoneOff, label: "Échoué",   color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20" },
  ongoing:   { icon: Phone,    label: "En cours", color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20" },
};
const ACTION_ICON: Record<string, React.ElementType> = { email: Mail, calendar_event: Calendar, task: CheckSquare };
const ACTION_STATUS_CONFIG = {
  success:  { icon: CheckCircle, color: "text-emerald-400" },
  failed:   { icon: XCircle,     color: "text-red-400" },
  pending:  { icon: RefreshCw,   color: "text-amber-400" },
  rejected: { icon: XCircle,     color: "text-slate-500" },
};
const SECTOR_CONFIG: Record<string, { label: string; color: string }> = {
  medical:    { label: "Médical",    color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  immobilier: { label: "Immobilier", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function CallDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [call, setCall] = useState<CallRow | null | "not_found">(null);
  const [actions, setActions] = useState<CallAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCall(id), getCallActions(id)]).then(([c, a]) => {
      setCall(c ?? "not_found");
      setActions(a);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <Loader2 size={20} className="animate-spin mr-2" /> Chargement...
      </div>
    );
  }

  if (call === "not_found" || !call) return notFound();

  const sentiment = SENTIMENT_CONFIG[call.sentiment];
  const status = STATUS_CONFIG[call.status];
  const SentimentIcon = sentiment.icon;
  const StatusIcon = status.icon;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Link href="/dashboard/calls" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm transition-colors">
        <ArrowLeft size={15} /> Retour aux appels
      </Link>

      {/* Header */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${status.bg}`}>
              <StatusIcon size={20} className={status.color} />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">{call.caller_name ?? "Appelant inconnu"}</h2>
              <p className="text-slate-500 text-sm">{call.caller_number}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border ${status.bg} ${status.color}`}>
              <StatusIcon size={11} />{status.label}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border ${sentiment.bg} ${sentiment.color}`}>
              <SentimentIcon size={11} />{sentiment.label}
            </span>
            {call.sector && SECTOR_CONFIG[call.sector] && (
              <span className={`inline-flex text-xs font-medium px-3 py-1.5 rounded-lg border ${SECTOR_CONFIG[call.sector].color}`}>
                {SECTOR_CONFIG[call.sector].label}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2"><Clock size={14} className="text-slate-600" />{formatDuration(call.duration_seconds)}</div>
          <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-600" />{formatDate(call.started_at)}</div>
          <div className="flex items-center gap-2"><CheckSquare size={14} className="text-slate-600" />{actions.length} action{actions.length !== 1 ? "s" : ""}</div>
        </div>

        {call.summary && (
          <div className="mt-5 p-4 bg-black/20 rounded-xl border border-white/5">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Résumé IA</p>
            <p className="text-slate-300 text-sm leading-relaxed">{call.summary}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript */}
        <div className="lg:col-span-2 bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
            <Headphones size={15} className="text-slate-500" />
            <h3 className="text-white text-sm font-semibold">Transcription</h3>
          </div>
          <div className="p-5 space-y-4 max-h-[520px] overflow-y-auto">
            {!call.transcript || call.transcript.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8">Aucune transcription disponible.</p>
            ) : (
              call.transcript.map((line, i) => {
                const isSofia = line.speaker === "Sofia";
                return (
                  <div key={i} className={`flex gap-3 ${isSofia ? "" : "flex-row-reverse"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${isSofia ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700/50 text-slate-400"}`}>
                      {isSofia ? "S" : <User size={12} />}
                    </div>
                    <div className={`flex flex-col gap-1 max-w-[82%] ${isSofia ? "" : "items-end"}`}>
                      <div className={`flex items-center gap-2 ${isSofia ? "" : "flex-row-reverse"}`}>
                        <span className="text-xs font-medium text-slate-400">{isSofia ? "Sofia" : call.caller_name ?? "Client"}</span>
                        <span className="text-xs text-slate-600">{line.timestamp}</span>
                      </div>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isSofia ? "bg-emerald-500/10 text-emerald-50 rounded-tl-sm" : "bg-[#1C1C27] text-slate-200 rounded-tr-sm"}`}>
                        {line.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-white text-sm font-semibold">Actions exécutées</h3>
          </div>
          <div className="p-4 space-y-3">
            {actions.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-6">Aucune action.</p>
            ) : (
              actions.map((action) => <ActionCard key={action.id} action={action} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ action }: { action: CallAction }) {
  const Icon = ACTION_ICON[action.type] ?? CheckSquare;
  const { icon: StatusIcon, color } = ACTION_STATUS_CONFIG[action.status];
  return (
    <div className="p-3.5 bg-black/20 rounded-xl border border-white/5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Icon size={13} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">{action.label ?? action.type}</p>
            <p className="text-slate-500 text-xs mt-0.5">{action.detail ?? "—"}</p>
          </div>
        </div>
        <StatusIcon size={14} className={`${color} shrink-0 mt-0.5`} />
      </div>
      {action.executed_at && (
        <p className="text-slate-600 text-xs mt-2 ml-9">
          Exécuté à {new Date(action.executed_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      )}
      {action.error && (
        <p className="text-red-400 text-xs mt-2 ml-9">{action.error}</p>
      )}
    </div>
  );
}
