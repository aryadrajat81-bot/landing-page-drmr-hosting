import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Features } from "@/components/landing/Features";
import { Regions } from "@/components/landing/Regions";
import { Pricing } from "@/components/landing/Pricing";
import { Software } from "@/components/landing/Software";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="noise min-h-screen bg-[#0B0F17] font-sans text-slate-100" data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Regions />
        <Pricing />
        <Software />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
