"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, CheckCircle, XCircle, ExternalLink, Loader2, Phone } from "lucide-react";
import { getIntegrations, type Integration } from "@/lib/supabase/queries";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://web-production-0c79f.up.railway.app";

const INTEGRATIONS_CONFIG = [
  {
    provider: "gmail",
    label: "Gmail",
    desc: "Envoyer des emails automatiquement après chaque appel.",
    icon: Mail,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  {
    provider: "calendar",
    label: "Google Calendar",
    desc: "Créer des rendez-vous directement dans votre agenda.",
    icon: Calendar,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
];

const COMING_SOON = [
  { label: "Notion", desc: "Synchroniser les résumés d'appels dans vos bases Notion." },
  { label: "Slack", desc: "Recevoir des notifications d'appels dans vos canaux." },
  { label: "HubSpot", desc: "Créer des contacts et activités CRM automatiquement." },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIntegrations().then((data) => { setIntegrations(data); setLoading(false); });
  }, []);

  function isConnected(provider: string) {
    return integrations.some((i) => i.provider === provider);
  }

  function connectedAt(provider: string) {
    const i = integrations.find((i) => i.provider === provider);
    if (!i) return null;
    return new Date(i.connected_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  function handleConnect(provider: string) {
    window.location.href = `${BACKEND_URL}/auth/google?scope=${provider}&redirect=/dashboard/integrations`;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Google integrations */}
      <div>
        <h2 className="text-white font-semibold text-base mb-4">Intégrations Google</h2>
        <div className="space-y-4">
          {INTEGRATIONS_CONFIG.map((cfg) => {
            const connected = isConnected(cfg.provider);
            const date = connectedAt(cfg.provider);
            const Icon = cfg.icon;
            return (
              <div key={cfg.provider} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon size={20} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{cfg.label}</p>
                    {loading ? (
                      <Loader2 size={12} className="animate-spin text-slate-500" />
                    ) : connected ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} /> Connecté
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                        <XCircle size={10} /> Non connecté
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{cfg.desc}</p>
                  {connected && date && (
                    <p className="text-slate-600 text-xs mt-1">Connecté le {date}</p>
                  )}
                </div>
                <button
                  onClick={() => handleConnect(cfg.provider)}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all ${
                    connected
                      ? "text-slate-400 border-white/5 bg-white/5 hover:bg-white/10"
                      : "text-white border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  }`}
                >
                  <ExternalLink size={12} />
                  {connected ? "Reconnecter" : "Connecter"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phone number */}
      <div>
        <h2 className="text-white font-semibold text-base mb-4">Numéro de téléphone</h2>
        <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 flex items-center gap-5">
          <div className="w-11 h-11 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Phone size={20} className="text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Numéro Sofia</p>
            <p className="text-slate-500 text-xs mt-0.5">Configurez un numéro Twilio dans Vapi pour recevoir des appels.</p>
          </div>
          <a href="https://vapi.ai" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl border text-slate-400 border-white/5 bg-white/5 hover:bg-white/10 transition-all">
            <ExternalLink size={12} /> Vapi
          </a>
        </div>
      </div>

      {/* Coming soon */}
      <div>
        <h2 className="text-white font-semibold text-base mb-4">Bientôt disponible</h2>
        <div className="space-y-3">
          {COMING_SOON.map((item) => (
            <div key={item.label} className="bg-[#13131A] border border-white/5 rounded-2xl p-5 flex items-center gap-5 opacity-50">
              <div className="w-11 h-11 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center shrink-0 text-slate-500 text-xs font-bold">
                {item.label[0]}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
              </div>
              <span className="ml-auto text-xs text-slate-600 bg-white/5 px-2.5 py-1 rounded-full shrink-0">Bientôt</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
