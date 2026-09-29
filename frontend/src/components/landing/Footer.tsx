import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/10" data-testid="footer">
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 55% 60% at 50% 110%, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
    />
    <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <Logo size={44} />
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Next-Gen High Performance Minecraft Server Hosting — mulai gratis, scale kapan saja.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 font-mono text-xs text-emerald-300" data-testid="footer-status-badge">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            All Systems Operational
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs tracking-[0.25em] text-slate-500">MULAI SEKARANG</p>
          <a
            href="https://dash.drmr.my.id"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-dashboard-link"
            className="glow-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 font-heading text-sm font-bold text-emerald-950 transition-transform duration-300 hover:scale-[1.03]"
          >
            Buka Dashboard
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#pricing" data-testid="footer-pricing-link" className="text-sm text-slate-400 transition-colors hover:text-white">
            Lihat paket berbayar →
          </a>
        </div>
      </div>

      <p className="mt-16 select-none text-center font-heading text-[13vw] font-black leading-none tracking-tight text-white/[0.045] md:text-[9rem]" aria-hidden="true">
        DREAMER HOST
      </p>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 font-mono text-xs text-slate-500 sm:flex-row">
        <span>© 2026 Dreamer Host — drmr.my.id</span>
        <span>Crafted with obsidian & glass.</span>
      </div>
    </div>
  </footer>
);
