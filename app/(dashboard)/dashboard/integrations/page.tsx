"use client";

import { useEffect, useState } from "react";
import { Mail, Calendar, CheckCircle, XCircle, ExternalLink, Loader2, Phone, Eye, EyeOff } from "lucide-react";
import { getIntegrations, getOrg, getPhoneConfig, setupPhone, provisionPhone, type Integration, type PhoneConfig } from "@/lib/supabase/queries";

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
  const [orgId, setOrgId] = useState<string | null>(null);

  // Phone setup state
  const [phoneConfig, setPhoneConfig] = useState<PhoneConfig | null>(null);
  const [phoneTab, setPhoneTab] = useState<"provision" | "own">("provision");
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneSid, setPhoneSid] = useState("");
  const [phoneToken, setPhoneToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneSuccess, setPhoneSuccess] = useState(false);

  useEffect(() => {
    Promise.all([getIntegrations(), getOrg(), getPhoneConfig()]).then(([data, org, phone]) => {
      setIntegrations(data);
      setOrgId(org?.id ?? null);
      setPhoneConfig(phone);
      if (!phone.configured) setShowPhoneForm(true);
      setLoading(false);
    });
  }, []);

  async function handleProvision() {
    if (!orgId) return;
    setPhoneLoading(true);
    setPhoneError(null);
    try {
      const result = await provisionPhone(orgId);
      setPhoneConfig({ configured: true, phone_number: result.phone_number, vapi_phone_id: result.vapi_phone_id, vapi_assistant_id: result.vapi_assistant_id });
      setPhoneSuccess(true);
      setShowPhoneForm(false);
    } catch (err: unknown) {
      setPhoneError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setPhoneLoading(false);
    }
  }

  async function handlePhoneSetup(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    setPhoneLoading(true);
    setPhoneError(null);
    try {
      const result = await setupPhone({
        org_id: orgId,
        twilio_account_sid: phoneSid.trim(),
        twilio_auth_token: phoneToken.trim(),
        phone_number: phoneNumber.trim(),
      });
      setPhoneConfig({ configured: true, phone_number: result.phone_number, vapi_phone_id: result.vapi_phone_id, vapi_assistant_id: result.vapi_assistant_id });
      setPhoneSuccess(true);
      setShowPhoneForm(false);
    } catch (err: unknown) {
      setPhoneError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setPhoneLoading(false);
    }
  }

  function isConnected(provider: string) {
    return integrations.some((i) => i.provider === provider);
  }

  function connectedAt(provider: string) {
    const i = integrations.find((i) => i.provider === provider);
    if (!i) return null;
    return new Date(i.connected_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  function handleConnect(provider: string) {
    if (!orgId) return;
    window.location.href = `${BACKEND_URL}/auth/google?scope=${provider}&redirect=/dashboard/integrations&org_id=${orgId}`;
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
        <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden">
          {/* Header row */}
          <div className="p-5 flex items-center gap-5">
            <div className="w-11 h-11 rounded-xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Phone size={20} className="text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white font-medium text-sm">Numéro Sofia</p>
                {loading ? (
                  <Loader2 size={12} className="animate-spin text-slate-500" />
                ) : phoneConfig?.configured ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle size={10} /> Actif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">
                    <XCircle size={10} /> Non configuré
                  </span>
                )}
              </div>
              {phoneConfig?.configured ? (
                <p className="text-emerald-400 text-xs font-mono mt-0.5">{phoneConfig.phone_number}</p>
              ) : (
                <p className="text-slate-500 text-xs mt-0.5">Entrez vos identifiants Twilio pour connecter Sofia.</p>
              )}
            </div>
            {phoneConfig?.configured && (
              <button
                onClick={() => { setShowPhoneForm(!showPhoneForm); setPhoneSuccess(false); setPhoneError(null); }}
                className="shrink-0 text-xs font-medium px-3.5 py-2 rounded-xl border text-slate-400 border-white/5 bg-white/5 hover:bg-white/10 transition-all"
              >
                Reconfigurer
              </button>
            )}
          </div>

          {/* Success banner */}
          {phoneSuccess && (
            <div className="mx-5 mb-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle size={14} />
              Sofia est active sur {phoneConfig?.phone_number}. Appelez ce numéro pour tester !
            </div>
          )}

          {/* Setup panel */}
          {showPhoneForm && (
            <div className="border-t border-white/5 p-5 space-y-4">
              {/* Tabs */}
              <div className="flex gap-2">
                {(["provision", "own"] as const).map((tab) => (
                  <button key={tab} onClick={() => { setPhoneTab(tab); setPhoneError(null); }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      phoneTab === tab
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    {tab === "provision" ? "✨ Numéro Secretaria" : "🔌 Mon numéro existant"}
                  </button>
                ))}
              </div>

              {/* Tab A — provision */}
              {phoneTab === "provision" && (
                <div className="bg-[#0E0E18] border border-white/5 rounded-xl p-5 space-y-4">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Un numéro français dédié</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Secretaria vous attribue automatiquement un numéro français.
                      Aucun compte Twilio requis. Inclus dans votre abonnement.
                    </p>
                  </div>
                  {phoneError && (
                    <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{phoneError}</p>
                  )}
                  <button onClick={handleProvision} disabled={phoneLoading}
                    className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl text-sm disabled:opacity-60"
                  >
                    {phoneLoading ? <><Loader2 size={14} className="animate-spin" /> Attribution en cours…</> : "Obtenir mon numéro →"}
                  </button>
                </div>
              )}

              {/* Tab B — bring your own */}
              {phoneTab === "own" && (
                <form onSubmit={handlePhoneSetup} className="space-y-3">
                  <p className="text-slate-400 text-xs">
                    Vos identifiants sur{" "}
                    <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-0.5">
                      console.twilio.com <ExternalLink size={10} />
                    </a>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">Account SID</label>
                      <input type="text" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={phoneSid} onChange={(e) => setPhoneSid(e.target.value)} required
                        className="w-full bg-[#0E0E18] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block">Auth Token</label>
                      <div className="relative">
                        <input type={showToken ? "text" : "password"} placeholder="••••••••••••••••••••••••••••••••"
                          value={phoneToken} onChange={(e) => setPhoneToken(e.target.value)} required
                          className="w-full bg-[#0E0E18] border border-white/10 rounded-xl px-3 py-2.5 pr-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 font-mono"
                        />
                        <button type="button" onClick={() => setShowToken(!showToken)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                          {showToken ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1.5 block">Numéro (format E.164)</label>
                    <input type="text" placeholder="+33159580013"
                      value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required
                      className="w-full bg-[#0E0E18] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 font-mono"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{phoneError}</p>
                  )}
                  <button type="submit" disabled={phoneLoading}
                    className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl text-sm disabled:opacity-60"
                  >
                    {phoneLoading ? <><Loader2 size={14} className="animate-spin" /> Configuration en cours…</> : "Connecter Sofia →"}
                  </button>
                </form>
              )}
            </div>
          )}
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
