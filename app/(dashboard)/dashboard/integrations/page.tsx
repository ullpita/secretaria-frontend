"use client";

import { useState } from "react";
import {
  Mail, Calendar, Phone, CheckCircle, XCircle, AlertCircle,
  RefreshCw, ExternalLink, Plus, Trash2, Copy
} from "lucide-react";

type IntegStatus = "connected" | "disconnected" | "error";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: IntegStatus;
  detail: string | null;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}

const STATUS_CONFIG = {
  connected:    { icon: CheckCircle,  label: "Connecté",      color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  disconnected: { icon: XCircle,      label: "Non connecté",  color: "text-slate-500",   bg: "bg-slate-500/10 border-slate-500/20" },
  error:        { icon: AlertCircle,  label: "Erreur",        color: "text-red-400",     bg: "bg-red-500/10 border-red-500/20" },
};

const PHONE_NUMBERS = [
  { number: "+33 1 86 95 00 42", label: "Numéro principal", active: true },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "gmail",
      name: "Gmail",
      description: "Envoi d'emails de confirmation et de rappels depuis votre adresse.",
      status: "connected",
      detail: "contact@cabinet-moreau.fr",
      icon: Mail,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      id: "calendar",
      name: "Google Calendar",
      description: "Vérification des disponibilités et création automatique de RDV.",
      status: "disconnected",
      detail: null,
      icon: Calendar,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ]);

  function disconnect(id: string) {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "disconnected", detail: null } : i))
    );
  }

  function connect(id: string) {
    // Simulated — in prod: redirect to OAuth
    if (id === "gmail") {
      window.location.href = "/api/auth/google?scope=gmail&redirect=/dashboard/integrations";
    } else if (id === "calendar") {
      window.location.href = "/api/auth/google?scope=calendar&redirect=/dashboard/integrations";
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Integrations */}
      <section>
        <div className="mb-4">
          <h2 className="text-white font-semibold text-base">Services connectés</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Sofia utilise ces services pour agir après chaque appel.
          </p>
        </div>

        <div className="space-y-3">
          {integrations.map((integ) => {
            const sc = STATUS_CONFIG[integ.status];
            const Icon = integ.icon;
            const StatusIcon = sc.icon;

            return (
              <div key={integ.id} className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl ${integ.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={integ.color} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-white font-semibold text-sm">{integ.name}</h3>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border ${sc.bg} ${sc.color}`}>
                        <StatusIcon size={10} />
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">{integ.description}</p>
                    {integ.detail && (
                      <p className="text-emerald-400 text-xs mt-1.5">{integ.detail}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {integ.status === "connected" ? (
                      <>
                        <button
                          onClick={() => disconnect(integ.id)}
                          className="text-xs text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 px-3 py-2 rounded-xl transition-all"
                        >
                          Déconnecter
                        </button>
                        <button className="text-xs text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 p-2 rounded-xl transition-all">
                          <RefreshCw size={13} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => connect(integ.id)}
                        className="text-xs text-white font-medium bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-4 py-2 rounded-xl transition-all"
                      >
                        Connecter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Phone numbers */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold text-base">Numéros de téléphone</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Numéros Twilio sur lesquels Sofia répond.
            </p>
          </div>
          <button className="flex items-center gap-2 text-xs text-white font-medium bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all">
            <Plus size={13} />
            Ajouter
          </button>
        </div>

        <div className="space-y-3">
          {PHONE_NUMBERS.map((p) => (
            <div key={p.number} className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm">{p.number}</p>
                    {p.active && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 sofia-pulse" />
                        Actif
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{p.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(p.number)}
                    className="text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 p-2 rounded-xl transition-all"
                    title="Copier"
                  >
                    <Copy size={13} />
                  </button>
                  <button className="text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 p-2 rounded-xl transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section>
        <h2 className="text-white font-semibold text-base mb-4">Bientôt disponible</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Notion", desc: "Synchroniser les tâches" },
            { name: "Slack",  desc: "Alertes en temps réel" },
            { name: "HubSpot", desc: "CRM automatique" },
            { name: "Doctolib", desc: "Agenda médical" },
          ].map((item) => (
            <div key={item.name} className="bg-[#13131A]/50 border border-white/5 rounded-xl p-4 opacity-50">
              <p className="text-white text-sm font-medium">{item.name}</p>
              <p className="text-slate-600 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
