"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { PRICING } from "@/lib/content";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 bg-[#13131A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.15em] mb-4"
          >
            Tarifs
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Commencez gratuitement.{" "}
            <span className="gradient-text">Upgradez quand vous voulez.</span>
          </motion.h2>

          <div className="inline-flex items-center gap-1 bg-[#1C1C27] border border-white/5 rounded-xl p-1">
            <button onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${!annual ? "bg-white text-[#0A0A0F]" : "text-slate-400 hover:text-white"}`}
            >
              Mensuel
            </button>
            <button onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${annual ? "bg-white text-[#0A0A0F]" : "text-slate-400 hover:text-white"}`}
            >
              Annuel <span className="text-emerald-400 font-semibold">−25%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {PRICING.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative flex flex-col rounded-2xl p-5 ${
                plan.highlighted
                  ? "bg-emerald-500/5 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10"
                  : "bg-[#1C1C27] border border-white/5"
              }`}
            >
              {plan.badge && (
                <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${
                  plan.highlighted
                    ? "bg-emerald-500 text-white"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-slate-400 text-xs mb-5">{plan.description}</p>

              <div className="mb-1">
                {plan.price.monthly !== null ? (
                  <>
                    <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                      {annual ? plan.price.annual : plan.price.monthly}{plan.price.monthly === 0 ? "" : "€"}
                    </span>
                    {plan.price.monthly > 0 && <span className="text-slate-400 text-sm ml-1">/mois</span>}
                  </>
                ) : (
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Sur devis</span>
                )}
              </div>
              <p className="text-xs text-emerald-400 mb-5 font-medium">{plan.minutes}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlighted ? "bg-emerald-500/20" : "bg-[#2A2A3A]"}`}>
                      <Check size={9} className={plan.highlighted ? "text-emerald-400" : "text-slate-400"} />
                    </div>
                    <span className="text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="/signup"
                className={`text-center py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "btn-primary text-white"
                    : plan.name === "Trial"
                    ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    : "bg-[#2A2A3A] text-white hover:bg-[#333345] border border-white/5"
                }`}
              >
                {plan.highlighted && <Zap size={13} />}
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-8">
          Toutes les cartes acceptées · Annulation à tout moment · Aucun engagement
        </p>
      </div>
    </section>
  );
}
