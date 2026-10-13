const fs = require('fs');

const clients = JSON.parse(fs.readFileSync('parsed_clients.json', 'utf8'));

const half = Math.ceil(clients.length / 2);
const row1 = clients.slice(0, half);
const row2 = clients.slice(half);

function makeTrack(items) {
  const cards = items.map(c => 
    `<div class="flex items-center gap-3 card px-6 py-3 shrink-0"><span class="text-bone font-medium text-sm">${c.name}</span><span class="font-mono text-[10px] text-signal uppercase">${c.tag}</span></div>`
  ).join('\n        ');
  // Duplicate for seamless infinite marquee loop
  return cards + '\n        ' + cards;
}

const marquee1Html = makeTrack(row1);
const marquee2Html = makeTrack(row2);

const desktopHtmlPath = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html';
let html = fs.readFileSync(desktopHtmlPath, 'utf8');

// Replace Marquee Track 1
html = html.replace(
  /<div class="marquee-track flex gap-4 w-max animate-marquee">[\s\S]*?<\/div>(\s*<\/div>\s*<!-- Marquee Track 2 -->)/,
  `<div class="marquee-track flex gap-4 w-max animate-marquee">\n        ${marquee1Html}\n      </div>$1`
);

// Replace Marquee Track 2
html = html.replace(
  /<div class="marquee-track flex gap-4 w-max animate-marqueeRev">[\s\S]*?<\/div>(\s*<\/div>\s*<\/section>)/,
  `<div class="marquee-track flex gap-4 w-max animate-marqueeRev">\n        ${marquee2Html}\n      </div>$1`
);

fs.writeFileSync(desktopHtmlPath, html, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', html, 'utf8');
console.log('Successfully updated Desktop HTML files with all 101 clients!');
