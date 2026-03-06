"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Phone, PhoneOff, PhoneMissed, Search, Filter, Download,
  ChevronRight, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MOCK_CALLS, type Call, type Sentiment, type CallStatus } from "@/lib/mockdata";

const SENTIMENT_ICON = {
  positive: TrendingUp,
  neutral: Minus,
  negative: TrendingDown,
};

const SENTIMENT_COLOR = {
  positive: "text-emerald-400 bg-emerald-500/10",
  neutral: "text-slate-400 bg-slate-500/10",
  negative: "text-red-400 bg-red-500/10",
};

const STATUS_ICON = {
  completed: Phone,
  failed: PhoneOff,
  ongoing: PhoneMissed,
};

const STATUS_COLOR = {
  completed: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  failed: "text-red-400 bg-red-500/10 border-red-500/20",
  ongoing: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const STATUS_LABEL = {
  completed: "Terminé",
  failed: "Échoué",
  ongoing: "En cours",
};

const SECTOR_LABEL = {
  medical: "Médical",
  immobilier: "Immobilier",
};

const SECTOR_COLOR = {
  medical: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  immobilier: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [filterSentiment, setFilterSentiment] = useState<Sentiment | "all">("all");
  const [filterStatus, setFilterStatus] = useState<CallStatus | "all">("all");
  const [filterSector, setFilterSector] = useState<"all" | "medical" | "immobilier">("all");

  const filtered = useMemo(() => {
    return MOCK_CALLS.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.callerName?.toLowerCase().includes(q) ||
        c.callerNumber.includes(q) ||
        c.summary.toLowerCase().includes(q);
      const matchSentiment = filterSentiment === "all" || c.sentiment === filterSentiment;
      const matchStatus = filterStatus === "all" || c.status === filterStatus;
      const matchSector = filterSector === "all" || c.sector === filterSector;
      return matchSearch && matchSentiment && matchStatus && matchSector;
    });
  }, [search, filterSentiment, filterStatus, filterSector]);

  function exportCSV() {
    const header = ["ID", "Appelant", "Numéro", "Durée", "Date", "Sentiment", "Statut", "Résumé"];
    const rows = filtered.map((c) => [
      c.id, c.callerName ?? "Inconnu", c.callerNumber,
      c.duration, c.startedAt, c.sentiment, c.status,
      `"${c.summary.replace(/"/g, '""')}"`,
    ]);
    const csv = [header, ...rows].map((r) => r.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "appels.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Tous les appels</h2>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-2 rounded-lg transition-all"
        >
          <Download size={14} />
          Exporter CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, numéro..."
            className="w-full bg-[#13131A] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40"
          />
        </div>

        {/* Sentiment */}
        <div className="flex items-center gap-1 bg-[#13131A] border border-white/5 rounded-xl p-1">
          {(["all", "positive", "neutral", "negative"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSentiment(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterSentiment === s
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {s === "all" ? "Tout" : s === "positive" ? "Positif" : s === "neutral" ? "Neutre" : "Négatif"}
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-1 bg-[#13131A] border border-white/5 rounded-xl p-1">
          {(["all", "completed", "failed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterStatus === s
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {s === "all" ? "Tout" : s === "completed" ? "Terminé" : "Échoué"}
            </button>
          ))}
        </div>

        {/* Sector */}
        <div className="flex items-center gap-1 bg-[#13131A] border border-white/5 rounded-xl p-1">
          {(["all", "medical", "immobilier"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSector(s)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterSector === s
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "text-slate-500 hover:text-white"
              }`}
            >
              {s === "all" ? "Tout" : SECTOR_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            <Filter size={32} className="mx-auto mb-3 opacity-30" />
            Aucun appel ne correspond aux filtres.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((call) => (
              <CallRow key={call.id} call={call} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CallRow({ call }: { call: Call }) {
  const SentimentIcon = SENTIMENT_ICON[call.sentiment];
  const StatusIcon = STATUS_ICON[call.status];

  return (
    <Link
      href={`/dashboard/calls/${call.id}`}
      className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Status icon */}
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${STATUS_COLOR[call.status]}`}>
        <StatusIcon size={15} />
      </div>

      {/* Caller */}
      <div className="w-44 shrink-0">
        <p className="text-white text-sm font-medium truncate">
          {call.callerName ?? "Inconnu"}
        </p>
        <p className="text-slate-500 text-xs">{call.callerNumber}</p>
      </div>

      {/* Summary */}
      <p className="flex-1 text-slate-400 text-sm truncate hidden md:block">
        {call.summary}
      </p>

      {/* Duration + date */}
      <div className="hidden lg:flex items-center gap-1.5 text-slate-500 text-xs shrink-0">
        <Clock size={12} />
        {call.duration}
      </div>

      <div className="hidden lg:block text-slate-500 text-xs shrink-0 w-32 text-right">
        {formatDate(call.startedAt)}
      </div>

      {/* Sector */}
      <span className={`hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-lg border shrink-0 ${SECTOR_COLOR[call.sector]}`}>
        {SECTOR_LABEL[call.sector]}
      </span>

      {/* Sentiment */}
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg shrink-0 ${SENTIMENT_COLOR[call.sentiment]}`}>
        <SentimentIcon size={11} />
        {call.sentiment === "positive" ? "Positif" : call.sentiment === "neutral" ? "Neutre" : "Négatif"}
      </span>

      {/* Actions count */}
      {call.actions.length > 0 && (
        <span className="hidden sm:inline-flex text-xs text-slate-600 shrink-0">
          {call.actions.length} action{call.actions.length > 1 ? "s" : ""}
        </span>
      )}

      <ChevronRight size={15} className="text-slate-700 group-hover:text-slate-400 transition-colors shrink-0 ml-auto" />
    </Link>
  );
}
