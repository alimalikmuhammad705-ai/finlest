const fs = require('fs');

const desktopHtmlPath = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html';
let html = fs.readFileSync(desktopHtmlPath, 'utf8');

// Replace the hero section so it uses the continuous seamless looping video
const heroPattern = /<!-- 1\. Hero: Scroll-Controlled Prerendered Cargo Ship Sequence -->[\s\S]*?<!-- 2\. Trust Indicators -->/;

const newHero = `<!-- 1. Hero: Continuous Realistic Ship & Ocean Animation -->
  <section class="relative h-screen w-full overflow-hidden bg-ink-950">
    <!-- Video Element: Autoplays continuously, smooth seamless looping, unaffected by scroll -->
    <video id="shipVideo" class="absolute inset-0 h-full w-full object-cover" autoplay loop muted playsinline preload="auto" poster="images/ship-poster-desktop.jpg">
      <source src="videos/hero-seamless-loop.mp4" type="video/mp4">
      <source src="videos/ship-scroll-desktop.mp4" type="video/mp4">
    </video>

    <!-- Atmospheric Overlays -->
    <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950 pointer-events-none"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#04070c_100%)] pointer-events-none opacity-60"></div>
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/80 to-transparent pointer-events-none"></div>

    <!-- Stationary Headline & Copy -->
    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center">
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
  </section>

  <!-- 2. Trust Indicators -->`;

html = html.replace(heroPattern, newHero);

fs.writeFileSync(desktopHtmlPath, html, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', html, 'utf8');
console.log('Desktop HTML files updated with continuous ship background video!');
