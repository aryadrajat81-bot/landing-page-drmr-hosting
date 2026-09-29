import { Blocks } from "lucide-react";
import { Reveal } from "./Reveal";

const SOFTWARE = ["Paper", "Purpur", "Fabric", "Forge", "Spigot", "Bedrock", "GeyserMC", "BungeeCord", "Velocity", "Mohist"];

export const Software = () => (
  <section id="modpacks" className="mx-auto max-w-7xl px-5 py-20 sm:px-8" data-testid="software-section">
    <Reveal className="text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-cyan-300">// 1-CLICK INSTALLER</p>
      <h2 className="mx-auto mt-4 max-w-xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Install software favoritmu dalam <span className="text-dream">satu klik.</span>
      </h2>
    </Reveal>
    <Reveal delay={0.12}>
      <div className="mt-10 flex flex-wrap justify-center gap-3" data-testid="software-chips">
        {SOFTWARE.map((name) => (
          <span
            key={name}
            data-testid={`software-chip-${name.toLowerCase()}`}
            className="glass glass-hover inline-flex cursor-default items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm text-slate-200"
          >
            <Blocks className="h-3.5 w-3.5 text-emerald-300" />
            {name}
          </span>
        ))}
      </div>
    </Reveal>
  </section>
);
