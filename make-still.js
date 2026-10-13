const fs = require('fs');

const htmlFile = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const replacement = `<!-- Static Hero Content: Still Text -->
      <div id="scene1" class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex flex-col justify-center">
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
      <!-- Scroll Progress Bar -->`;

html = html.replace(/<!-- Scene 1: Opening Hero Content -->[\s\S]*?<!-- Scroll Progress Bar -->/, replacement);

// Also remove the opacity transitions on scene text in the script so nothing flickers or disappears
html = html.replace(/\/\/ Smooth scene transitions[\s\S]*?requestAnimationFrame\(renderLoop\);/, `requestAnimationFrame(renderLoop);`);

fs.writeFileSync(htmlFile, html, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', html, 'utf8');
console.log('Desktop HTML files successfully updated with completely still text!');
