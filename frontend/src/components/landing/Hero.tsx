import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Gauge, MemoryStick, HardDrive, Cpu } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const MaskedLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const HERO_REGIONS = [
  { code: "SG", label: "Singapore", ping: "~8ms" },
  { code: "ID", label: "Indonesia", ping: "~3ms" },
] as const;

type HeroRegionCode = (typeof HERO_REGIONS)[number]["code"];

const ServerTerminal = () => {
  const [region, setRegion] = useState<HeroRegionCode>("SG");
  const activeRegion = HERO_REGIONS.find((r) => r.code === region) ?? HERO_REGIONS[0];

  return (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: 1.5 }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: 1, delay: 0.55, ease: EASE }}
    className="glass-deep w-full max-w-md rounded-2xl p-5"
    data-testid="hero-server-terminal"
  >
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
      </div>
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-0.5" data-testid="hero-region-switcher">
        {HERO_REGIONS.map((r) => (
          <button
            key={r.code}
            type="button"
            data-testid={`hero-region-${r.code.toLowerCase()}`}
            onClick={() => setRegion(r.code)}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold transition-colors duration-200 ${
              region === r.code ? "bg-emerald-400 text-emerald-950" : "text-slate-400 hover:text-white"
            }`}
          >
            {r.code}
          </button>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        ONLINE
      </span>
    </div>
    <p className="mb-3 font-mono text-[11px] text-slate-500" data-testid="hero-region-label">
      dreamer-node-01 · {activeRegion.label} · {activeRegion.ping} ping
    </p>

    <div className="space-y-3 font-mono text-xs">
      <div>
        <div className="mb-1 flex justify-between text-slate-400">
          <span>TPS</span>
          <span className="text-emerald-300">20.0</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1, ease: EASE }}
          />
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-slate-400">
          <span>RAM</span>
          <span className="text-cyan-300">1.1 / 3.0 GB</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-300"
            initial={{ width: 0 }}
            animate={{ width: "37%" }}
            transition={{ duration: 1.2, delay: 1.15, ease: EASE }}
          />
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-1.5 rounded-xl bg-black/40 p-3.5 font-mono text-[11px] leading-relaxed">
      {[
        ["[Server]", "Done (2.41s)! World \"world\" loaded", "text-emerald-300"],
        ["[Dreamer]", "Auto-backup completed — 0 errors", "text-cyan-300"],
        ["[Net]", `DDoS shield active · ${activeRegion.code} uplink 5Gbps`, "text-slate-400"],
      ].map(([tag, msg, color], i) => (
        <motion.p
          key={msg}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 + i * 0.25, duration: 0.4 }}
          className="text-slate-300"
        >
          <span className={color}>{tag}</span> {msg}
        </motion.p>
      ))}
      <p className="text-slate-500">
        <span className="text-slate-300">&gt;</span> <span className="animate-blink">▊</span>
      </p>
    </div>
  </motion.div>
  );
};

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center overflow-hidden pt-16" data-testid="hero-section">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img src="/mc.webp" alt="Minecraft epic adventure world" className="h-full w-full object-cover" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,23,0.72) 0%, rgba(11,15,23,0.88) 55%, #0B0F17 100%), radial-gradient(circle at 18% 28%, rgba(16,185,129,0.16) 0%, transparent 55%), radial-gradient(circle at 82% 20%, rgba(6,182,212,0.14) 0%, transparent 50%)",
        }}
      />

      <div className="animate-float pointer-events-none absolute left-[8%] top-[22%] hidden h-10 w-10 rounded-md border border-emerald-300/40 bg-emerald-400/20 backdrop-blur-sm lg:block" />
      <div className="animate-float pointer-events-none absolute bottom-[26%] right-[6%] hidden h-14 w-14 rounded-md border border-cyan-300/40 bg-cyan-400/15 backdrop-blur-sm lg:block" style={{ animationDelay: "-3s" }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            data-testid="hero-badge"
          >
            <Gauge className="h-3.5 w-3.5 text-emerald-300" />
            <span className="font-mono text-xs tracking-wide text-slate-200">Next-Gen Minecraft Server Hosting</span>
          </motion.div>

          <h1 className="font-heading text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="hero-headline">
            <MaskedLine delay={0.25}>Free Minecraft</MaskedLine>
            <MaskedLine delay={0.38}>
              Hosting <span className="text-slate-500">-</span> <span className="text-dream">Forever*</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg"
            data-testid="hero-subline"
          >
            Untuk Resource <span className="font-semibold text-white">3GB Ram</span>,{" "}
            <span className="font-semibold text-white">20GB Storage</span> dan{" "}
            <span className="font-semibold text-white">1.5vCore</span> — gratis selamanya, tanpa biaya tersembunyi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://dash.drmr.my.id"
              target="_blank"
              rel="noreferrer"
              data-testid="hero-dashboard-button"
              className="glow-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-3.5 font-heading text-base font-bold text-emerald-950 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Claim Server Gratis
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#pricing"
              data-testid="hero-pricing-link"
              className="glass glass-hover inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              Lihat Pricing
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-9 flex flex-wrap gap-2.5"
            data-testid="hero-spec-pills"
          >
            {[
              { icon: MemoryStick, label: "3GB RAM DDR4 ECC" },
              { icon: HardDrive, label: "20GB NVMe Storage" },
              { icon: Cpu, label: "1.5 vCore AMD EPYC" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="glass inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs text-slate-200">
                <Icon className="h-3.5 w-3.5 text-cyan-300" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ServerTerminal />
        </div>
      </div>
    </section>
  );
};
