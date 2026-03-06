"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PERKS = [
  "14 jours gratuits, sans carte",
  "Setup en moins de 10 minutes",
  "Support par email inclus",
];

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/onboarding/step-2` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/onboarding/step-2");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)"
      }} />

      <div className="relative w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
        {/* Left — value prop */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] font-bold text-white">S</span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-xl">Secretaria</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-white leading-tight mb-4">
            Sofia répond.<br />
            <span className="text-emerald-400">Vous vous concentrez.</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Rejoignez 500+ professionnels qui ne manquent plus jamais un appel.
          </p>
          <ul className="space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-emerald-400" />
                </div>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2.5 mb-8 md:hidden">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] font-bold text-white">S</span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-xl">Secretaria</span>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-8">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-1">
              Créer votre compte
            </h1>
            <p className="text-slate-400 text-sm mb-7">14 jours gratuits · Aucune carte requise</p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">Email professionnel</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@cabinet.fr"
                  required
                  className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 caractères minimum"
                    required
                    minLength={8}
                    className="w-full bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm mt-2 disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <>Commencer l&apos;essai gratuit <ArrowRight size={15} /></>}
              </button>

              <p className="text-xs text-slate-500 text-center pt-1">
                En créant un compte, vous acceptez nos{" "}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">CGU</a>
                {" "}et notre{" "}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">politique de confidentialité</a>.
              </p>
            </form>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Se connecter →
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
