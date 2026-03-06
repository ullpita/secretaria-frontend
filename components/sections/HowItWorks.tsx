"use client";

import { motion } from "framer-motion";
import { PhoneIncoming, Brain, Zap } from "lucide-react";
import { HOW_IT_WORKS } from "@/lib/content";

const STEP_ICONS = [PhoneIncoming, Brain, Zap];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-[#13131A]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.15em] mb-4"
          >
            Comment ça marche
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white"
          >
            Un appel.{" "}
            <span className="gradient-text">Une action automatique.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div key={step.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative p-6 rounded-2xl bg-[#1C1C27] border border-white/5"
              >
                <span className="absolute top-5 right-5 font-[family-name:var(--font-display)] text-5xl font-bold text-white/[0.04]">
                  {step.step}
                </span>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={22} className="text-emerald-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-xl mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Demo transcript */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/5"
        >
          <div className="flex items-center gap-2 px-5 py-3 bg-[#1C1C27] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="ml-2 text-xs text-slate-500">Appel · Dr. Moreau Cabinet Médical · il y a 2 min</span>
            <span className="ml-auto text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full sofia-pulse">● Live</span>
          </div>
          <div className="bg-[#13131A] p-8 space-y-4 max-w-2xl mx-auto">
            {[
              { speaker: "C", side: "left", text: "Bonjour, je voudrais prendre rendez-vous pour une consultation avec le Dr. Moreau." },
              { speaker: "S", side: "right", text: "Bonjour ! Je suis Sofia, l'assistante du Dr. Moreau. Quel est votre nom et la date qui vous convient ?" },
              { speaker: "C", side: "left", text: "Marie Dupont. Jeudi prochain si possible, en fin de matinée." },
              { speaker: "S", side: "right", text: "Parfait Marie. Je vous propose jeudi 14 mars à 11h. Votre email pour la confirmation ?" },
              { speaker: "C", side: "left", text: "marie.dupont@gmail.com" },
              { speaker: "S", side: "right", text: "C'est confirmé ! Vous recevrez un email de confirmation dans quelques instants. À jeudi !" },
            ].map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.side === "right" ? "justify-end" : ""}`}>
                {msg.side === "left" && (
                  <span className="w-7 h-7 rounded-full bg-[#2A2A3A] flex items-center justify-center text-xs text-slate-400 shrink-0 font-semibold">{msg.speaker}</span>
                )}
                <div className={`rounded-2xl px-4 py-2.5 text-sm max-w-sm ${
                  msg.side === "right"
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-tr-sm"
                    : "bg-[#1C1C27] border border-white/5 text-slate-300 rounded-tl-sm"
                }`}>
                  {msg.text}
                </div>
                {msg.side === "right" && (
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 shrink-0 font-semibold">{msg.speaker}</span>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                ✓ RDV créé · ✓ Email envoyé à marie.dupont@gmail.com
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
