const fs = require('fs');

const targetFiles = [
  'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king web\\index.html',
  'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king web.html',
  'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html',
  'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // 1. Remove all old scroll-tied video code and replace with clean form handler and year script only
  const scriptRegex = /<script>[\s\S]*?document\.getElementById\('year'\)[\s\S]*?<\/script>/;
  const cleanScript = `<script>
    document.getElementById('year').textContent = new Date().getFullYear();

    // Ensure continuous background video playback across all browsers
    const video = document.getElementById('shipVideo');
    if (video) {
      video.playbackRate = 1.0;
      video.play().catch(function() {
        // Autoplay policy fallback: muted autoplay is supported in all modern browsers
        video.muted = true;
        video.play();
      });
    }

    // Client Quote Form Handling
    function handleQuoteSubmit(e) {
      e.preventDefault();
      const msg = document.getElementById('formMessage');
      if (msg) {
        msg.className = 'p-4 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 block';
        msg.textContent = 'Thank you! Your customs quotation request has been recorded. Our team will review your cargo details and contact you via WhatsApp / Email.';
      }
      e.target.reset();
    }
  </script>`;

  html = html.replace(scriptRegex, cleanScript);

  // 2. Ensure Hero Section is pure continuous background video without any scroll indicators or progress bars
  const heroRegex = /<!-- 1\. Hero:[\s\S]*?<!-- 2\. Trust Indicators -->/;
  const cleanHero = `<!-- 1. Hero: Pure Continuous Background Maritime Video -->
  <section class="relative h-screen w-full overflow-hidden bg-ink-950">
    <!-- Continuously playing background video: constant speed, natural waves and foamy wake -->
    <video
      id="shipVideo"
      class="absolute inset-0 h-full w-full object-cover pointer-events-none"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      poster="images/ship-poster-desktop.jpg"
    >
      <source src="videos/hero-seamless-loop.mp4" type="video/mp4">
    </video>

    <!-- Legibility and atmosphere overlays -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080c12_100%)] opacity-70 pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950 pointer-events-none"></div>
    <div class="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-950/90 to-transparent pointer-events-none"></div>

    <!-- Stationary Hero Content with High Readability -->
    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center">
      <p class="eyebrow mb-5 text-shadow">Karachi, Pakistan · Licence No. 1064</p>
      <h1 class="text-shadow text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-3xl leading-[1.05] text-bone">
        Clearance You Can Trust. <span class="accent">Since 2000.</span>
      </h1>
      <p class="mt-6 max-w-xl text-lg text-slate-200 text-shadow leading-relaxed">
        Customs clearance and import/export documentation support for businesses moving cargo through Karachi Port and Port Qasim.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="#quote" class="btn-primary">Request a Quote →</a>
        <a href="https://wa.me/923700902220?text=Hello%20King%20Agency%20World%2C%20I%20would%20like%20to%20enquire%20about%20customs%20clearance%20services." target="_blank" class="btn-outline backdrop-blur-sm">
          WhatsApp Us
        </a>
      </div>
    </div>
  </section>

  <!-- 2. Trust Indicators -->`;

  html = html.replace(heroRegex, cleanHero);

  fs.writeFileSync(file, html, 'utf8');
  console.log('Cleaned and updated:', file);
});
