import os
import json
import re

FINAL_KING_DIR = os.path.dirname(os.path.abspath(__file__))
COMPACT_2025 = os.path.join(FINAL_KING_DIR, "compact_tariff_2025_26.json")
COMPACT_2026 = os.path.join(FINAL_KING_DIR, "compact_tariff_2026_27.json")

DESKTOP_FILES = [
    r"C:\Users\HAROON TRADERS\OneDrive\Desktop\Import Duty Calculator.html",
    r"C:\Users\HAROON TRADERS\OneDrive\Desktop\king web\import-duty-calculator.html"
]

with open(COMPACT_2025, "r", encoding="utf-8") as f:
    data_2025_str = json.dumps(json.load(f))

with open(COMPACT_2026, "r", encoding="utf-8") as f:
    data_2026_str = json.dumps(json.load(f))

print(f"Loaded 2025 data ({len(data_2025_str)} chars), 2026 data ({len(data_2026_str)} chars)")

for file_path in DESKTOP_FILES:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # 1. Add Financial Year dropdown if not already present
    fy_dropdown_html = """
          <!-- Financial Year Selection -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Financial Year / Tariff Schedule <span class="text-[#6cc7e6]">*</span>
              </label>
              <span id="activeYearBadge" class="text-[11px] font-mono text-[#6cc7e6]">FY 2026–27 (Current)</span>
            </div>
            <select id="financialYear" onchange="switchFinancialYear()" class="w-full px-4 py-3 rounded-xl bg-[#04070c] border border-white/10 text-sm font-mono text-white focus:outline-none focus:border-[#6cc7e6] transition">
              <option value="2026-2027" selected>FY 2026–27 (Current: 1 July 2026 – 30 June 2027)</option>
              <option value="2025-2026">FY 2025–26 (Prior Year: 1 July 2025 – 30 June 2026)</option>
            </select>
          </div>
"""
    if 'id="financialYear"' not in content:
        target_marker = "</button>\n          </div>"
        if target_marker in content:
            content = content.replace(target_marker, target_marker + "\n" + fy_dropdown_html, 1)
        else:
            content = content.replace('<!-- Product Name -->', fy_dropdown_html + '\n          <!-- Product Name -->', 1)
        print(f"Added financial year dropdown to {file_path}")

    # 2. Update JavaScript dataset & calculation logic
    script_replacement = f"""    const RATES = {{
      USD: 280.00,
      EUR: 305.00,
      GBP: 365.00,
      CNY: 39.50,
      AED: 76.50,
      SAR: 74.80,
      JPY: 1.85,
      PKR: 1.00
    }};

    const TARIFF_DATA_2026_27 = {data_2026_str};
    const TARIFF_DATA_2025_26 = {data_2025_str};

    let TARIFF_DATA_COMPLETE = TARIFF_DATA_2026_27;
    let CODE_MAP = new Map();

    function initCodeMap() {{
      CODE_MAP.clear();
      for (let i = 0; i < TARIFF_DATA_COMPLETE.length; i++) {{
        const digits = TARIFF_DATA_COMPLETE[i][0].replace(/[^0-9]/g, '');
        if (!CODE_MAP.has(digits)) CODE_MAP.set(digits, TARIFF_DATA_COMPLETE[i]);
      }}
    }}
    initCodeMap();

    function switchFinancialYear() {{
      const year = document.getElementById('financialYear').value;
      const badge = document.getElementById('activeYearBadge');
      if (year === '2025-2026') {{
        TARIFF_DATA_COMPLETE = TARIFF_DATA_2025_26;
        if (badge) badge.innerText = 'FY 2025–26 (Prior Year)';
      }} else {{
        TARIFF_DATA_COMPLETE = TARIFF_DATA_2026_27;
        if (badge) badge.innerText = 'FY 2026–27 (Current)';
      }}
      initCodeMap();
      calculateDuty();
    }}

    function findItem(codeIn, descIn) {{
      const digits = (codeIn || '').replace(/[^0-9]/g, '');
      if (digits.length >= 4) {{
        if (CODE_MAP.has(digits)) return CODE_MAP.get(digits);
        for (let i = 0; i < TARIFF_DATA_COMPLETE.length; i++) {{
          if (TARIFF_DATA_COMPLETE[i][0].replace(/[^0-9]/g, '').startsWith(digits)) return TARIFF_DATA_COMPLETE[i];
        }}
      }}
      if (descIn && descIn.trim().length >= 2) {{
        const terms = descIn.trim().toLowerCase().split(/\\s+/).filter(t => t.length > 2);
        for (let i = 0; i < TARIFF_DATA_COMPLETE.length; i++) {{
          const t = (TARIFF_DATA_COMPLETE[i][1] + ' ' + TARIFF_DATA_COMPLETE[i][0]).toLowerCase();
          if (terms.every(term => t.includes(term))) return TARIFF_DATA_COMPLETE[i];
        }}
      }}
      return null;
    }}

    function calculateDuty(e) {{
      if (e) e.preventDefault();

      const year = document.getElementById('financialYear') ? document.getElementById('financialYear').value : '2026-2027';
      const prod = (document.getElementById('productName').value || '').trim();
      const codeInput = (document.getElementById('pctCode').value || '').trim();
      const val = parseFloat(document.getElementById('goodsValue').value) || 0;
      const curr = document.getElementById('currency').value;
      const rate = RATES[curr] || 1;
      const freightVal = parseFloat(document.getElementById('freight')?.value || 0) || 0;
      const insInput = document.getElementById('insurance')?.value;
      const impType = document.getElementById('importerType').value;
      const taxStatus = document.getElementById('taxStatus').value;

      // 1. Valuation under Section 25 of the Customs Act, 1969
      const fobPKR = Math.round(val * rate);
      const freightPKR = Math.round(freightVal * rate);
      const cfPKR = fobPKR + freightPKR;
      
      let insPKR = 0;
      if (insInput && !isNaN(parseFloat(insInput)) && parseFloat(insInput) > 0) {{
        insPKR = Math.round(parseFloat(insInput) * rate);
      }} else {{
        // Statutory 1% rule
        insPKR = Math.round(cfPKR * 0.01);
      }}
      const cifPKR = cfPKR + insPKR;

      // 2. Tariff Line Lookup
      const item = findItem(codeInput, prod);
      let pctCode = '8541.4300';
      let desc = 'Photovoltaic cells whether or not assembled in modules or made up into panels';
      let cdRate = 0;
      let acdRate = 0;
      let rdRate = 0;

      if (item) {{
        pctCode = item[0];
        desc = item[1];
        cdRate = item[2];
        acdRate = item[3];
        rdRate = item[4];
      }} else {{
        pctCode = codeInput || 'General Cargo';
        desc = prod || 'Unclassified Goods';
        cdRate = 20;
        acdRate = year === '2026-2027' ? 2 : 4;
        rdRate = 0;
      }}

      const fedRate = item ? (item[5] || 0) : 0;
      const stRate = item ? item[6] : 18;
      const astRate = impType === 'commercial' && stRate > 0 ? (item ? item[7] : 3) : 0;
      let whtRate = item ? (impType === 'commercial' ? item[8] : item[9]) : (impType === 'commercial' ? 6 : 2);
      if (taxStatus === 'non_filer') whtRate *= 2;

      // 3. Taxes
      const cdAmount = Math.round(cifPKR * (cdRate / 100));
      const acdAmount = Math.round(cifPKR * (acdRate / 100));
      const rdAmount = Math.round(cifPKR * (rdRate / 100));

      const fedBase = cifPKR + cdAmount + acdAmount + rdAmount;
      const fedAmount = fedRate > 0 ? Math.round(fedBase * (fedRate / 100)) : 0;

      const stBase = fedBase + fedAmount;
      const stAmount = Math.round(stBase * (stRate / 100));
      const astAmount = Math.round(stBase * (astRate / 100));

      const whtBase = stBase + stAmount + astAmount;
      const whtAmount = Math.round(whtBase * (whtRate / 100));

      const totalDuty = cdAmount + acdAmount + rdAmount + fedAmount + stAmount + astAmount + whtAmount;
      const landedCost = cifPKR + totalDuty;

      // Update UI
      if (document.getElementById('resPctCode')) document.getElementById('resPctCode').innerText = pctCode;
      if (document.getElementById('resDesc')) document.getElementById('resDesc').innerText = desc;
      if (document.getElementById('resGoodsVal')) document.getElementById('resGoodsVal').innerText = curr + ' ' + val.toLocaleString();
      if (document.getElementById('resRate')) document.getElementById('resRate').innerText = '1 ' + curr + ' = PKR ' + rate.toFixed(2);
      if (document.getElementById('resCIF')) document.getElementById('resCIF').innerText = 'PKR ' + cifPKR.toLocaleString();

      const acdSro = year === '2026-2027' ? 'SRO 1063(I)/2026' : 'SRO 1151(I)/2025';
      const rdSro = year === '2026-2027' ? 'SRO 1064(I)/2026' : 'SRO 1152(I)/2025';

      if (document.getElementById('resCD')) document.getElementById('resCD').innerText = 'PKR ' + cdAmount.toLocaleString() + ' (' + cdRate + '% on AV)';
      if (document.getElementById('resACD')) document.getElementById('resACD').innerText = 'PKR ' + acdAmount.toLocaleString() + ' (' + acdRate + '% ' + acdSro + ')';
      if (document.getElementById('resRD')) document.getElementById('resRD').innerText = 'PKR ' + rdAmount.toLocaleString() + ' (' + rdRate + '% ' + rdSro + ')';
      if (document.getElementById('resST')) document.getElementById('resST').innerText = 'PKR ' + stAmount.toLocaleString() + ' (' + stRate + '% on [AV+Duties])';
      if (document.getElementById('resAST')) document.getElementById('resAST').innerText = 'PKR ' + astAmount.toLocaleString() + ' (' + astRate + '% 12th Sched)';
      if (document.getElementById('resWHT')) document.getElementById('resWHT').innerText = 'PKR ' + whtAmount.toLocaleString() + ' (' + whtRate + '% Sec 148)';

      if (document.getElementById('resTotal')) document.getElementById('resTotal').innerText = 'PKR ' + totalDuty.toLocaleString();
      if (document.getElementById('resLanded')) document.getElementById('resLanded').innerText = 'PKR ' + landedCost.toLocaleString();

      const origin = document.getElementById('originCountry')?.value || 'China';
      const waYearLabel = year === '2026-2027' ? 'FY 2026–27 (Current)' : 'FY 2025–26 (Prior Year)';
      const waMsg = `*King Agency Pakistan Customs Assessment (${{waYearLabel}})*\\n` +
                    `*Product:* ${{desc}}\\n` +
                    `*PCT:* ${{pctCode}}\\n` +
                    `*Origin:* ${{origin}}\\n` +
                    `*Value:* ${{curr}} ${{val.toLocaleString()}}\\n` +
                    `*Assessable Value:* PKR ${{cifPKR.toLocaleString()}}\\n` +
                    `*Duties & Taxes:* PKR ${{totalDuty.toLocaleString()}}\\n` +
                    `*Estimated Landed Cost:* PKR ${{landedCost.toLocaleString()}}`;
      if (document.getElementById('whatsappBtn')) {{
        document.getElementById('whatsappBtn').href = "https://wa.me/923700902220?text=" + encodeURIComponent(waMsg);
      }}
    }}

    function resetForm() {{
      document.getElementById('dutyForm')?.reset();
      document.getElementById('productName').value = "Solar Panels";
      document.getElementById('goodsValue').value = "10000";
      document.getElementById('originCountry').value = "China";
      if (document.getElementById('financialYear')) document.getElementById('financialYear').value = "2026-2027";
      switchFinancialYear();
    }}

    window.onload = function() {{
      switchFinancialYear();
    }};
  </script>"""

    # Replace from `const RATES = {` to `</script>`
    pattern = re.compile(r'const RATES = \{.*?</script>', re.DOTALL)
    m = pattern.search(content)
    if m:
        content = content[:m.start()] + script_replacement + content[m.end():]
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully updated script & datasets in {file_path}")
    else:
        print(f"Pattern `const RATES = {{` not found in {file_path}")

print("Done updating desktop calculators.")
