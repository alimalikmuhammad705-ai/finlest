const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

function renderSvgToPng(svgPath, pngPath, width = 1000) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(pngPath, pngBuffer);
  console.log(`Rendered ${svgPath} -> ${pngPath} (${width}px wide)`);
}

const args = process.argv.slice(2);
const svgFile = args[0] || 'public/images/king-crest.svg';
const pngFile = args[1] || 'public/images/king-crest-test.png';
const size = parseInt(args[2] || '1000', 10);

renderSvgToPng(svgFile, pngFile, size);
