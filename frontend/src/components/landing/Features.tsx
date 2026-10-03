import { motion } from "motion/react";
import { MemoryStick, Zap, Network, HardDrive } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "./lang";
import type { Lang } from "./lang";

interface FeatureItem {
  id: string;
  icon: LucideIcon;
  badge: string;
  title: string;
  desc: string;
  metric: string;
  bar: number;
  accent: string;
  barClass: string;
}

interface FeaturesCopy {
  label: string;
  headingTop: string;
  headingAccent: string;
  items: FeatureItem[];
}

const COPY: Record<Lang, FeaturesCopy> = {
  en: {
    label: "// HARDWARE ADVANTAGES",
    headingTop: "Enterprise-grade hardware,",
    headingAccent: "student-friendly pricing.",
    items: [
      { id: "ecc-ram", icon: MemoryStick, badge: "Anti-Crash & Zero Bit-Flip", title: "Server-Grade DDR4 ECC RAM", desc: "Error-Correcting Code RAM keeps your Minecraft server stable 24/7 — no memory crashes or chunk corruption, even at high TPS.", metric: "3200MHz ECC", bar: 92, accent: "text-emerald-300", barClass: "from-emerald-400 to-teal-300" },
      { id: "amd-epyc", icon: Zap, badge: "High Single-Core Turbo", title: "Powered by AMD EPYC™ Series", desc: "Enterprise AMD EPYC processors with high boost clocks keep Minecraft ticks and redstone smooth at a constant 20.0 TPS.", metric: "Zen 3/4 Architecture", bar: 96, accent: "text-cyan-300", barClass: "from-cyan-400 to-sky-300" },
      { id: "unmetered-5gbps", icon: Network, badge: "Ultra Low Latency + Anti DDoS", title: "5Gbps Unmetered Connection", desc: "A blazing 5Gbps uplink with no bandwidth caps, backed by enterprise Game DDoS Mitigation for low ping across Southeast Asia.", metric: "5 Gbps Port Speed", bar: 100, accent: "text-sky-300", barClass: "from-sky-400 to-indigo-300" },
      { id: "nvme-storage", icon: HardDrive, badge: "Blazing Fast Chunk Loading", title: "Enterprise NVMe Gen4 Storage", desc: "I/O up to 7000MB/s for instant chunk loading, freeze-free world teleports, and server restarts in seconds.", metric: "7000 MB/s R/W", bar: 98, accent: "text-violet-300", barClass: "from-violet-400 to-fuchsia-300" },
    ],
  },
  id: {
    label: "// KEUNGGULAN HARDWARE",
    headingTop: "Enterprise-grade hardware,",
    headingAccent: "harga pelajar.",
    items: [
      { id: "ecc-ram", icon: MemoryStick, badge: "Anti-Crash & Zero Bit-Flip", title: "RAM DDR4 ECC Server-Grade", desc: "Error-Correcting Code RAM memastikan server Minecraft stabil 24/7 tanpa risiko memory crash atau chunk corruption saat TPS tinggi.", metric: "3200MHz ECC", bar: 92, accent: "text-emerald-300", barClass: "from-emerald-400 to-teal-300" },
      { id: "amd-epyc", icon: Zap, badge: "High Single-Core Turbo", title: "Powered by AMD EPYC™ Series", desc: "Prosesor enterprise AMD EPYC dengan clock boost tinggi — tick Minecraft dan redstone berjalan mulus di 20.0 TPS konstan.", metric: "Zen 3/4 Architecture", bar: 96, accent: "text-cyan-300", barClass: "from-cyan-400 to-sky-300" },
      { id: "unmetered-5gbps", icon: Network, badge: "Ultra Low Latency + Anti DDoS", title: "5Gbps Connection Unmetered", desc: "Uplink 5Gbps tanpa batas kuota, dilengkapi Game DDoS Mitigation tingkat enterprise untuk ping rendah di seluruh Asia Tenggara.", metric: "5 Gbps Port Speed", bar: 100, accent: "text-sky-300", barClass: "from-sky-400 to-indigo-300" },
      { id: "nvme-storage", icon: HardDrive, badge: "Blazing Fast Chunk Loading", title: "Enterprise NVMe Gen4 Storage", desc: "I/O hingga 7000MB/s untuk instant chunk loading, teleportasi tanpa freeze, dan restart server dalam hitungan detik.", metric: "7000 MB/s R/W", bar: 98, accent: "text-violet-300", barClass: "from-violet-400 to-fuchsia-300" },
    ],
  },
};

export const Features = () => {
  const { lang } = useLang();
  const copy = COPY[lang];

  return (
    <section id="keunggulan" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32" data-testid="features-section">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-300">{copy.label}</p>
        <h2 className="mt-4 max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {copy.headingTop} <span className="text-dream">{copy.headingAccent}</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {copy.items.map((f, i) => (
          <Reveal key={f.id} delay={i * 0.08}>
            <div className="glass glass-hover group h-full rounded-2xl p-7" data-testid={`feature-card-${f.id}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="glass inline-flex h-12 w-12 items-center justify-center rounded-xl">
                  <f.icon className={`h-6 w-6 ${f.accent}`} />
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-slate-300">
                  {f.badge}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-white sm:text-2xl">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              <div className="mt-6">
                <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500">PERFORMANCE</span>
                  <span className={f.accent}>{f.metric}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${f.barClass}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${f.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
