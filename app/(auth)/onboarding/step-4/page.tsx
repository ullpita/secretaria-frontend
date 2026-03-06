"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export default function Step4() {
  const router = useRouter();

  function connectCalendar() {
    window.location.href = `/api/auth/google?scope=calendar&redirect=/onboarding/step-5`;
  }

  return (
    <OnboardingShell
      step={4}
      title="Connectez Google Calendar"
      subtitle="Sofia vérifiera vos disponibilités et créera les RDV automatiquement."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          {[
            "Vérifier vos créneaux disponibles en temps réel",
            "Créer les rendez-vous avec rappels automatiques",
            "Envoyer les invitations aux participants",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle size={15} className="text-emerald-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <button onClick={connectCalendar}
          className="w-full flex items-center justify-center gap-3 bg-white text-[#0A0A0F] font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
        >
          <Calendar size={16} />
          Connecter Google Calendar
        </button>

        <button onClick={() => router.push("/onboarding/step-5")}
          className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors py-2 flex items-center justify-center gap-1"
        >
          Passer pour l&apos;instant <ArrowRight size={13} />
        </button>

        <p className="text-xs text-slate-600 text-center">
          Sofia ne peut pas supprimer vos événements existants. Accès en lecture/écriture uniquement pour les nouveaux RDV.
        </p>
      </div>
    </OnboardingShell>
  );
}
