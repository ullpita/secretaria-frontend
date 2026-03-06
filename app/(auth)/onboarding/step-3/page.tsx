"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export default function Step3() {
  const router = useRouter();

  function connectGmail() {
    window.location.href = `/api/auth/google?scope=gmail&redirect=/onboarding/step-4`;
  }

  return (
    <OnboardingShell
      step={3}
      title="Connectez Gmail"
      subtitle="Sofia enverra les confirmations depuis votre adresse email."
    >
      <div className="space-y-6">
        {/* What it does */}
        <div className="space-y-3">
          {[
            "Envoyer des emails de confirmation de RDV",
            "Répondre aux demandes d'information",
            "Notifier votre équipe des tâches urgentes",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle size={15} className="text-emerald-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>

        {/* Connect button */}
        <button onClick={connectGmail}
          className="w-full flex items-center justify-center gap-3 bg-white text-[#0A0A0F] font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
        >
          <Mail size={16} />
          Connecter Google Gmail
        </button>

        {/* Skip */}
        <button onClick={() => router.push("/onboarding/step-4")}
          className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors py-2 flex items-center justify-center gap-1"
        >
          Passer pour l&apos;instant <ArrowRight size={13} />
        </button>

        <p className="text-xs text-slate-600 text-center">
          Accès limité en lecture/écriture. Révocable à tout moment depuis votre compte Google.
        </p>
      </div>
    </OnboardingShell>
  );
}
