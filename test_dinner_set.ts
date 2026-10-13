import { calculateImportDuty } from "./lib/tariff/calculator";

console.log("=== RUNNING DINNER SET (PCT 691110100000) VERIFICATION ===");

// 1. WeBOC Assessment Case: Non-Filer Commercial Importer
const resNonFiler = calculateImportDuty({
  productDescription: "Dinner Set",
  pctCode: "691110100000",
  countryOfOrigin: "China",
  goodsValue: 10000,
  currency: "USD",
  importerCategory: "commercial",
  taxpayerStatus: "non_filer",
  financialYear: "2026-2027",
});

console.log("\n--- TEST CASE 1: WeBOC Reported Assessment (Commercial Non-Filer) ---");
console.log("PCT Code:", resNonFiler.pctCode, "-> Normalized:", resNonFiler.normalizedPctCode);
console.log("Product:", resNonFiler.officialDescription);
console.log("Assessable Value (PKR):", resNonFiler.assessableValuePKR.toLocaleString());

const cd = resNonFiler.taxes.find((t) => t.code === "CD")!;
const acd = resNonFiler.taxes.find((t) => t.code === "ACD")!;
const rd = resNonFiler.taxes.find((t) => t.code === "RD")!;
const st = resNonFiler.taxes.find((t) => t.code === "ST")!;
const ast = resNonFiler.taxes.find((t) => t.code === "AST")!;
const wht = resNonFiler.taxes.find((t) => t.code === "WHT")!;

console.log(`CD:  ${cd.ratePercent}% -> PKR ${cd.amountPKR.toLocaleString()} (${cd.legalBasis})`);
console.log(`ACD: ${acd.ratePercent}% -> PKR ${acd.amountPKR.toLocaleString()} (${acd.legalBasis})`);
console.log(`RD:  ${rd.ratePercent}% -> PKR ${rd.amountPKR.toLocaleString()} (${rd.legalBasis})`);
console.log(`ST:  ${st.ratePercent}% -> PKR ${st.amountPKR.toLocaleString()} (${st.legalBasis})`);
console.log(`AST: ${ast.ratePercent}% -> PKR ${ast.amountPKR.toLocaleString()} (${ast.legalBasis})`);
console.log(`WHT: ${wht.ratePercent}% -> PKR ${wht.amountPKR.toLocaleString()} (${wht.legalBasis})`);
console.log(`Total Duties & Taxes: PKR ${resNonFiler.totalDutiesAndTaxesPKR.toLocaleString()}`);
console.log(`Effective Tax Rate: ${resNonFiler.effectiveTaxRatePercent}%`);

// Assert WeBOC reported rates:
if (
  cd.ratePercent === 20 &&
  acd.ratePercent === 2 &&
  rd.ratePercent === 20 &&
  st.ratePercent === 25 &&
  ast.ratePercent === 0 &&
  wht.ratePercent === 12
) {
  console.log("\n>>> SUCCESS: WeBOC rates verified with 100% statutory precision! <<<");
} else {
  console.error("\n>>> FAILED: Rates do not match WeBOC assessment! <<<");
}

// 2. Active Filer Commercial Importer Case
const resFiler = calculateImportDuty({
  productDescription: "Dinner Set",
  pctCode: "691110100000",
  countryOfOrigin: "China",
  goodsValue: 10000,
  currency: "USD",
  importerCategory: "commercial",
  taxpayerStatus: "filer",
  financialYear: "2026-2027",
});

const whtFiler = resFiler.taxes.find((t) => t.code === "WHT")!;
console.log("\n--- TEST CASE 2: Active Filer Commercial Importer ---");
console.log(`Filer WHT: ${whtFiler.ratePercent}% (${whtFiler.legalBasis})`);
console.log(`Total Duties & Taxes: PKR ${resFiler.totalDutiesAndTaxesPKR.toLocaleString()}`);

// 3. Manufacturer / Industrial Importer Case
const resInd = calculateImportDuty({
  productDescription: "Dinner Set",
  pctCode: "691110100000",
  countryOfOrigin: "China",
  goodsValue: 10000,
  currency: "USD",
  importerCategory: "industrial",
  taxpayerStatus: "filer",
  financialYear: "2026-2027",
});

const whtInd = resInd.taxes.find((t) => t.code === "WHT")!;
const astInd = resInd.taxes.find((t) => t.code === "AST")!;
console.log("\n--- TEST CASE 3: Manufacturer / Industrial Importer ---");
console.log(`Industrial AST: ${astInd.ratePercent}% (${astInd.legalBasis})`);
console.log(`Industrial WHT: ${whtInd.ratePercent}% (${whtInd.legalBasis})`);
console.log(`Total Duties & Taxes: PKR ${resInd.totalDutiesAndTaxesPKR.toLocaleString()}`);
