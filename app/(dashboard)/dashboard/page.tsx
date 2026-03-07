"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Mail, Calendar, CheckSquare, TrendingUp, ArrowUpRight, Loader2 } from "lucide-react";
import { getCalls, formatDuration, type CallRow } from "@/lib/supabase/queries";
import Link from "next/link";

const SENTIMENT_EMOJI: Record<string, string> = { positive: "😊", neutral: "😐", negative: "😟" };
const SENTIMENT_STYLE: Record<string, string> = {
  positive: "text-emerald-400",
  neutral: "text-slate-400",
  negative: "text-red-400",
};

function getActionBadges(call: CallRow) {
  // No actions field on CallRow — we show placeholders based on summary keywords
  return [];
}

export default function DashboardPage() {
  const [calls, setCalls] = useState<CallRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCalls().then((data) => {
      setCalls(data);
      setLoading(false);
    });
  }, []);

  const today = new Date().toDateString();
  const todayCalls = calls.filter((c) => new Date(c.started_at).toDateString() === today);
  const totalMinutes = calls.reduce((acc, c) => acc + c.duration_seconds, 0);
  const successCount = calls.filter((c) => c.status === "completed").length;
  const successRate = calls.length > 0 ? Math.round((successCount / calls.length) * 100) : 0;

  const METRICS = [
    {
      label: "Appels aujourd'hui", value: String(todayCalls.length),
      sub: `${calls.length} au total`, icon: Phone, color: "emerald",
    },
    {
      label: "Minutes utilisées", value: `${Math.floor(totalMinutes / 60)}`,
      sub: `${calls.length} appels traités`, icon: Clock, color: "blue",
    },
    {
      label: "Appels traités", value: String(successCount),
      sub: `${calls.length - successCount} échoué${calls.length - successCount !== 1 ? "s" : ""}`, icon: TrendingUp, color: "violet",
    },
    {
      label: "Taux de réussite", value: `${successRate}%`,
      sub: "Appels complétés avec succès", icon: CheckSquare, color: "amber",
    },
  ];

  const COLOR: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  };

  const recentCalls = calls.slice(0, 5);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => {
          const c = COLOR[m.color];
          return (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-[#13131A] border border-white/5 rounded-2xl p-5"
            >
              <div className={`w-9 h-9 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center mb-4`}>
                <m.icon size={16} className={c.text} />
              </div>
              {loading ? (
                <div className="h-7 w-16 bg-white/5 rounded animate-pulse mb-1" />
              ) : (
                <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-0.5">{m.value}</p>
              )}
              <p className="text-xs text-slate-400">{m.label}</p>
              <p className={`text-xs mt-1 ${c.text}`}>{m.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent calls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 sofia-pulse" />
            <h2 className="font-semibold text-white text-sm">Appels récents</h2>
          </div>
          <Link href="/dashboard/calls" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
            Voir tout <ArrowUpRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 flex items-center justify-center text-slate-500">
            <Loader2 size={20} className="animate-spin mr-2" /> Chargement...
          </div>
        ) : recentCalls.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            <Phone size={32} className="mx-auto mb-3 opacity-30" />
            Aucun appel pour l&apos;instant.<br />
            <span className="text-xs">Les appels de Sofia apparaîtront ici.</span>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {recentCalls.map((call) => (
              <Link key={call.id} href={`/dashboard/calls/${call.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#1C1C27] border border-white/5 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                  {call.caller_name ? call.caller_name.split(" ").map((n) => n[0]).join("") : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {call.caller_name ?? call.caller_number}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {call.caller_name && `${call.caller_number} · `}
                    {new Date(call.started_at).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    {" · "}{formatDuration(call.duration_seconds)}
                  </p>
                </div>
                <span className={`text-sm ${SENTIMENT_STYLE[call.sentiment]}`}>
                  {SENTIMENT_EMOJI[call.sentiment]}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  call.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}>
                  {call.status === "completed" ? "Traité" : "Échec"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
