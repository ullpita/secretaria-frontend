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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/onboarding/step-2` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      // Email confirmation disabled — session immédiate
      router.push("/onboarding/step-2");
    } else {
      // Email confirmation requise
      setConfirmed(true);
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)"
        }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md text-center"
        >
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] font-bold text-white">S</span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-xl">Secretaria</span>
          </div>
          <div className="bg-[#13131A] border border-white/5 rounded-2xl p-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <Check size={24} className="text-emerald-400" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-2">
              Vérifiez votre email
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Un lien de confirmation a été envoyé à<br />
              <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-slate-500 text-xs mt-4">
              Cliquez sur le lien dans l&apos;email pour activer votre compte et accéder à l&apos;onboarding.
            </p>
          </div>
          <p className="text-center text-slate-500 text-sm mt-6">
            Déjà confirmé ?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Se connecter →
            </Link>
          </p>
        </motion.div>
      </div>
    );
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

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-5"
            >
              {googleLoading ? (
                <Loader2 size={16} className="animate-spin text-gray-500" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              Continuer avec Google
            </button>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#13131A] px-3 text-xs text-slate-500">ou par email</span>
              </div>
            </div>

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
