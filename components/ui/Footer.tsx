export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] font-bold text-white text-sm">S</span>
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-white text-lg">Secretaria</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              L&apos;agent IA qui répond à vos appels, prend vos rendez-vous et envoie vos emails — 24h/24.
            </p>
          </div>
          {[
            { title: "Produit", links: ["Fonctionnalités", "Tarifs", "Intégrations", "API"] },
            { title: "Secteurs", links: ["Médical", "Immobilier", "Juridique", "Autres"] },
            { title: "Légal", links: ["Mentions légales", "Confidentialité", "CGU", "RGPD"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-white text-sm mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 text-sm hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Secretaria. Tous droits réservés.</p>
          <p className="text-slate-500 text-sm">Hébergé en France · Conforme RGPD · Chiffrement AES-256</p>
        </div>
      </div>
    </footer>
  );
}
