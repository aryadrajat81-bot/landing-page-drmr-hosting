import { useState } from "react";
import { MapPin, Signal, Activity, Loader2, RotateCcw } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "./lang";
import type { Lang } from "./lang";

const REGIONS = [
  {
    id: "singapore",
    code: "SG",
    name: "Singapore",
    detail: "Equinix SG1 · Asia Pacific Hub",
    host: "node1.drmr.my.id",
    ping: "~8ms",
    testid: "region-card-singapore",
  },
  {
    id: "indonesia",
    code: "ID",
    name: "Indonesia",
    detail: "DCI JKT1 - Local Edge Node",
    host: "node3.drmr.my.id",
    ping: "~3ms",
    testid: "region-card-indonesia",
  },
];

const PING_TIMEOUT_MS = 5000;

interface PingState {
  phase: "idle" | "testing" | "done";
  probes: number[];
  result: number | null;
}

interface RegionCopy {
  label: string;
  headingTop: string;
  headingAccent: string;
  desc: string;
  notes: Record<string, string>;
  test: string;
  pinging: string;
  again: string;
}

const COPY: Record<Lang, RegionCopy> = {
  en: {
    label: "// SERVER LOCATIONS",
    headingTop: "2 regions available,",
    headingAccent: "pick the closest.",
    desc: "Deploy your server in Singapore or Indonesia — switch regions anytime for free from the dashboard.",
    notes: {
      singapore: "Low latency for SEA & Oceania players",
      indonesia: "Fastest ping for local Indonesian players",
    },
    test: "Test Ping Live",
    pinging: "Pinging",
    again: "Test Again",
  },
  id: {
    label: "// LOKASI SERVER",
    headingTop: "2 region tersedia,",
    headingAccent: "pilih yang terdekat.",
    desc: "Deploy server kamu di Singapore atau Indonesia — gratis pindah region kapan saja lewat dashboard.",
    notes: {
      singapore: "Latency rendah untuk pemain SEA & Oceania",
      indonesia: "Ping tercepat untuk pemain lokal Indonesia",
    },
    test: "Test Ping Live",
    pinging: "Pinging",
    again: "Test Ulang",
  },
};

// Browser tidak bisa ICMP ping — ini mengukur RTT koneksi HTTPS nyata ke node.
const probeHost = async (host: string): Promise<number> => {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), PING_TIMEOUT_MS);
  const start = performance.now();
  try {
    await fetch(`https://${host}/?ping=${Date.now()}`, {
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    });
  } catch {
    // Connection refused/reset tetap berarti node menjawab — waktu pulang-pergi itulah latensinya.
  } finally {
    window.clearTimeout(timer);
  }
  return Math.round(performance.now() - start);
};

export const Regions = () => {
  const [pings, setPings] = useState<Record<string, PingState>>({});
  const { lang } = useLang();
  const copy = COPY[lang];

  const runPing = async (regionId: string, host: string) => {
    setPings((p) => ({ ...p, [regionId]: { phase: "testing", probes: [], result: null } }));
    const probes: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      const ms = await probeHost(host);
      probes.push(ms);
      const done = probes.length === 5;
      setPings((p) => ({
        ...p,
        [regionId]: { phase: done ? "done" : "testing", probes: [...probes], result: done ? Math.min(...probes) : null },
      }));
    }
  };

  return (
    <section id="region" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8" data-testid="regions-section">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-300">{copy.label}</p>
        <h2 className="mx-auto mt-4 max-w-xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {copy.headingTop} <span className="text-dream">{copy.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400 sm:text-base">{copy.desc}</p>
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
                <p className="mt-1 font-mono text-[10px] text-slate-600">{r.host}</p>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-black/30 px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <Signal className="h-4 w-4 text-emerald-300" />
                    {copy.notes[r.id]}
                  </span>
                  <span className="font-mono text-sm font-bold text-dream" data-testid={`ping-result-${r.id}`}>
                    {state?.phase === "done" && state.result !== null
                      ? state.result >= PING_TIMEOUT_MS
                        ? "timeout"
                        : `${state.result}ms`
                      : r.ping}
                  </span>
                </div>
                <button
                  type="button"
                  data-testid={`ping-test-${r.id}`}
                  onClick={() => runPing(r.id, r.host)}
                  disabled={testing}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-400/10 disabled:cursor-wait disabled:opacity-70"
                >
                  {testing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-300" />
                      {copy.pinging} {r.host}...
                    </>
                  ) : state?.phase === "done" ? (
                    <>
                      <RotateCcw className="h-4 w-4 text-emerald-300" />
                      {copy.again}
                    </>
                  ) : (
                    <>
                      <Activity className="h-4 w-4 text-emerald-300" />
                      {copy.test}
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
