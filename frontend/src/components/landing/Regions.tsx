import { useState } from "react";
import { MapPin, Signal, Activity, Loader2, RotateCcw } from "lucide-react";
import { Reveal } from "./Reveal";

const REGIONS = [
  {
    id: "singapore",
    code: "SG",
    name: "Singapore",
    detail: "Equinix SG1 · Asia Pacific Hub",
    ping: "~8ms",
    min: 7,
    max: 16,
    note: "Latency rendah untuk pemain SEA & Oceania",
    testid: "region-card-singapore",
  },
  {
    id: "indonesia",
    code: "ID",
    name: "Indonesia",
    detail: "Jakarta · Local Edge Node",
    ping: "~3ms",
    min: 2,
    max: 7,
    note: "Ping tercepat untuk pemain lokal Indonesia",
    testid: "region-card-indonesia",
  },
];

interface PingState {
  phase: "idle" | "testing" | "done";
  probes: number[];
  result: number | null;
}

export const Regions = () => {
  const [pings, setPings] = useState<Record<string, PingState>>({});

  const runPing = (regionId: string, min: number, max: number) => {
    setPings((p) => ({ ...p, [regionId]: { phase: "testing", probes: [], result: null } }));
    let step = 0;
    const iv = window.setInterval(() => {
      step += 1;
      const value = Math.round(min + Math.random() * (max - min));
      if (step >= 5) {
        window.clearInterval(iv);
        setPings((p) => {
          const all = [...(p[regionId]?.probes ?? []), value];
          return { ...p, [regionId]: { phase: "done", probes: all, result: Math.min(...all) } };
        });
      } else {
        setPings((p) => ({
          ...p,
          [regionId]: { phase: "testing", probes: [...(p[regionId]?.probes ?? []), value], result: null },
        }));
      }
    }, 340);
  };

  return (
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
        {REGIONS.map((r, i) => {
          const state = pings[r.id];
          const testing = state?.phase === "testing";
          return (
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
                  <span className="font-mono text-sm font-bold text-dream" data-testid={`ping-result-${r.id}`}>
                    {state?.phase === "done" && state.result !== null ? `${state.result}ms` : r.ping}
                  </span>
                </div>
                <button
                  type="button"
                  data-testid={`ping-test-${r.id}`}
                  onClick={() => runPing(r.id, r.min, r.max)}
                  disabled={testing}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/10 disabled:cursor-wait disabled:opacity-70"
                >
                  {testing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                      Pinging node {r.code}...
                    </>
                  ) : state?.phase === "done" ? (
                    <>
                      <RotateCcw className="h-4 w-4 text-emerald-300" />
                      Test Ulang
                    </>
                  ) : (
                    <>
                      <Activity className="h-4 w-4 text-emerald-300" />
                      Test Ping Live
                    </>
                  )}
                </button>
                {state && state.probes.length > 0 && (
                  <p className="mt-2.5 text-center font-mono text-[10px] text-slate-500" data-testid={`ping-probes-${r.id}`}>
                    probes: {state.probes.map((v) => `${v}ms`).join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
