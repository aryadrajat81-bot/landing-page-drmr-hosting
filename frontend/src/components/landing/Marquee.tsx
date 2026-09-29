import { Zap, Gem, ShieldCheck, Cpu, Package, Activity } from "lucide-react";

const ITEMS = [
  { icon: Zap, text: "5GBPS UNMETERED" },
  { icon: Gem, text: "3GB FREE FOREVER" },
  { icon: ShieldCheck, text: "GAME DDOS MITIGATION" },
  { icon: Cpu, text: "AMD EPYC POWERED" },
  { icon: Package, text: "1-CLICK MODPACKS" },
  { icon: Activity, text: "99.99% UPTIME SLA" },
];

export const Marquee = () => (
  <div className="relative border-y border-white/10 bg-white/[0.03] py-5 backdrop-blur-sm" data-testid="marquee-ribbon">
    <div className="overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-14 pr-14">
        {[...ITEMS, ...ITEMS].map(({ icon: Icon, text }, i) => (
          <span key={`${text}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
            <Icon className="h-4 w-4 text-emerald-300" />
            <span className="font-heading text-sm font-semibold tracking-[0.22em] text-slate-300">{text}</span>
          </span>
        ))}
      </div>
    </div>
  </div>
);
