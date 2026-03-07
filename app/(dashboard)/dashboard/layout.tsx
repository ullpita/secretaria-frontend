"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Phone, CheckSquare, Plug, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Clock
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getPendingCount } from "@/lib/supabase/queries";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    getPendingCount().then(setPendingCount);
    // Refresh every 30s
    const interval = setInterval(() => getPendingCount().then(setPendingCount), 30_000);
    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const NAV = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: 0 },
    { href: "/dashboard/calls", icon: Phone, label: "Appels", badge: 0 },
    { href: "/dashboard/actions", icon: Clock, label: "Actions", badge: pendingCount },
    { href: "/dashboard/tasks", icon: CheckSquare, label: "Tâches", badge: 0 },
    { href: "/dashboard/integrations", icon: Plug, label: "Intégrations", badge: 0 },
    { href: "/dashboard/agent", icon: Settings, label: "Agent Sofia", badge: 0 },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0F] overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-white/5 bg-[#0D0D15] transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
        {/* Logo */}
        <div className={`flex items-center gap-2.5 px-4 h-16 border-b border-white/5 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-xs">S</span>
          </div>
          {!collapsed && (
            <span className="font-[family-name:var(--font-display)] font-bold text-white">Secretaria</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {NAV.map(({ href, icon: Icon, label, badge }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? label : undefined}
              >
                <div className="relative shrink-0">
                  <Icon size={17} />
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {badge > 9 ? "9+" : badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <span className="flex-1">{label}</span>
                )}
                {!collapsed && badge > 0 && (
                  <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-white/5 pt-4 space-y-1">
          <button onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-all w-full ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? <ChevronRight size={17} /> : <><ChevronLeft size={17} /><span>Réduire</span></>}
          </button>
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full ${collapsed ? "justify-center" : ""}`}>
            <LogOut size={17} className="shrink-0" />
            {!collapsed && "Déconnexion"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0F] shrink-0">
          <div>
            <h1 className="text-white font-semibold text-base">
              {NAV.find(n => n.href === pathname)?.label ?? "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Trial — 14 jours restants
            </div>
            <Link href="/dashboard/actions"
              className="w-9 h-9 rounded-xl bg-[#13131A] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative"
            >
              <Bell size={16} />
              {pendingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
