const fs = require('fs');

const desktopHtmlPath = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html';
let html = fs.readFileSync(desktopHtmlPath, 'utf8');

// 1. Update Header Logo in index.html
const oldLogoPattern = /<a href="#" class="flex items-center gap-3 group">[\s\S]*?<\/a>/;
const newLogo = `<a href="#" class="flex items-center gap-3.5 group">
        <div class="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden rounded-full border border-[#c69a3a]/40 bg-white p-0.5 shadow-md shadow-black/40 group-hover:border-[#c69a3a] transition-all duration-300">
          <img src="images/logo.jpg" alt="King Agency Logo" class="h-full w-full object-cover">
        </div>
        <div class="flex flex-col leading-none">
          <span class="font-semibold text-[15px] sm:text-[16px] tracking-tight text-[#f5f6f8] group-hover:text-[#e2b85c] transition-colors">King Agency</span>
          <span class="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-[#c69a3a]">World · Est. 2000</span>
        </div>
      </a>`;

html = html.replace(oldLogoPattern, newLogo);

// 2. Update CSS colors in <style>
html = html.replace(
  /\.accent \{ font-family: 'Instrument Serif', Georgia, serif; font-style: italic; color: #6cc7e6; \}/,
  `.accent { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; color: #e2b85c; }`
);
html = html.replace(
  /\.eyebrow::before \{ content: ""; display: block; height: 1px; width: 2rem; background-color: #6cc7e6; \}/,
  `.eyebrow::before { content: ""; display: block; height: 1px; width: 2rem; background-color: #c69a3a; }`
);
html = html.replace(
  /\.eyebrow \{ display: inline-flex; align-items: center; gap: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #a9b4c0; \}/,
  `.eyebrow { display: inline-flex; align-items: center; gap: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.22em; color: #c69a3a; }`
);
html = html.replace(
  /\.btn-primary \{ display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; background: #eef1f4; color: #04070c; font-size: 14px; font-weight: 600; padding: 0.75rem 1.5rem; transition: all 0.2s; \}/,
  `.btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; background: #c69a3a; color: #080c12; font-size: 14px; font-weight: 600; padding: 0.75rem 1.5rem; transition: all 0.2s; }`
);
html = html.replace(
  /\.btn-primary:hover \{ background: #fff; box-shadow: 0 0 0 6px rgba\(108, 199, 230, 0.2\); \}/,
  `.btn-primary:hover { background: #e2b85c; box-shadow: 0 0 0 6px rgba(198, 154, 58, 0.22); }`
);
html = html.replace(
  /\.btn-outline \{ display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; border: 1px solid rgba\(255, 255, 255, 0.2\); color: #eef1f4; font-size: 14px; font-weight: 500; padding: 0.75rem 1.5rem; transition: all 0.2s; \}/,
  `.btn-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; border: 1px solid rgba(198, 154, 58, 0.4); color: #f5f6f8; font-size: 14px; font-weight: 500; padding: 0.75rem 1.5rem; transition: all 0.2s; }`
);
html = html.replace(
  /\.btn-outline:hover \{ border-color: rgba\(108, 199, 230, 0.7\); background: rgba\(255, 255, 255, 0.05\); \}/,
  `.btn-outline:hover { border-color: #c69a3a; background: rgba(198, 154, 58, 0.12); }`
);
html = html.replace(
  /\.field:focus \{ border-color: #6cc7e6; box-shadow: 0 0 0 2px rgba\(108, 199, 230, 0.25\); \}/,
  `.field:focus { border-color: #c69a3a; box-shadow: 0 0 0 2px rgba(198, 154, 58, 0.25); }`
);

// 3. Update colors in Tailwind config inside HTML
html = html.replace(/ink: \{ 950: '#04070c'[\s\S]*?signal: \{ DEFAULT: '#6cc7e6', deep: '#3a9fc4' \},/,
  `ink: { 950: '#080c12', 900: '#0e1520', 850: '#131c2a', 800: '#1a2536', 700: '#243248' },
            gold: { DEFAULT: '#c69a3a', light: '#e2b85c', dark: '#a57d28' },
            slate: { 500: '#606b7a', 400: '#8894a4', 300: '#b5c0ce', 200: '#dbe2eb' },
            bone: '#f5f6f8',
            signal: { DEFAULT: '#c69a3a', deep: '#a57d28' },`
);

// 4. Update Footer to include large logo
const oldFooterPattern = /<footer[\s\S]*?<\/footer>/;
const newFooter = `<footer class="border-t border-[#c69a3a]/20 bg-ink-950 py-14 text-sm text-slate-400">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-12 gap-8 items-center justify-between">
      <div class="md:col-span-5 flex items-center gap-4">
        <div class="h-12 w-12 rounded-full border border-[#c69a3a]/50 bg-white p-0.5 shrink-0 overflow-hidden shadow">
          <img src="images/logo.jpg" alt="King Agency Logo" class="h-full w-full object-cover">
        </div>
        <div>
          <p class="font-semibold text-bone text-base">King Agency World</p>
          <p class="text-xs text-[#c69a3a] font-mono uppercase tracking-wider">Licensed Customs Clearing Agent #1064 (KCAA)</p>
        </div>
      </div>
      <div class="md:col-span-7 flex flex-wrap md:justify-end gap-6 text-xs text-slate-400">
        <a href="#about" class="hover:text-[#c69a3a] transition">About Us</a>
        <a href="#services" class="hover:text-[#c69a3a] transition">Services</a>
        <a href="#clients" class="hover:text-[#c69a3a] transition">Client Portfolio</a>
        <a href="#quote" class="hover:text-[#c69a3a] transition">Request a Quote</a>
        <a href="https://www.kcaa.pk/king-agency" target="_blank" class="hover:text-[#c69a3a] transition">Verify KCAA Profile ↗</a>
        <span>© <span id="year"></span> King Agency World. All rights reserved.</span>
      </div>
    </div>
  </footer>`;

html = html.replace(oldFooterPattern, newFooter);

// 5. Replace cyan color utilities with gold
html = html.replaceAll('text-signal', 'text-gold');
html = html.replaceAll('border-signal', 'border-gold');
html = html.replaceAll('bg-signal', 'bg-gold');

fs.writeFileSync(desktopHtmlPath, html, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', html, 'utf8');
console.log('Desktop HTML files successfully updated with original logo and gold brand palette!');
