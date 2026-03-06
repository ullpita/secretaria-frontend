"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Tarifs", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0F]/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-sm">S</span>
          </div>
          <span className="font-[family-name:var(--font-display)] font-bold text-white text-lg">Secretaria</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">
            Se connecter
          </a>
          <a href="/signup" className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl">
            Essai gratuit 14j
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#13131A] border-b border-white/5 px-6 py-4 space-y-3"
        >
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="block text-sm text-slate-400 hover:text-white py-2" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            <a href="/login" className="text-sm text-slate-400 text-center py-2">Se connecter</a>
            <a href="/signup" className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-xl text-center">
              Essai gratuit 14j
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
