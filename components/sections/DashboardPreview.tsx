"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, CheckCircle, XCircle, Clock, Phone, LayoutDashboard, ListChecks, Settings, ArrowRight } from "lucide-react";

const PENDING_ACTIONS = [
  {
    id: "1",
    type: "email",
    label: "Email de confirmation RDV",
    call: "Marie Dupont · il y a 3 min",
    meta: {
      to: "marie.dupont@gmail.com",
      subject: "Confirmation de votre rendez-vous — Dr. Moreau",
      body: "Bonjour Marie,\n\nJe vous confirme votre rendez-vous avec le Dr. Moreau :\n📅 Jeudi 14 mars 2025 à 10h00\n📍 Cabinet médical, 12 rue de la Paix, Paris 2e\n\nMerci de votre confiance.\nCabinet Dr. Moreau",
    },
  },
  {
    id: "2",
    type: "calendar",
    label: "Rendez-vous médical",
    call: "Marie Dupont · il y a 3 min",
    meta: {
      title: "Consultation — Marie Dupont",
      start: "Jeu 14 mars · 10:00",
      end: "11:30",
      attendee: "marie.dupont@gmail.com",
    },
  },
];

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Phone,           label: "Appels" },
  { icon: ListChecks,      label: "Actions", badge: 2, active: true },
  { icon: CheckCircle,     label: "Tâches" },
  { icon: Settings,        label: "Paramètres" },
];

export default function DashboardPreview() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#0A0A0F]">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-b absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-emerald-400 font-semibold text-xs uppercase tracking-[0.15em] mb-4"
          >
            Vous restez aux commandes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Sofia prépare.{" "}
            <span className="gradient-text">Vous validez.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Après chaque appel, Sofia prépare les emails et rendez-vous avec le contenu
            complet. Vous les relisez, les modifiez si besoin, puis envoyez d&apos;un clic.
          </motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Browser chrome */}
          <div className="rounded-2xl overflow-hidden border border-white/8"
            style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(16,185,129,0.08)" }}
          >
            {/* Title bar */}
            <div className="bg-[#0D0D15] border-b border-white/5 px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-[#1A1A24] border border-white/5 rounded-lg px-4 py-1 flex items-center gap-2 w-72">
                  <div className="w-3 h-3 rounded-full border border-emerald-500/40 shrink-0" />
                  <span className="text-xs text-slate-500 truncate">app.secretaria.fr/dashboard/actions</span>
                </div>
              </div>
            </div>

            {/* App layout */}
            <div className="flex bg-[#0A0A0F]" style={{ minHeight: "520px" }}>

              {/* Sidebar */}
              <div className="w-14 bg-[#0D0D15] border-r border-white/5 flex flex-col items-center py-5 gap-1 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center mb-4">
                  <span className="font-bold text-white text-sm font-[family-name:var(--font-display)]">S</span>
                </div>
                {NAV.map((item) => (
                  <div key={item.label} className="relative group">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                      item.active
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-slate-600 hover:text-slate-400 hover:bg-white/5"
                    }`}>
                      <item.icon size={16} />
                    </div>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-[#0A0A0F]">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Actions en attente</h3>
                    <p className="text-slate-500 text-xs mt-0.5">2 actions à valider</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 sofia-pulse" />
                    2 en attente
                  </span>
                </div>

                {/* Action cards */}
                <div className="p-6 space-y-4 overflow-y-auto">
                  {PENDING_ACTIONS.map((action, i) => (
                    <motion.div key={action.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-[#13131A] border border-white/5 rounded-xl overflow-hidden"
                    >
                      {/* Card header */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                          action.type === "email"
                            ? "bg-red-500/10 border-red-500/20"
                            : "bg-blue-500/10 border-blue-500/20"
                        }`}>
                          {action.type === "email"
                            ? <Mail size={13} className="text-red-400" />
                            : <Calendar size={13} className="text-blue-400" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-semibold">{action.label}</p>
                          <p className="text-slate-500 text-[10px] mt-0.5">{action.call}</p>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600 text-[10px]">
                          <Clock size={10} />
                          <span>il y a 3 min</span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-4 space-y-3">
                        {action.type === "email" ? (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-[10px] text-slate-500 mb-1">Destinataire</p>
                                <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white">{action.meta.to}</div>
                              </div>
                              <div>
                                <p className="text-[10px] text-slate-500 mb-1">Objet</p>
                                <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white truncate">{action.meta.subject}</div>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 mb-1">Corps de l&apos;email</p>
                              <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2.5 text-xs text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">{action.meta.body}</div>
                            </div>
                          </>
                        ) : (
                          <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-3 md:col-span-1">
                              <p className="text-[10px] text-slate-500 mb-1">Titre</p>
                              <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white">{action.meta.title}</div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 mb-1">Début</p>
                              <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white">{action.meta.start}</div>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-500 mb-1">Fin</p>
                              <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white">{action.meta.end}</div>
                            </div>
                            <div className="col-span-3">
                              <p className="text-[10px] text-slate-500 mb-1">Participant</p>
                              <div className="bg-[#1C1C27] border border-white/5 rounded-lg px-3 py-2 text-xs text-white">{action.meta.attendee}</div>
                            </div>
                          </div>
                        )}

                        {/* Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                            <CheckCircle size={11} />
                            {action.type === "email" ? "Envoyer l'email" : "Confirmer le RDV"}
                          </button>
                          <button className="flex items-center justify-center gap-1.5 px-3 text-[11px] font-medium py-2 rounded-lg bg-white/5 border border-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/15 transition-all">
                            <XCircle size={11} />
                            Rejeter
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption below mockup */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-8 mt-10 flex-wrap"
        >
          {[
            "Contenu pré-rempli par Sofia",
            "Modifiable avant envoi",
            "Validation en 1 clic",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle size={9} className="text-emerald-400" />
              </div>
              {text}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <a href="/signup"
            className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl text-sm"
          >
            Accéder au dashboard gratuit
            <ArrowRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
