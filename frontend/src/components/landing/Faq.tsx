import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Apakah Free Tier benar-benar gratis selamanya?",
    a: "Ya. Paket 3GB RAM, 20GB Storage, dan 1.5 vCore gratis selamanya tanpa kartu kredit. Cukup daftar di dashboard dan server kamu online dalam hitungan detik — selama slot free tier masih tersedia.",
  },
  {
    q: "Bagaimana cara upgrade dari Free Tier ke paket berbayar?",
    a: "Login ke dashboard, pilih server kamu, lalu klik Upgrade. Data world, plugin, dan konfigurasi kamu ikut ter-migrate otomatis tanpa perlu download ulang.",
  },
  {
    q: "Metode pembayaran apa saja yang didukung?",
    a: "Kami mendukung QRIS, GoPay, OVO, DANA, dan transfer bank. Pembayaran terverifikasi otomatis dan server langsung aktif.",
  },
  {
    q: "Apakah server saya dilindungi dari serangan DDoS?",
    a: "Semua paket — termasuk Free Tier — dilindungi Game DDoS Mitigation enterprise dengan kapasitas filtering hingga 5Gbps, tanpa biaya tambahan.",
  },
  {
    q: "Bisakah install modpack seperti RLCraft atau All The Mods?",
    a: "Sangat bisa. Tersedia 1-click installer untuk Paper, Purpur, Forge, Fabric, dan modpack berat. Untuk modpack besar kami rekomendasikan paket 8GB ke atas.",
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32" data-testid="faq-section">
      <Reveal className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-300">// FAQ</p>
        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Masih ragu? <span className="text-dream">Ini jawabannya.</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className={`glass overflow-hidden rounded-2xl transition-colors duration-300 ${isOpen ? "border-emerald-400/30" : ""}`}>
                <button
                  type="button"
                  data-testid={`faq-item-${i}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-heading text-base font-semibold text-white sm:text-lg">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5 shrink-0 text-emerald-300" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
