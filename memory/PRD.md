# PRD — Dreamer Host Landing Page

## Original Problem Statement
Landing page "Dreamer Host" — Free Minecraft Hosting dengan tema Minecraft + Liquid Glass ala macOS/iOS. Hero dengan background upload user, headline "Free Minecraft Hosting - Forever*", subline "Untuk Resource 3GB Ram, 20GB Storage dan 1.5vCore", direct button ke https://dash.drmr.my.id, pricing mulai 4GB/30GB/2vCore @ Rp40.000 kelipatan sampai 12GB, keunggulan (DDR4 ECC, AMD EPYC, 5Gbps Unmetered, NVMe), sisanya bebas.

## User Choices (dari ask_human)
- Pricing naik per 2GB: 4 / 6 / 8 / 10 / 12GB
- Bahasa campuran (Indonesia + istilah teknis English)
- Section: hanya yang diminta, sisanya keputusan agent
- Koreksi copy: "Forever*" (bukan "For Ever")

## User Personas
- Pemain Minecraft Indonesia (pelajar/komunitas) yang cari server gratis/murah
- Owner SMP/community server yang butuh performa stabil dengan budget terbatas

## Core Requirements (static)
1. Hero: bg artwork Minecraft upload user, headline "Free Minecraft Hosting - Forever*", subline resource free tier, CTA ke dash.drmr.my.id
2. Pricing 5 tier per 2GB: 4GB Rp40.000 → 12GB Rp120.000
3. Keunggulan: DDR4 ECC, AMD EPYC, 5Gbps Unmetered, NVMe
4. Tema: Minecraft x Liquid Glass (glassmorphism gelap, emerald/cyan)
5. Semua CTA order mengarah ke https://dash.drmr.my.id

## Implemented (2026-09-29)
- Landing page lengkap: glass navbar, hero (masked line-by-line reveal, parallax bg, glass server terminal mockup), marquee ribbon, bento keunggulan (4 kartu + animated meter), free tier banner + 5 pricing tier (8GB = Paling Populer), 1-click installer chips (Paper/Purpur/Fabric/dst), FAQ accordion, footer editorial
- Logo SVG original (pixel cloud + diamond cube) dipakai sebagai favicon
- Lenis smooth scroll + motion/react scroll reveals, micro-interactions, noise grain overlay
- Fonts: Space Grotesk (heading), DM Sans (body), JetBrains Mono (specs)
- data-testid di semua elemen interaktif
- Backend template tidak diubah (hanya /api/status); landing page fully static frontend
- (2026-09-29) Section "Lokasi Server": 2 region glass card — Singapore (Equinix SG1, ~8ms) & Indonesia (Jakarta Local Edge, ~3ms) + nav link "Region"
- (2026-09-29) Logo diganti foto upload user (public/logo.png, rounded-xl) di navbar/footer + favicon; hero terminal punya region switcher interaktif SG/ID (label node & ping ikut berubah); banner Free Tier menampilkan sisa slot per region (SG 7/50, ID 12/50 — angka MOCKED statis)
- (2026-09-29) Ping checker interaktif per region kartu (5 probes beranimasi, hasil min ms — nilai SIMULATED, bukan pengukuran jaringan asli); tombol Discord (https://discord.gg/Qw4hDryZS2) di navbar + footer; badge uptime footer jadi link ke HetrixTools monitor
- (2026-09-29) FAQ section dihapus total (section + nav link); region Indonesia jadi "DCI JKT1 - Local Edge Node"; total slot diubah SG 7/12 & ID 3/8 (MOCKED); heading pricing "// PRICING SERVER" → "Butuh Resource Lebih?"
- (2026-09-29) Ping checker kini PENGUKURAN ASLI: 5 probe HTTPS RTT dari browser pengunjung ke node1.drmr.my.id (SG) & node3.drmr.my.id (JKT), hasil = min probe, timeout 5s; hostname node ditampilkan di kartu region

## Verification
- `yarn typecheck` clean
- POST+GET /api/status via public URL OK
- Screenshot e2e: hero, pricing, FAQ/footer terverifikasi visual

## Backlog / Next
- P1: Live server status nyata (query node Minecraft asli)
- P1: Kalkulator RAM slider interaktif (harga live)
- P2: Ping/latency checker real-time per region
- P2: Halaman detail per paket / blog SEO
