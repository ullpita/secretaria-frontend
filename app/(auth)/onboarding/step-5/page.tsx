"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Mic, MicOff } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export default function Step5() {
  const router = useRouter();
  const [calling, setCalling] = useState(false);
  const [called, setCalled] = useState(false);

  function simulateCall() {
    setCalling(true);
    setTimeout(() => {
      setCalling(false);
      setCalled(true);
    }, 3000);
  }

  return (
    <OnboardingShell
      step={5}
      title="Testez Sofia maintenant"
      subtitle="Parlez avec votre agent avant de le déployer."
    >
      <div className="space-y-6">
        {!called ? (
          <div className="text-center py-8">
            {/* Sofia avatar */}
            <div className="relative inline-flex mb-6">
              <div className={`w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center ${calling ? "sofia-pulse" : ""}`}>
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-emerald-400">S</span>
              </div>
              {calling && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            <p className="text-white font-semibold mb-1">
              {calling ? "Sofia répond..." : "Sofia est prête"}
            </p>
            <p className="text-slate-400 text-sm mb-8">
              {calling
                ? "Parlez naturellement avec votre agent"
                : "Cliquez pour lancer un appel test dans votre navigateur"}
            </p>

            {!calling ? (
              <button onClick={simulateCall}
                className="btn-primary inline-flex items-center gap-2.5 text-white font-semibold px-8 py-4 rounded-xl text-base"
              >
                <Phone size={18} />
                Appeler Sofia maintenant
              </button>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-[#1C1C27] border border-white/5 rounded-xl px-5 py-3">
                  <Mic size={16} className="text-emerald-400 sofia-pulse" />
                  <span className="text-white text-sm font-medium">En écoute</span>
                </div>
                <button onClick={() => { setCalling(false); setCalled(true); }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                >
                  <MicOff size={16} />
                  Raccrocher
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-2">
              Sofia est opérationnelle !
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Votre agent vocal est prêt à répondre à vos appels.
            </p>
          </motion.div>
        )}

        <div className="border-t border-white/5 pt-6">
          <button onClick={() => router.push("/dashboard")}
            className="btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl"
          >
            Accéder au dashboard <ArrowRight size={16} />
          </button>
          {!called && (
            <button onClick={() => router.push("/dashboard")}
              className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors py-3 flex items-center justify-center gap-1 mt-2"
            >
              Passer et accéder au dashboard <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </OnboardingShell>
  );
}
