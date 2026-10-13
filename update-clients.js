const fs = require('fs');

const clients = JSON.parse(fs.readFileSync('parsed_clients.json', 'utf8'));

// Sector categorisation mapping for all tags
const sectorMapping = [
  {
    name: "Agri-Tech & Food Products",
    tags: [
      "Agricultural Research & Agri-Tech",
      "Meat & Food Products",
      "Livestock & Meat Products",
      "Agro-Industrial",
      "Food & Beverages"
    ]
  },
  {
    name: "Industrial, Manufacturing & Engineering",
    tags: [
      "Infrastructure & Industrial",
      "Manufacturing",
      "Metal & Hardware",
      "Engineering & Industrial Equipment",
      "Industrial Belting & Components",
      "Chemical Coatings",
      "Marble & Stone",
      "Manufacturing & Industrial",
      "Metal Fabrication & Industrial",
      "Packaging & Packaging Materials",
      "Consumer & Industrial Products",
      "Power & Energy"
    ]
  },
  {
    name: "Automotive, Bearings & Lubricants",
    tags: [
      "Automotive Parts & Friction Products",
      "Automotive & Agricultural Machinery",
      "Lubricants & Oils",
      "Automotive Parts",
      "Bearings & Automotive Parts",
      "Bearings & Industrial Parts"
    ]
  },
  {
    name: "Technology, Systems & Instruments",
    tags: [
      "Technical Equipment & Services",
      "Electronics & Technology",
      "Systems & Technology",
      "Precision & Technical Instruments",
      "Security & Technology Integration",
      "Technical Trading & Services",
      "Healthcare & Care Solutions"
    ]
  },
  {
    name: "Textiles, Trade & Logistics",
    tags: [
      "Textiles & Garments",
      "Commercial Trading",
      "Wholesale & Trading",
      "General Trading",
      "International Trading",
      "Trade & Logistics",
      "Commercial Import",
      "International Trade",
      "Commercial Import & Export",
      "Import & Export",
      "Sourcing & Procurement",
      "International Services",
      "Specialized Import & Export",
      "Crockery & Household Goods",
      "Port & Trade Services",
      "Environmental & Commercial Trading",
      "Import & Wholesale"
    ]
  }
];

// 1. Update lib/site.ts
let siteTs = fs.readFileSync('lib/site.ts', 'utf8');

const clientExportStr = `export const CLIENTS: Client[] = ${JSON.stringify(clients, null, 2)};\n\nexport const SECTORS: { name: string; tags: string[] }[] = ${JSON.stringify(sectorMapping, null, 2)};`;

siteTs = siteTs.replace(/export const CLIENTS: Client\[\] = [\s\S]*?export const PROCESS =/, `${clientExportStr}\n\nexport const PROCESS =`);

fs.writeFileSync('lib/site.ts', siteTs, 'utf8');
console.log('Updated lib/site.ts with 101 clients and updated sectors!');
