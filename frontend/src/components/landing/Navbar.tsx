import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { label: "Pricing", href: "#pricing", testid: "nav-pricing-link" },
  { label: "Keunggulan", href: "#keunggulan", testid: "nav-features-link" },
  { label: "Region", href: "#region", testid: "nav-region-link" },
  { label: "Modpacks", href: "#modpacks", testid: "nav-modpacks-link" },
  { label: "FAQ", href: "#faq", testid: "nav-faq-link" },
];

export const Navbar = () => (
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
      <nav className="hidden items-center gap-7 md:flex">
        {LINKS.map((l) => (
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
  </motion.header>
);
