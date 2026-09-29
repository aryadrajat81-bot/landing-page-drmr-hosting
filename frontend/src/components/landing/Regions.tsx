import { MapPin, Signal } from "lucide-react";
import { Reveal } from "./Reveal";

const REGIONS = [
  {
    id: "singapore",
    code: "SG",
    name: "Singapore",
    detail: "Equinix SG1 · Asia Pacific Hub",
    ping: "~8ms",
    note: "Latency rendah untuk pemain SEA & Oceania",
    testid: "region-card-singapore",
  },
  {
    id: "indonesia",
    code: "ID",
    name: "Indonesia",
    detail: "Jakarta · Local Edge Node",
    ping: "~3ms",
    note: "Ping tercepat untuk pemain lokal Indonesia",
    testid: "region-card-indonesia",
  },
];

export const Regions = () => (
  <section id="region" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8" data-testid="regions-section">
    <Reveal className="text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-emerald-300">// LOKASI SERVER</p>
      <h2 className="mx-auto mt-4 max-w-xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
        2 region tersedia, <span className="text-dream">pilih yang terdekat.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400 sm:text-base">
        Deploy server kamu di Singapore atau Indonesia — gratis pindah region kapan saja lewat dashboard.
      </p>
    </Reveal>

    <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
      {REGIONS.map((r, i) => (
        <Reveal key={r.id} delay={i * 0.1}>
          <div className="glass glass-hover group h-full rounded-2xl p-7" data-testid={r.testid}>
            <div className="flex items-center justify-between">
              <span className="glass inline-flex h-12 w-12 items-center justify-center rounded-xl">
                <MapPin className="h-6 w-6 text-cyan-300" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                AVAILABLE
              </span>
            </div>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-heading text-3xl font-black tracking-tight text-white">{r.code}</span>
              <h3 className="font-heading text-xl font-semibold text-white">{r.name}</h3>
            </div>
            <p className="mt-1.5 font-mono text-xs text-slate-500">{r.detail}</p>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">
              <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                <Signal className="h-4 w-4 text-emerald-300" />
                {r.note}
              </span>
              <span className="font-mono text-sm font-bold text-dream">{r.ping}</span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
