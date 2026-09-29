import { motion } from "motion/react";
import { Check, Flame, ArrowUpRight, Gem } from "lucide-react";
import { Reveal } from "./Reveal";

interface Tier {
  name: string;
  ram: string;
  storage: string;
  cpu: string;
  price: string;
  players: string;
  mods: string;
  popular?: boolean;
}

const TIERS: Tier[] = [
  { name: "Starter Craft", ram: "4GB", storage: "30GB NVMe", cpu: "2 vCore", price: "Rp40.000", players: "10 - 20 Players", mods: "Vanilla & PaperMC" },
  { name: "Adventure Pack", ram: "6GB", storage: "45GB NVMe", cpu: "2.5 vCore", price: "Rp60.000", players: "25 - 45 Players", mods: "Spigot / Purpur / Fabric Lite" },
  { name: "Pro Guild", ram: "8GB", storage: "60GB NVMe", cpu: "3 vCore", price: "Rp80.000", players: "50 - 90 Players", mods: "Heavy Modpacks + 30 Plugins", popular: true },
  { name: "Realm Master", ram: "10GB", storage: "75GB NVMe", cpu: "3.5 vCore", price: "Rp100.000", players: "90 - 150 Players", mods: "Large SMP / Velocity Network" },
  { name: "Sovereign Titan", ram: "12GB", storage: "90GB NVMe", cpu: "4 vCore", price: "Rp120.000", players: "150+ Players / Hub", mods: "Extreme Modpacks + BungeeCord" },
];

const TierCard = ({ tier, index }: { tier: Tier; index: number }) => (
  <Reveal delay={index * 0.07} className={tier.popular ? "lg:-translate-y-3" : ""}>
    <div
      data-testid={`pricing-card-${tier.ram.toLowerCase()}`}
      className={`flex h-full w-full flex-col rounded-2xl p-7 sm:w-[340px] ${
        tier.popular
          ? "glass-deep border-2 border-emerald-400/50 shadow-[0_0_50px_rgba(16,185,129,0.22)]"
          : "glass glass-hover"
      }`}
    >
      {tier.popular && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950">
          <Flame className="h-3.5 w-3.5" /> Paling Populer
        </span>
      )}
      <p className="font-mono text-xs tracking-[0.25em] text-slate-400">{tier.name.toUpperCase()}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className={`font-heading text-5xl font-black tracking-tight ${tier.popular ? "text-dream" : "text-white"}`}>
          {tier.ram}
        </span>
        <span className="pb-1.5 font-mono text-xs text-slate-400">RAM</span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-heading text-2xl font-bold text-white">{tier.price}</span>
        <span className="text-sm text-slate-400">/bulan</span>
      </div>
      <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-300">
        {[tier.storage, `${tier.cpu} AMD EPYC`, tier.players, tier.mods, "DDoS Protection + Backup Harian"].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
      <a
        href="https://dash.drmr.my.id"
        target="_blank"
        rel="noreferrer"
        data-testid={`pricing-cta-${tier.ram.toLowerCase()}`}
        className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${
          tier.popular
            ? "glow-cta bg-gradient-to-r from-emerald-400 to-cyan-400 text-emerald-950"
            : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        Order {tier.ram} Plan
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  </Reveal>
);

export const Pricing = () => (
  <section id="pricing" className="relative py-24 sm:py-32" data-testid="pricing-section">
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 60% 45% at 50% 30%, rgba(16,185,129,0.09) 0%, transparent 70%)" }}
    />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-300">// PRICING SERVER</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Mulai dari <span className="text-dream">Rp40.000</span> — scale sampai 12GB.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
          Semua paket termasuk NVMe Gen4, AMD EPYC, 5Gbps unmetered, DDoS protection, dan panel kontrol penuh.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-emerald-400/25 bg-emerald-950/40 p-5 backdrop-blur-xl sm:px-7" data-testid="free-tier-banner">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3.5">
              <span className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl">
                <Gem className="h-5 w-5 text-emerald-300" />
              </span>
              <div>
                <p className="font-heading font-bold text-emerald-50">Free Tier — Rp0 Selamanya*</p>
                <p className="text-sm text-emerald-200/70">3GB RAM · 20GB Storage · 1.5 vCore</p>
              </div>
            </div>
            <a
              href="https://dash.drmr.my.id"
              target="_blank"
              rel="noreferrer"
              data-testid="free-tier-cta-button"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300"
            >
              Ambil Gratis <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-5 grid gap-4 border-t border-emerald-400/15 pt-4 sm:grid-cols-2" data-testid="free-tier-slots">
            {[
              { code: "SG", label: "Singapore", left: 7, total: 50 },
              { code: "ID", label: "Indonesia", left: 12, total: 50 },
            ].map((s) => (
              <div key={s.code} data-testid={`free-tier-slot-${s.code.toLowerCase()}`}>
                <div className="mb-1.5 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-emerald-200/80">{s.code} · {s.label}</span>
                  <span className="font-bold text-amber-300">Sisa {s.left}/{s.total} slot</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-emerald-950/80">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.left / s.total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-wrap items-stretch justify-center gap-5">
        {TIERS.map((tier, i) => (
          <TierCard key={tier.ram} tier={tier} index={i} />
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-xs text-slate-500">
        *Free tier tersedia untuk komunitas selama slot masih ada — tanpa biaya tersembunyi.
      </p>
    </div>
  </section>
);
