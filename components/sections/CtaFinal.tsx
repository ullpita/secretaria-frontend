"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CtaFinal() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#0A0A0F]">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)"
      }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.15em] mb-6"
        >
          Prêt à commencer ?
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Sofia est prête.{" "}
          <span className="gradient-text">Votre téléphone aussi ?</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-slate-400 text-lg mb-10 leading-relaxed"
        >
          Rejoignez 500+ professionnels qui ne manquent plus jamais un appel.
          <br />
          Setup en moins de 10 minutes. Pas de carte requise.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="/signup"
            className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base"
          >
            Essayer gratuitement — 14 jours
            <ArrowRight size={16} />
          </a>
          <p className="text-slate-500 text-sm">Sans carte bancaire · Annulation facile</p>
        </motion.div>
      </div>
    </section>
  );
}
