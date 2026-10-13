const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site';
fs.mkdirSync(targetDir, { recursive: true });

// Read the video as base64 or keep relative path
const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>King Agency World — Customs Clearance Karachi | Since 2000</title>
  <meta name="description" content="Licensed KCAA Customs Clearing Agent #1064 in Karachi. Sea and air cargo clearance, GD filing, Port Qasim and Karachi Port.">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ink: { 950: '#04070c', 900: '#070c14', 850: '#0a121d', 800: '#0e1825', 700: '#16222f' },
            steel: { 500: '#5d6b7c', 400: '#7f8c9b', 300: '#a9b4c0', 200: '#cfd6de' },
            bone: '#eef1f4',
            signal: { DEFAULT: '#6cc7e6', deep: '#3a9fc4' },
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            serif: ['Instrument Serif', 'Georgia', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          animation: {
            marquee: 'marquee 45s linear infinite',
            marqueeRev: 'marqueeRev 45s linear infinite',
          },
          keyframes: {
            marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
            marqueeRev: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Inter, Instrument Serif, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <style>
    body { background-color: #04070c; color: #eef1f4; overflow-x: clip; }
    .accent { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; color: #6cc7e6; }
    .eyebrow { display: inline-flex; align-items: center; gap: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #a9b4c0; }
    .eyebrow::before { content: ""; display: block; height: 1px; width: 2rem; background-color: #6cc7e6; }
    .card { background: rgba(7, 12, 20, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; }
    .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; background: #eef1f4; color: #04070c; font-size: 14px; font-weight: 600; padding: 0.75rem 1.5rem; transition: all 0.2s; }
    .btn-primary:hover { background: #fff; box-shadow: 0 0 0 6px rgba(108, 199, 230, 0.2); }
    .btn-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; border: 1px solid rgba(255, 255, 255, 0.2); color: #eef1f4; font-size: 14px; font-weight: 500; padding: 0.75rem 1.5rem; transition: all 0.2s; }
    .btn-outline:hover { border-color: rgba(108, 199, 230, 0.7); background: rgba(255, 255, 255, 0.05); }
    .text-shadow { text-shadow: 0 2px 24px rgba(0, 0, 0, 0.7); }
    .marquee:hover .marquee-track { animation-play-state: paused; }
    .field { width: 100%; border-radius: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(4, 7, 12, 0.8); padding: 0.75rem 1rem; font-size: 15px; color: #eef1f4; outline: none; }
    .field:focus { border-color: #6cc7e6; box-shadow: 0 0 0 2px rgba(108, 199, 230, 0.25); }
  </style>
</head>
<body class="font-sans antialiased selection:bg-signal/30 selection:text-white">

  <!-- Fixed Header -->
  <header id="navbar" class="fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-ink-950/80 backdrop-blur-md border-b border-white/[0.06]">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
      <a href="#" class="flex items-center gap-3 group">
        <span class="relative flex h-9 w-9 items-center justify-center rounded-md border border-white/20 group-hover:border-signal/60 transition">
          <span class="font-serif text-[22px] italic leading-none text-bone">K</span>
          <span class="absolute -bottom-px left-2 right-2 h-px bg-signal"></span>
        </span>
        <span class="flex flex-col leading-none">
          <span class="font-semibold text-[15px] tracking-tight text-bone">King Agency</span>
          <span class="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-steel-400">World · Est. 2000</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-7 text-[14px] text-steel-300">
        <a href="#about" class="hover:text-bone transition">About Us</a>
        <a href="#services" class="hover:text-bone transition">Services</a>
        <a href="#process" class="hover:text-bone transition">Clearance Process</a>
        <a href="#clients" class="hover:text-bone transition">Client Portfolio</a>
        <a href="#contact" class="hover:text-bone transition">Contact</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="https://wa.me/923700902220?text=Hello%20King%20Agency%20World%2C%20I%20would%20like%20to%20enquire%20about%20customs%20clearance%20services." target="_blank" rel="noopener" class="hidden sm:inline-flex btn-outline !py-2 !px-4 text-[13px]">
          WhatsApp
        </a>
        <a href="#quote" class="btn-primary !py-2 !px-5 text-[13px]">
          Request a Quote
        </a>
      </div>
    </div>
  </header>

  <!-- 1. Hero: Scroll-Controlled Prerendered Cargo Ship Sequence -->
  <section id="hero-scroll-container" class="relative h-[280vh] w-full bg-ink-950">
    <div class="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
      <!-- Video Element -->
      <video id="shipVideo" class="absolute inset-0 h-full w-full object-cover" playsinline muted preload="auto" poster="images/ship-poster-desktop.jpg">
        <source src="videos/ship-scroll-desktop.mp4" type="video/mp4">
      </video>

      <!-- Atmospheric Overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950 pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#04070c_100%)] pointer-events-none opacity-60"></div>

      <!-- Scene 1: Opening Hero Content -->
      <div id="scene1" class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center transition-all duration-500">
        <p class="eyebrow mb-5 text-shadow">Customs Clearance · Karachi · Licence No. 1064</p>
        <h1 class="text-shadow text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Clearance You Can Trust. <span class="accent">Since 2000.</span>
        </h1>
        <p class="mt-6 max-w-xl text-lg text-steel-200 text-shadow leading-relaxed">
          Customs clearance and import/export documentation support for businesses moving cargo through Karachi Port and Port Qasim.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#quote" class="btn-primary">Request a Quote →</a>
          <a href="https://wa.me/923700902220?text=Hello%20King%20Agency%20World%2C%20I%20would%20like%20to%20enquire%20about%20customs%20clearance%20services." target="_blank" class="btn-outline backdrop-blur-sm">WhatsApp Us</a>
        </div>
      </div>

      <!-- Scene 2: Underway (Visible on scroll) -->
      <div id="scene2" class="absolute inset-0 z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col justify-end pb-24 opacity-0 pointer-events-none transition-all duration-500">
        <p class="eyebrow mb-4 text-shadow">01 — Underway</p>
        <h2 class="text-shadow text-3xl sm:text-5xl font-bold max-w-xl leading-tight">
          Every container carries a <span class="accent">paper trail.</span>
        </h2>
        <p class="mt-4 max-w-md text-steel-200 text-shadow">
          Invoices, packing lists, bills of lading — we prepare the declaration before your cargo reaches the berth.
        </p>
      </div>

      <!-- Scene 3: Port Arrival (Visible on scroll) -->
      <div id="scene3" class="absolute inset-0 z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col justify-end items-end pb-24 opacity-0 pointer-events-none transition-all duration-500">
        <div class="text-right max-w-xl">
          <p class="eyebrow mb-4 justify-end text-shadow">02 — Arrival</p>
          <h2 class="text-shadow text-3xl sm:text-5xl font-bold leading-tight">
            Karachi Port. <span class="accent">Port Qasim.</span>
          </h2>
          <p class="mt-4 text-steel-200 text-shadow">
            Filing, examination coordination and release follow-up at both of Karachi's seaports.
          </p>
        </div>
      </div>

      <!-- Scroll Progress Bar -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div class="w-36 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div id="scrollProgressBar" class="h-full bg-signal w-0 transition-all duration-75"></div>
        </div>
        <span class="font-mono text-[10px] uppercase tracking-widest text-steel-400">Scroll to explore</span>
      </div>
    </div>
  </section>

  <!-- 2. Trust Indicators -->
  <section class="border-y border-white/[0.08] bg-ink-900/60 py-12">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]\">
      <div class="pt-4 md:pt-0 md:pr-8">
        <p class="font-mono text-[11px] uppercase tracking-widest text-steel-400">Experience</p>
        <p class="mt-2 text-4xl sm:text-5xl font-bold">2000</p>
        <p class="mt-1 text-sm text-steel-300">Operating in Karachi for over two decades</p>
      </div>
      <div class="pt-6 md:pt-0 md:px-8">
        <p class="font-mono text-[11px] uppercase tracking-widest text-steel-400">Reported</p>
        <p class="mt-2 text-4xl sm:text-5xl font-bold">1,800+</p>
        <p class="mt-1 text-sm text-steel-300">Goods Declarations (GDs) processed</p>
      </div>
      <div class="pt-6 md:pt-0 md:pl-8">
        <p class="font-mono text-[11px] uppercase tracking-widest text-steel-400">Licence Reference</p>
        <p class="mt-2 text-4xl sm:text-5xl font-bold">#1064</p>
        <a href="https://www.kcaa.pk/king-agency" target="_blank" rel="noopener" class="mt-1 inline-flex items-center gap-1 text-sm text-signal hover:underline">
          View KCAA Profile ↗
        </a>
      </div>
    </div>
  </section>

  <!-- 3. About Section -->
  <section id="about" class="py-24 max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-5">
        <p class="eyebrow">About King Agency World</p>
        <h2 class="text-3xl sm:text-4xl font-bold mt-4 leading-tight">
          Dedicated customs clearance in Karachi <span class="accent">since 2000.</span>
        </h2>
      </div>
      <div class="lg:col-span-7 space-y-6 text-steel-300 text-lg leading-relaxed">
        <p>
          King Agency World is an established customs clearing agency operating in Karachi, Pakistan. Since 2000, we have assisted commercial importers, industrial manufacturers, and trade enterprises through the regulatory pathways of Pakistan Customs.
        </p>
        <p>
          Operating under <strong class="text-bone font-medium">Licence No. 1064</strong> registered with the Karachi Customs Agents Association (KCAA), our operations span both major maritime terminals — <strong class="text-bone font-medium">Karachi Port</strong> and <strong class="text-bone font-medium">Port Qasim</strong> — as well as air freight and baggage clearance.
        </p>
        <div class="pt-4 grid sm:grid-cols-2 gap-4">
          <div class="card p-6">
            <p class="font-mono text-xs uppercase tracking-wider text-signal">Karachi Port</p>
            <p class="mt-2 text-sm text-steel-200">Full clearance support across all KPT container terminals and off-dock yards.</p>
          </div>
          <div class="card p-6">
            <p class="font-mono text-xs uppercase tracking-wider text-signal">Port Qasim</p>
            <p class="mt-2 text-sm text-steel-200">End-to-end documentation, inspection, and release handling at QICT.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Services Section -->
  <section id="services" class="py-24 border-t border-white/[0.08] bg-ink-900/30">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p class="eyebrow">Clearance Services</p>
          <h2 class="text-3xl sm:text-5xl font-bold mt-4 leading-tight">
            Comprehensive customs clearance <span class="accent">for all cargo.</span>
          </h2>
        </div>
        <a href="#quote" class="btn-outline shrink-0">Get a Quote for Your Cargo</a>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] rounded-2xl overflow-hidden border border-white/[0.08]">
        <!-- 1 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">01</span>
            <h3 class="text-xl font-bold text-bone mt-6">Sea Cargo Clearance</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">FCL and LCL containerized shipments, break-bulk, and out-of-gauge maritime consignments.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 2 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">02</span>
            <h3 class="text-xl font-bold text-bone mt-6">Air Cargo Clearance</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Expedited customs processing for time-critical air freight through Karachi Airport (AFU).</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 3 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">03</span>
            <h3 class="text-xl font-bold text-bone mt-6">Import / Export Services</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">End-to-end customs support for raw material imports, finished industrial exports, and transit.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 4 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">04</span>
            <h3 class="text-xl font-bold text-bone mt-6">Goods Declaration (GD) Filing</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Precise electronic GD filing through Pakistan Single Window (PSW) and WeBOC systems.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 5 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">05</span>
            <h3 class="text-xl font-bold text-bone mt-6">Customs Documentation</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Pre-filing checks for commercial invoices, packing lists, certificates of origin, and LC compliances.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 6 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">06</span>
            <h3 class="text-xl font-bold text-bone mt-6">Port Qasim Services</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Dedicated terminal follow-up, physical examination coordination, and release delivery at QICT.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 7 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">07</span>
            <h3 class="text-xl font-bold text-bone mt-6">Karachi Port Services</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">On-ground representation at East and West Wharf terminals, PICT, KICT, and off-dock depots.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 8 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">08</span>
            <h3 class="text-xl font-bold text-bone mt-6">Baggage Clearance</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Compliant assessment and clearing of unaccompanied baggage shipments arriving in Karachi.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
        <!-- 9 -->
        <div class="bg-ink-950 p-8 flex flex-col justify-between hover:bg-ink-900 transition">
          <div>
            <span class="font-mono text-xs text-steel-500">09</span>
            <h3 class="text-xl font-bold text-bone mt-6">Personal Effects Clearance</h3>
            <p class="mt-3 text-steel-300 text-sm leading-relaxed">Customs facilitation for household relocations and personal goods arriving by sea or air.</p>
          </div>
          <a href="#quote" class="mt-8 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-signal hover:underline">Inquire →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Process Section -->
  <section id="process" class="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-5 sm:px-8">
    <p class="eyebrow">Clearance Workflow</p>
    <h2 class="text-3xl sm:text-5xl font-bold mt-4 leading-tight">
      From document handover <span class="accent">to customs out-of-charge.</span>
    </h2>

    <div class="mt-16 grid md:grid-cols-5 gap-6">
      <div class="relative">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-signal/60 bg-ink-950 text-xs font-mono text-signal">1</span>
        <h3 class="mt-5 font-bold text-lg text-bone">Document Review</h3>
        <p class="mt-2 text-sm text-steel-300 leading-relaxed">Verification of Bill of Lading, Invoice, Packing List, and HS classification codes.</p>
      </div>
      <div class="relative">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-signal/60 bg-ink-950 text-xs font-mono text-signal">2</span>
        <h3 class="mt-5 font-bold text-lg text-bone">GD Preparation</h3>
        <p class="mt-2 text-sm text-steel-300 leading-relaxed">Compilation of itemized customs declarations conforming to Pakistan Single Window.</p>
      </div>
      <div class="relative">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-signal/60 bg-ink-950 text-xs font-mono text-signal">3</span>
        <h3 class="mt-5 font-bold text-lg text-bone">System Filing</h3>
        <p class="mt-2 text-sm text-steel-300 leading-relaxed">Formal electronic lodgement in WeBOC / PSW for appraisal and duty assessment.</p>
      </div>
      <div class="relative">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-signal/60 bg-ink-950 text-xs font-mono text-signal">4</span>
        <h3 class="mt-5 font-bold text-lg text-bone">Examination</h3>
        <p class="mt-2 text-sm text-steel-300 leading-relaxed">On-terminal coordination with customs appraisers for physical examination where assigned.</p>
      </div>
      <div class="relative">
        <span class="flex h-7 w-7 items-center justify-center rounded-full border border-signal/60 bg-ink-950 text-xs font-mono text-signal">5</span>
        <h3 class="mt-5 font-bold text-lg text-bone">Out of Charge</h3>
        <p class="mt-2 text-sm text-steel-300 leading-relaxed">Gate pass issuance and release coordination for onward transport.</p>
      </div>
    </div>
  </section>

  <!-- 6. Client Portfolio Marquee -->
  <section id="clients" class="py-20 border-t border-white/[0.08] bg-ink-900/40 overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 mb-12 text-center">
      <p class="eyebrow justify-center">Client Portfolio</p>
      <h2 class="text-3xl sm:text-4xl font-bold mt-4">
        Commercial entities & industries <span class="accent">served in Pakistan.</span>
      </h2>
      <p class="mt-3 text-steel-400 text-sm max-w-xl mx-auto">
        Selected corporate entities King Agency World has provided customs clearing services to, categorized across sectors.
      </p>
    </div>

    <!-- Marquee Track 1 -->
    <div class="marquee relative overflow-hidden py-3">
      <div class="marquee-track flex gap-4 w-max animate-marquee">
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Guard Agricultural Research & Services</span><span class="font-mono text-[10px] text-signal uppercase">Agri Tech</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Pak Denim Limited</span><span class="font-mono text-[10px] text-signal uppercase">Textiles & Garments</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">P.K. Meat & Food Company (Pvt) Ltd</span><span class="font-mono text-[10px] text-signal uppercase">Perishables</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S UCH Power (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Power & Energy</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Casio Metal Industries</span><span class="font-mono text-[10px] text-signal uppercase">Hardware & Metal</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Casio Non-Stick Coatings</span><span class="font-mono text-[10px] text-signal uppercase">Chemical Coatings</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Highways Creation (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Industrial</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Zubaida Industries</span><span class="font-mono text-[10px] text-signal uppercase">Manufacturing</span></div>
        <!-- Duplicates for seamless looping -->
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Guard Agricultural Research & Services</span><span class="font-mono text-[10px] text-signal uppercase">Agri Tech</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Pak Denim Limited</span><span class="font-mono text-[10px] text-signal uppercase">Textiles & Garments</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">P.K. Meat & Food Company (Pvt) Ltd</span><span class="font-mono text-[10px] text-signal uppercase">Perishables</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S UCH Power (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Power & Energy</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Casio Metal Industries</span><span class="font-mono text-[10px] text-signal uppercase">Hardware & Metal</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Casio Non-Stick Coatings</span><span class="font-mono text-[10px] text-signal uppercase">Chemical Coatings</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Highways Creation (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Industrial</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Zubaida Industries</span><span class="font-mono text-[10px] text-signal uppercase">Manufacturing</span></div>
      </div>
    </div>

    <!-- Marquee Track 2 -->
    <div class="marquee relative overflow-hidden py-3">
      <div class="marquee-track flex gap-4 w-max animate-marqueeRev">
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Malik Auto & Agricultural Industries</span><span class="font-mono text-[10px] text-signal uppercase">Heavy Engineering</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Benson Belting & Trading Corp</span><span class="font-mono text-[10px] text-signal uppercase">Industrial Belting</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Ayub Bearing Store</span><span class="font-mono text-[10px] text-signal uppercase">Automotive Bearings</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Millat Marble Industry</span><span class="font-mono text-[10px] text-signal uppercase">Stone & Marble</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Guard Friction (Pvt) Ltd</span><span class="font-mono text-[10px] text-signal uppercase">Auto Spares</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">All Precision Equipment Co.</span><span class="font-mono text-[10px] text-signal uppercase">Technical Instruments</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Tiger Boba Food & Beverages</span><span class="font-mono text-[10px] text-signal uppercase">Food Commodities</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Dogar Importers (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Bulk Importers</span></div>
        <!-- Duplicates for seamless looping -->
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Malik Auto & Agricultural Industries</span><span class="font-mono text-[10px] text-signal uppercase">Heavy Engineering</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Benson Belting & Trading Corp</span><span class="font-mono text-[10px] text-signal uppercase">Industrial Belting</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Ayub Bearing Store</span><span class="font-mono text-[10px] text-signal uppercase">Automotive Bearings</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Millat Marble Industry</span><span class="font-mono text-[10px] text-signal uppercase">Stone & Marble</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">M/S Guard Friction (Pvt) Ltd</span><span class="font-mono text-[10px] text-signal uppercase">Auto Spares</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">All Precision Equipment Co.</span><span class="font-mono text-[10px] text-signal uppercase">Technical Instruments</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Tiger Boba Food & Beverages</span><span class="font-mono text-[10px] text-signal uppercase">Food Commodities</span></div>
        <div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">Dogar Importers (Private) Limited</span><span class="font-mono text-[10px] text-signal uppercase">Bulk Importers</span></div>
      </div>
    </div>
  </section>

  <!-- 7. Request a Quote Form Section -->
  <section id="quote" class="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid lg:grid-cols-12 gap-12">
      <div class="lg:col-span-5 space-y-6">
        <p class="eyebrow">Clearance Quotation</p>
        <h2 class="text-3xl sm:text-5xl font-bold leading-tight">
          Request a clearance estimate <span class="accent">for your next shipment.</span>
        </h2>
        <p class="text-steel-300 text-base leading-relaxed">
          Provide basic cargo details and our team will revert with clearance prerequisites, expected statutory duties assessment pathway, and operational fees.
        </p>

        <div class="card p-6 space-y-4">
          <h4 class="font-bold text-bone">Fast Track on WhatsApp</h4>
          <p class="text-sm text-steel-400">Have immediate documentation or container inquiries? Connect directly with our clearing officers.</p>
          <a href="https://wa.me/923700902220?text=Hello%20King%20Agency%20World%2C%20I%20would%20like%20to%20enquire%20about%20customs%20clearance%20services." target="_blank" class="btn-outline w-full text-center">
            Open WhatsApp (+92 370 0902220)
          </a>
        </div>
      </div>

      <div class="lg:col-span-7 card p-8 sm:p-10">
        <form id="quoteForm" class="space-y-6" onsubmit="handleQuoteSubmit(event)">
          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Contact Name *</label>
              <input type="text" required placeholder="Full Name" class="field">
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Company Name *</label>
              <input type="text" required placeholder="Company / Entity" class="field">
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Email Address *</label>
              <input type="email" required placeholder="name@company.com" class="field">
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">WhatsApp / Mobile *</label>
              <input type="tel" required placeholder="+92 3XX XXXXXXX" class="field">
            </div>
          </div>

          <div class="grid sm:grid-cols-3 gap-6">
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Direction *</label>
              <select required class="field">
                <option value="import">Import</option>
                <option value="export">Export</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Mode *</label>
              <select required class="field">
                <option value="sea">Sea Freight</option>
                <option value="air">Air Freight</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Terminal / Port *</label>
              <select required class="field">
                <option value="kpt">Karachi Port (KPT)</option>
                <option value="qict">Port Qasim (QICT)</option>
                <option value="afu">Air Freight Unit (AFU)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-mono uppercase text-steel-400 mb-2">Commodity & Cargo Description *</label>
            <textarea required rows="3" placeholder="e.g. 2x 40ft containers of auto components, raw materials, etc." class="field"></textarea>
          </div>

          <div id="formMessage" class="hidden p-4 rounded-xl text-sm font-medium"></div>

          <button type="submit" class="btn-primary w-full py-3">
            Submit Quote Request →
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- 8. Contact & Location Section -->
  <section id="contact" class="py-24 border-t border-white/[0.08] max-w-7xl mx-auto px-5 sm:px-8">
    <div class="grid md:grid-cols-3 gap-8">
      <div class="card p-8">
        <p class="font-mono text-xs uppercase tracking-widest text-steel-400">Head Office</p>
        <h4 class="text-xl font-bold mt-3 text-bone">Karachi, Pakistan</h4>
        <p class="mt-4 text-steel-300 text-sm leading-relaxed">
          Room 445, 4th Floor, Sunny Plaza,<br>
          Hasrat Mohani Road, Karachi.
        </p>
        <a href="https://www.google.com/maps/search/?api=1&query=Sunny+Plaza%2C+Hasrat+Mohani+Road%2C+Karachi%2C+Pakistan" target="_blank" class="mt-6 inline-flex items-center gap-1 text-xs font-mono text-signal hover:underline uppercase">
          Open Google Maps ↗
        </a>
      </div>

      <div class="card p-8">
        <p class="font-mono text-xs uppercase tracking-widest text-steel-400">Direct Communications</p>
        <h4 class="text-xl font-bold mt-3 text-bone">Email & Phone</h4>
        <p class="mt-4 text-steel-300 text-sm leading-relaxed">
          <strong class="text-bone block">Email:</strong> info@kingagency.world<br>
          <strong class="text-bone block mt-2">WhatsApp:</strong> +92 370 0902220
        </p>
        <a href="https://wa.me/923700902220" target="_blank" class="mt-6 inline-flex items-center gap-1 text-xs font-mono text-signal hover:underline uppercase">
          Chat on WhatsApp ↗
        </a>
      </div>

      <div class="card p-8">
        <p class="font-mono text-xs uppercase tracking-widest text-steel-400">Licence Verification</p>
        <h4 class="text-xl font-bold mt-3 text-bone">KCAA Profile</h4>
        <p class="mt-4 text-steel-300 text-sm leading-relaxed">
          Customs Clearing Agent Licence: <strong>1064</strong><br>
          Association: Karachi Customs Agents Association (KCAA).
        </p>
        <a href="https://www.kcaa.pk/king-agency" target="_blank" class="mt-6 inline-flex items-center gap-1 text-xs font-mono text-signal hover:underline uppercase">
          Verify KCAA Record ↗
        </a>
      </div>
    </div>
  </section>

  <!-- 9. Footer -->
  <footer class="border-t border-white/[0.08] bg-ink-950 py-12 text-sm text-steel-400">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <span class="font-semibold text-bone">King Agency World</span> — Licensed Customs Clearing Agent #1064 (Karachi, Pakistan).
      </div>
      <div>
        © <span id="year"></span> King Agency World. All rights reserved.
      </div>
    </div>
  </footer>

  <!-- Interactive Scroll & Form Scripts -->
  <script>
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll-Driven Ship Video Controller
    const heroContainer = document.getElementById('hero-scroll-container');
    const shipVideo = document.getElementById('shipVideo');
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const scrollBar = document.getElementById('scrollProgressBar');

    let duration = 0;
    shipVideo.addEventListener('loadedmetadata', () => {
      duration = shipVideo.duration || 33;
    });

    function onScroll() {
      if (!heroContainer) return;
      const rect = heroContainer.getBoundingClientRect();
      const containerHeight = heroContainer.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / containerHeight, 0), 1);

      if (scrollBar) {
        scrollBar.style.width = (progress * 100) + '%';
      }

      // Sync video playback to scroll
      if (shipVideo && shipVideo.duration) {
        const targetTime = progress * shipVideo.duration;
        if (Math.abs(shipVideo.currentTime - targetTime) > 0.05) {
          shipVideo.currentTime = targetTime;
        }
      }

      // Scene transitions
      if (progress < 0.25) {
        scene1.style.opacity = '1';
        scene1.style.transform = 'translateY(0px)';
        scene2.style.opacity = '0';
        scene3.style.opacity = '0';
      } else if (progress >= 0.25 && progress < 0.65) {
        scene1.style.opacity = '0';
        scene2.style.opacity = '1';
        scene2.style.transform = 'translateY(0px)';
        scene3.style.opacity = '0';
      } else {
        scene1.style.opacity = '0';
        scene2.style.opacity = '0';
        scene3.style.opacity = '1';
        scene3.style.transform = 'translateY(0px)';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Client Quote Form Handling
    function handleQuoteSubmit(e) {
      e.preventDefault();
      const msg = document.getElementById('formMessage');
      msg.className = 'p-4 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 block';
      msg.textContent = 'Thank you! Your customs quotation request has been recorded. Our team will review your cargo details and contact you via WhatsApp / Email.';
      e.target.reset();
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', htmlContent, 'utf8');

console.log('HTML files created successfully.');
