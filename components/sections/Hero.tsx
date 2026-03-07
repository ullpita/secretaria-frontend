"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";

const AVATARS = ["IM", "JF", "MT", "PD", "SC"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const MESSAGES = [
  { side: "left",  speaker: "C", text: "Bonjour, je voudrais prendre rendez-vous avec le Dr. Moreau." },
  { side: "right", speaker: "S", text: "Bonjour ! Je suis Sofia. Mardi 14h ou jeudi 10h vous convient ?" },
  { side: "left",  speaker: "C", text: "Jeudi 10h parfait, mon email : marie@gmail.com" },
  { side: "right", speaker: "S", text: "Confirmé ! Vous recevrez la confirmation par email. À jeudi !" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 overflow-hidden bg-[#0A0A0F]">

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-a absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />
        <div className="orb-b absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
        <div className="orb-a absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(ellipse, rgba(52,211,153,0.05) 0%, transparent 70%)", animationDelay: "-8s" }} />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 glow-ring sofia-pulse shrink-0" />
              Sofia répond en ce moment à des appels
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-6 text-white"
            >
              Votre secrétaire IA.
              <br />
              <span className="gradient-text">Disponible 24h/24.</span>
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed"
            >
              Sofia répond à vos appels, prend les rendez-vous et envoie les
              confirmations — pendant que vous vous concentrez sur vos patients et clients.
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
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
                Voir la démo
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {AVATARS.map((a) => (
                  <div key={a} className="w-8 h-8 rounded-full bg-[#1C1C27] border-2 border-[#0A0A0F] flex items-center justify-center text-xs font-bold text-slate-400">
                    {a}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  <span className="text-white font-semibold">500+</span> professionnels nous font confiance
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — animated call card */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="float-card"
          >
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-3xl blur-2xl"
                style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />

              <div className="relative card rounded-2xl overflow-hidden">
                <div className="bg-[#0E0E18] border-b border-white/5 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                      <Phone size={13} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">+33 6 12 34 56 78</p>
                      <p className="text-slate-500 text-[10px]">Appel entrant · 1 min 24s</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-semibold sofia-pulse">
                    ● En cours
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  {MESSAGES.map((msg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 10, x: msg.side === "right" ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex gap-2 ${msg.side === "right" ? "justify-end" : ""}`}
                    >
                      {msg.side === "left" && (
                        <span className="w-6 h-6 rounded-full bg-[#2A2A3A] flex items-center justify-center text-[10px] text-slate-400 shrink-0 font-bold mt-0.5">
                          {msg.speaker}
                        </span>
                      )}
                      <div className={`rounded-2xl px-3.5 py-2.5 text-xs max-w-[82%] leading-relaxed ${
                        msg.side === "right"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-tr-sm"
                          : "bg-[#1C1C27] border border-white/5 text-slate-300 rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      {msg.side === "right" && (
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400 shrink-0 font-bold mt-0.5">
                          S
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                  className="px-5 pb-5"
                >
                  <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl px-4 py-3 flex flex-wrap gap-x-2 gap-y-1 items-center">
                    <span className="text-[11px] text-emerald-400 font-medium">✓ RDV créé dans Calendar</span>
                    <span className="text-slate-600 text-[11px]">·</span>
                    <span className="text-[11px] text-emerald-400 font-medium">✓ Email préparé</span>
                    <span className="text-slate-600 text-[11px]">·</span>
                    <span className="text-[11px] text-amber-400 font-medium">⏳ En attente de validation</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0A0A0F, transparent)" }} />
    </section>
  );
}
