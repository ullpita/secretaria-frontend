"use client";

import { motion } from "framer-motion";

const STEPS = [
  { n: 1, label: "Compte" },
  { n: 2, label: "Entreprise" },
  { n: 3, label: "Gmail" },
  { n: 4, label: "Calendar" },
  { n: 5, label: "Test Sofia" },
];

interface Props {
  step: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function OnboardingShell({ step, title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between max-w-2xl mx-auto w-full mb-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-xs">S</span>
          </div>
          <span className="font-[family-name:var(--font-display)] font-bold text-white">Secretaria</span>
        </div>
        <span className="text-slate-500 text-sm">{step}/5</span>
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto w-full mb-10">
        <div className="flex items-center gap-2 mb-3">
          {STEPS.map((s) => (
            <div key={s.n} className="flex-1">
              <div className={`h-1 rounded-full transition-all duration-500 ${
                s.n < step ? "bg-emerald-500" :
                s.n === step ? "bg-emerald-500/60" :
                "bg-white/5"
              }`} />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {STEPS.map((s) => (
            <div key={s.n} className="flex-1 text-center">
              <span className={`text-xs transition-colors ${
                s.n <= step ? "text-emerald-400" : "text-slate-600"
              }`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl mx-auto w-full flex-1"
      >
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
