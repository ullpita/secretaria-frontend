"use client";

import { motion } from "framer-motion";
import { Phone, Clock, Mail, Calendar, CheckSquare, TrendingUp, ArrowUpRight } from "lucide-react";

const METRICS = [
  { label: "Appels aujourd'hui", value: "12", sub: "+3 vs hier", icon: Phone, color: "emerald" },
  { label: "Minutes utilisées", value: "47 / 200", sub: "23% du quota", icon: Clock, color: "blue" },
  { label: "Actions exécutées", value: "31", sub: "8 emails · 19 RDV · 4 tâches", icon: TrendingUp, color: "violet" },
  { label: "Taux de résolution", value: "94%", sub: "Sofia a agi sur 94% des appels", icon: CheckSquare, color: "amber" },
];

const COLOR = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

const RECENT_CALLS = [
  { id: 1, name: "Marie Dupont", number: "+33 6 12 34 56 78", duration: "3:42", time: "il y a 5 min", sentiment: "positive", actions: ["email", "calendar"], status: "completed" },
  { id: 2, name: null, number: "+33 6 98 76 54 32", duration: "1:18", time: "il y a 22 min", sentiment: "neutral", actions: ["task"], status: "completed" },
  { id: 3, name: "Jean Bernard", number: "+33 1 23 45 67 89", duration: "5:10", time: "il y a 1h", sentiment: "positive", actions: ["email", "calendar", "task"], status: "completed" },
  { id: 4, name: "Sophie Martin", number: "+33 6 55 44 33 22", duration: "–", time: "il y a 2h", sentiment: "negative", actions: [], status: "failed" },
  { id: 5, name: null, number: "+33 7 11 22 33 44", duration: "2:55", time: "il y a 3h", sentiment: "neutral", actions: ["email"], status: "completed" },
];

const SENTIMENT_STYLE = {
  positive: "text-emerald-400",
  neutral: "text-slate-400",
  negative: "text-red-400",
};
const SENTIMENT_EMOJI = { positive: "😊", neutral: "😐", negative: "😟" };

const ACTION_BADGE: Record<string, { icon: React.ReactNode; label: string }> = {
  email: { icon: <Mail size={10} />, label: "Email" },
  calendar: { icon: <Calendar size={10} />, label: "RDV" },
  task: { icon: <CheckSquare size={10} />, label: "Tâche" },
};

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => {
          const c = COLOR[m.color as keyof typeof COLOR];
          return (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-[#13131A] border border-white/5 rounded-2xl p-5"
            >
              <div className={`w-9 h-9 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center mb-4`}>
                <m.icon size={16} className={c.text} />
              </div>
              <p className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-0.5">{m.value}</p>
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
          <a href="/dashboard/calls" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
            Voir tout <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="divide-y divide-white/[0.03]">
          {RECENT_CALLS.map((call) => (
            <div key={call.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-[#1C1C27] border border-white/5 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                {call.name ? call.name.split(" ").map(n => n[0]).join("") : "?"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {call.name ?? call.number}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {call.name && `${call.number} · `}{call.time} · {call.duration}
                </p>
              </div>

              {/* Sentiment */}
              <span className={`text-sm ${SENTIMENT_STYLE[call.sentiment as keyof typeof SENTIMENT_STYLE]}`}>
                {SENTIMENT_EMOJI[call.sentiment as keyof typeof SENTIMENT_EMOJI]}
              </span>

              {/* Action badges */}
              <div className="hidden sm:flex items-center gap-1.5">
                {call.actions.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#1C1C27] text-slate-400 border border-white/5 px-2 py-0.5 rounded-full">
                    {ACTION_BADGE[a].icon}
                    {ACTION_BADGE[a].label}
                  </span>
                ))}
              </div>

              {/* Status */}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                call.status === "completed"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}>
                {call.status === "completed" ? "Traité" : "Échec"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
