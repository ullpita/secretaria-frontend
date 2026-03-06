"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save, Phone, Mic, MicOff, Volume2, Settings2,
  CheckCircle, Info, ChevronDown
} from "lucide-react";

const VOICES = [
  { id: "nova",    label: "Nova",    desc: "Voix féminine, chaleureuse" },
  { id: "shimmer", label: "Shimmer", desc: "Voix féminine, professionnelle" },
  { id: "echo",    label: "Echo",    desc: "Voix masculine, posée" },
];

const SECTORS = [
  { id: "medical",    label: "Médical / Cabinet" },
  { id: "immobilier", label: "Immobilier / Agence" },
  { id: "juridique",  label: "Juridique / Cabinet d'avocats" },
  { id: "autre",      label: "Autre secteur" },
];

export default function AgentPage() {
  const [agentName, setAgentName]     = useState("Sofia");
  const [greeting, setGreeting]       = useState("Bonjour, Cabinet Dr. Moreau, je suis Sofia, comment puis-je vous aider ?");
  const [prompt, setPrompt]           = useState("Tu es un assistant vocal professionnel et bienveillant. Tu prends les rendez-vous, tu réponds aux questions courantes et tu transmets les messages urgents. Tu es toujours polie, claire et concise. Tu ne donnes jamais de conseils médicaux ou juridiques.");
  const [voice, setVoice]             = useState("nova");
  const [sector, setSector]           = useState("medical");
  const [saved, setSaved]             = useState(false);
  const [calling, setCalling]         = useState(false);
  const [called, setCalled]           = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function simulateCall() {
    setCalling(true);
    setTimeout(() => { setCalling(false); setCalled(true); }, 3000);
  }

  const currentVoice = VOICES.find((v) => v.id === voice)!;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white font-semibold text-lg">Configuration de {agentName}</h2>
          <p className="text-slate-500 text-sm mt-0.5">Personnalisez le comportement de votre agent vocal.</p>
        </div>
        <button
          onClick={save}
          className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-emerald-500/20 hover:bg-emerald-500/30 text-white border border-emerald-500/30"
          }`}
        >
          {saved ? <CheckCircle size={15} /> : <Save size={15} />}
          {saved ? "Sauvegardé !" : "Sauvegarder"}
        </button>
      </div>

      {/* Identity */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 space-y-5">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Settings2 size={15} className="text-slate-500" />
          Identité de l&apos;agent
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">Prénom de l&apos;agent</label>
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40"
              placeholder="Sofia"
            />
          </div>

          {/* Sector */}
          <div>
            <label className="block text-xs text-slate-500 mb-2 font-medium">Secteur</label>
            <div className="relative">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 appearance-none"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div>
          <label className="block text-xs text-slate-500 mb-2 font-medium">
            Message d&apos;accueil
          </label>
          <textarea
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            rows={2}
            className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none"
            placeholder="Bonjour, Cabinet Dr. Moreau..."
          />
          <p className="text-slate-600 text-xs mt-1.5 flex items-center gap-1">
            <Info size={11} />
            Première phrase prononcée à chaque appel entrant.
          </p>
        </div>
      </div>

      {/* Prompt */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Settings2 size={15} className="text-slate-500" />
            Instructions de l&apos;agent
          </div>
          <span className="text-xs text-slate-600">{prompt.length} car.</span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          className="w-full bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed"
          placeholder="Décrivez le comportement de Sofia..."
        />
        <div className="p-3.5 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-start gap-2.5">
          <Info size={13} className="text-amber-400 mt-0.5 shrink-0" />
          <p className="text-amber-400/80 text-xs leading-relaxed">
            Ces instructions sont transmises à Sofia avant chaque appel. Soyez précis : types de demandes acceptées, escalades, informations à collecter.
          </p>
        </div>
      </div>

      {/* Voice */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Volume2 size={15} className="text-slate-500" />
          Voix de l&apos;agent
        </div>

        <div className="grid grid-cols-3 gap-3">
          {VOICES.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                voice === v.id
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-white/5 bg-black/20 hover:border-white/10"
              }`}
            >
              <p className={`text-sm font-medium ${voice === v.id ? "text-emerald-400" : "text-white"}`}>
                {v.label}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">{v.desc}</p>
            </button>
          ))}
        </div>

        <p className="text-slate-600 text-xs">
          Voix sélectionnée : <span className="text-slate-400">{currentVoice.label} — {currentVoice.desc}</span>
        </p>
      </div>

      {/* Test call */}
      <div className="bg-[#13131A] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-white mb-5">
          <Phone size={15} className="text-slate-500" />
          Tester {agentName}
        </div>

        {!called ? (
          <div className="text-center">
            <div className="relative inline-flex mb-5">
              <div className={`w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center ${calling ? "sofia-pulse" : ""}`}>
                <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-emerald-400">
                  {agentName[0]}
                </span>
              </div>
              {calling && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            <p className="text-slate-400 text-sm mb-5">
              {calling
                ? `${agentName} répond avec la voix ${currentVoice.label}...`
                : `Lancez un appel test avec la configuration actuelle.`}
            </p>

            {!calling ? (
              <button
                onClick={simulateCall}
                className="btn-primary inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl text-sm"
              >
                <Phone size={16} />
                Appeler {agentName}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2 bg-[#1C1C27] border border-white/5 rounded-xl px-4 py-2.5">
                  <Mic size={14} className="text-emerald-400 sofia-pulse" />
                  <span className="text-white text-sm">En écoute</span>
                </div>
                <button
                  onClick={() => { setCalling(false); setCalled(true); }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                >
                  <MicOff size={14} />
                  Raccrocher
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={22} className="text-emerald-400" />
            </div>
            <p className="text-white font-semibold text-sm mb-1">{agentName} est opérationnelle</p>
            <p className="text-slate-500 text-sm mb-4">L&apos;appel test s&apos;est déroulé correctement.</p>
            <button
              onClick={() => setCalled(false)}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Relancer un test
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
