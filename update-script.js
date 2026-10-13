const fs = require('fs');

const htmlFile = 'C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\king-agency-site\\index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const oldScriptPattern = /<script>[\s\S]*?document\.getElementById\('year'\)[\s\S]*?<\/script>/;

const newScript = `<script>
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll-Driven Ship Video Controller
  const heroContainer = document.getElementById('hero-scroll-container');
  const shipVideo = document.getElementById('shipVideo');
  const scene1 = document.getElementById('scene1');
  const scene2 = document.getElementById('scene2');
  const scene3 = document.getElementById('scene3');
  const scrollBar = document.getElementById('scrollProgressBar');

  let targetProgress = 0;
  let currentProgress = 0;
  let isSeeking = false;
  let videoDuration = 0;

  // Preload video as Blob if served via http/https, else direct local path
  const videoSrc = 'videos/ship-scroll-desktop.mp4';
  if (window.location.protocol.startsWith('http')) {
    fetch(videoSrc)
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        shipVideo.src = blobUrl;
        shipVideo.load();
      })
      .catch(err => {
        console.warn('Direct file source will be used:', err);
      });
  }

  function updateVideoDuration() {
    if (shipVideo.duration && !isNaN(shipVideo.duration)) {
      videoDuration = shipVideo.duration;
    }
  }

  shipVideo.addEventListener('loadedmetadata', updateVideoDuration);
  shipVideo.addEventListener('canplay', () => {
    updateVideoDuration();
    shipVideo.pause();
  });
  shipVideo.addEventListener('seeked', () => {
    isSeeking = false;
  });

  function onScroll() {
    if (!heroContainer) return;
    const rect = heroContainer.getBoundingClientRect();
    const containerHeight = heroContainer.offsetHeight - window.innerHeight;
    targetProgress = Math.min(Math.max(-rect.top / containerHeight, 0), 1);

    if (scrollBar) {
      scrollBar.style.width = (targetProgress * 100) + '%';
    }

    // Smooth scene transitions
    if (targetProgress < 0.28) {
      scene1.style.opacity = '1';
      scene1.style.transform = 'translateY(0px)';
      scene2.style.opacity = '0';
      scene2.style.transform = 'translateY(20px)';
      scene3.style.opacity = '0';
      scene3.style.transform = 'translateY(20px)';
    } else if (targetProgress >= 0.28 && targetProgress < 0.68) {
      scene1.style.opacity = '0';
      scene1.style.transform = 'translateY(-20px)';
      scene2.style.opacity = '1';
      scene2.style.transform = 'translateY(0px)';
      scene3.style.opacity = '0';
      scene3.style.transform = 'translateY(20px)';
    } else {
      scene1.style.opacity = '0';
      scene1.style.transform = 'translateY(-20px)';
      scene2.style.opacity = '0';
      scene2.style.transform = 'translateY(-20px)';
      scene3.style.opacity = '1';
      scene3.style.transform = 'translateY(0px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // RAF loop for smooth frame seeking
  function renderLoop() {
    currentProgress += (targetProgress - currentProgress) * 0.15;
    
    if (shipVideo && videoDuration > 0 && !isSeeking) {
      const targetTime = Math.min(videoDuration - 0.05, Math.max(0, currentProgress * videoDuration));
      if (Math.abs(shipVideo.currentTime - targetTime) > 0.04) {
        isSeeking = true;
        shipVideo.currentTime = targetTime;
      }
    }
    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);

  // Client Quote Form Handling
  function handleQuoteSubmit(e) {
    e.preventDefault();
    const msg = document.getElementById('formMessage');
    msg.className = 'p-4 rounded-xl text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 block';
    msg.textContent = 'Thank you! Your customs quotation request has been recorded. Our team will review your cargo details and contact you via WhatsApp / Email.';
    e.target.reset();
  }
</script>`;

content = content.replace(oldScriptPattern, newScript);
fs.writeFileSync(htmlFile, content, 'utf8');
fs.writeFileSync('C:\\Users\\HAROON TRADERS\\OneDrive\\Desktop\\King_Agency_World.html', content, 'utf8');
console.log('Updated index.html and King_Agency_World.html successfully!');
