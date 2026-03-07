"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { createClient } from "@/lib/supabase/client";

const SECTORS = [
  { value: "medical", label: "Médical", emoji: "🏥", desc: "Cabinet médical, dentiste, kiné..." },
  { value: "immobilier", label: "Immobilier", emoji: "🏠", desc: "Agence, promoteur, gestion locative..." },
  { value: "both", label: "Les deux", emoji: "✦", desc: "Multi-secteurs" },
];

export default function Step2() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !sector) return;
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("organizations").upsert(
        { owner_id: user.id, name, sector, phone: phone || null },
        { onConflict: "owner_id" }
      );
    }
    router.push("/onboarding/step-3");
  }

  return (
    <OnboardingShell
      step={2}
      title="Parlez-nous de votre activité"
      subtitle="Sofia adaptera son comportement à votre secteur."
    >
      <form onSubmit={handleNext} className="space-y-6">
        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">Nom du cabinet / de l&apos;agence</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Cabinet Dr. Martin"
            required
            className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium mb-3 block">Votre secteur</label>
          <div className="grid grid-cols-3 gap-3">
            {SECTORS.map((s) => (
              <button key={s.value} type="button" onClick={() => setSector(s.value)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  sector === s.value
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : "border-white/5 bg-[#1C1C27] hover:border-white/10"
                }`}
              >
                <div className="text-2xl mb-2">{s.emoji}</div>
                <p className="text-white text-sm font-semibold">{s.label}</p>
                <p className="text-slate-500 text-xs mt-1">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 font-medium mb-1.5 block">
            Téléphone actuel <span className="text-slate-600">(optionnel)</span>
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+33 1 23 45 67 89"
            className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
        </div>

        <button type="submit" disabled={!name || !sector || loading}
          className="btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <>Continuer <ArrowRight size={15} /></>}
        </button>
      </form>
    </OnboardingShell>
  );
}
