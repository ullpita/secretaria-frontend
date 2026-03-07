"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://web-production-0c79f.up.railway.app";

export default function ConfirmDeletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("Lien invalide — token manquant.");
      setStatus("error");
      return;
    }

    async function confirm() {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/account/confirm-delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (!res.ok) throw new Error(await res.text());

        const sb = createClient();
        await sb.auth.signOut();
        setStatus("success");
        setTimeout(() => router.push("/login"), 3000);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Erreur inattendue.");
        setStatus("error");
      }
    }

    confirm();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6">
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center mx-auto mb-2">
          <span className="font-bold text-white text-sm">S</span>
        </div>

        {status === "loading" && (
          <>
            <Loader2 size={28} className="animate-spin text-slate-400 mx-auto" />
            <p className="text-white font-medium">Suppression en cours...</p>
            <p className="text-slate-500 text-sm">Vos données sont effacées.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle size={24} className="text-emerald-400" />
            </div>
            <p className="text-white font-semibold">Compte supprimé</p>
            <p className="text-slate-500 text-sm">Toutes vos données ont été effacées. Redirection vers la page de connexion...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
              <XCircle size={24} className="text-red-400" />
            </div>
            <p className="text-white font-semibold">Échec de la suppression</p>
            <p className="text-red-400 text-sm">{error}</p>
            <a
              href="/dashboard/agent"
              className="inline-block text-xs text-slate-500 hover:text-white transition-colors mt-2"
            >
              Retour au dashboard
            </a>
          </>
        )}
      </div>
    </div>
  );
}
