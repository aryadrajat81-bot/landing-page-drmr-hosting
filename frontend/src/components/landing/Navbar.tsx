import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Logo } from "./Logo";
import { useLang } from "./lang";
import type { Lang } from "./lang";

const LINKS: Record<Lang, { label: string; href: string; testid: string }[]> = {
  en: [
    { label: "Pricing", href: "#pricing", testid: "nav-pricing-link" },
    { label: "Features", href: "#keunggulan", testid: "nav-features-link" },
    { label: "Region", href: "#region", testid: "nav-region-link" },
    { label: "Modpacks", href: "#modpacks", testid: "nav-modpacks-link" },
  ],
  id: [
    { label: "Pricing", href: "#pricing", testid: "nav-pricing-link" },
    { label: "Keunggulan", href: "#keunggulan", testid: "nav-features-link" },
    { label: "Region", href: "#region", testid: "nav-region-link" },
    { label: "Modpacks", href: "#modpacks", testid: "nav-modpacks-link" },
  ],
};

export const Navbar = () => {
  const { lang, setLang } = useLang();

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0"
      data-testid="navbar"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" data-testid="nav-home-link" aria-label="Dreamer Host home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS[lang].map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testid}
              className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-black/30 p-0.5" data-testid="lang-switcher">
            {(["en", "id"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                data-testid={`lang-switch-${l}`}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-colors duration-200 ${
                  lang === l ? "bg-emerald-400 text-emerald-950" : "text-slate-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="https://discord.gg/Qw4hDryZS2"
            target="_blank"
            rel="noreferrer"
            data-testid="nav-discord-button"
            aria-label="Join Discord Dreamer Host"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-indigo-400/40 hover:text-indigo-300 sm:inline-flex"
          >
            <SiDiscord size={15} />
          </a>
          <a
            href="https://dash.drmr.my.id"
            target="_blank"
            rel="noreferrer"
            data-testid="nav-dashboard-link"
            className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition-colors duration-200 hover:bg-emerald-300"
          >
            Dashboard
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
};
