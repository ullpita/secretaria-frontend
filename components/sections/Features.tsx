"use client";

import { motion } from "framer-motion";
import { Phone, Calendar, Mail, FileText, CheckSquare, Shield } from "lucide-react";
import { FEATURES } from "@/lib/content";

const ICONS: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Phone, Calendar, Mail, FileText, CheckSquare, Shield,
};

export default function Features() {
  return (
    <section id="features" className="py-28 px-6 bg-[#0A0A0F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.15em] mb-4"
          >
            Fonctionnalités
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white"
          >
            Sofia fait tout ce qu&apos;une secrétaire fait.
            <br />
            <span className="gradient-text">Sans jamais s&apos;arrêter.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="card group p-6 rounded-2xl"
              >
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
