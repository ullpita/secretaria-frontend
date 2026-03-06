"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 overflow-hidden bg-[#0A0A0F]">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.1) 0%, transparent 70%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(ellipse 40% 40% at 80% 60%, rgba(16,185,129,0.05) 0%, transparent 70%)" }} className="absolute inset-0" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
          className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-emerald-500/20 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 sofia-pulse" />
          Sofia répond en ce moment à des appels
        </motion.div>

        {/* Headline */}
        <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
          className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 text-white"
        >
          Votre secrétaire IA.
          <br />
          <span className="gradient-text">Disponible 24h/24.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Sofia répond à vos appels, prend les rendez-vous et envoie les confirmations —
          pendant que vous vous concentrez sur vos patients et clients.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a href="/signup"
            className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-base"
          >
            Essayer gratuitement — 14 jours
            <ArrowRight size={16} />
          </a>
          <a href="#how-it-works"
            className="inline-flex items-center gap-2 btn-ghost text-slate-300 font-medium px-5 py-3.5 rounded-xl text-base"
          >
            <Phone size={15} />
            Écouter Sofia
          </a>
        </motion.div>

        {/* Floating call card */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-md mx-auto card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Phone size={15} className="text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">Appel entrant</p>
                <p className="text-slate-500 text-xs">+33 6 12 34 56 78</p>
              </div>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium sofia-pulse">
              ● En cours
            </span>
          </div>
          <div className="space-y-2.5">
            <div className="flex gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-400 shrink-0 font-semibold">C</span>
              <div className="bg-[#1C1C27] rounded-xl rounded-tl-sm px-3 py-2 text-xs text-slate-300 max-w-[80%]">
                &ldquo;Bonjour, je voudrais prendre un rendez-vous pour une consultation&rdquo;
              </div>
            </div>
            <div className="flex gap-2.5 justify-end">
              <div className="bg-emerald-500/15 border border-emerald-500/20 rounded-xl rounded-tr-sm px-3 py-2 text-xs text-emerald-300 max-w-[80%]">
                &ldquo;Bien sûr ! Mardi 14h ou jeudi 10h vous convient ?&rdquo;
              </div>
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 shrink-0 font-semibold">S</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <span className="text-xs text-emerald-400 font-medium">✓ RDV créé dans Calendar</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-emerald-400 font-medium">✓ Email envoyé</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
