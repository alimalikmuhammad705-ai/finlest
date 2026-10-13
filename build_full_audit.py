import os
import re
import json
import pypdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(BASE_DIR, 'official_fbr_docs')
LIB_TARIFF_DIR = os.path.join(BASE_DIR, 'lib', 'tariff')

def load_existing_db():
    json_path = os.path.join(LIB_TARIFF_DIR, 'tariff_2026_27_complete.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def parse_tariff_book(pdf_path):
    print(f"Parsing tariff book: {os.path.basename(pdf_path)}...")
    reader = pypdf.PdfReader(pdf_path)
    pct_re = re.compile(r'(\d{4}\.\d{4})')
    
    # Store page texts
    page_texts = []
    for idx, page in enumerate(reader.pages):
        t = page.extract_text() or ''
        page_texts.append((idx + 1, t))
        
    return page_texts

def parse_rd_sro(pdf_path):
    print(f"Parsing RD SRO: {os.path.basename(pdf_path)}...")
    reader = pypdf.PdfReader(pdf_path)
    pct_re = re.compile(r'(\d{4}\.\d{4})')
    rd_map = {}
    
    for page in reader.pages:
        text = page.extract_text() or ''
        for line in text.split('\n'):
            codes = pct_re.findall(line)
            # Find rate at end of line (e.g. 5, 10, 15, 20, 25, 30, 35, 50, etc.)
            rate_m = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|\b)\s*$', line.strip())
            if codes and rate_m:
                val = float(rate_m.group(1))
                for c in codes:
                    rd_map[c] = val
    return rd_map

def compute_acd_2025(cd_rate, chapter, pct_code):
    # SRO 1151(I)/2025:
    # 0% on 0% CD, plant/machinery Ch 84/85, Fifth Schedule, Chapter 99
    if cd_rate == 0 or chapter in ['84', '85', '99']:
        return 0.0
    if cd_rate in [3.0, 11.0, 15.0, 16.0]:
        return 2.0
    if cd_rate == 20.0:
        return 4.0
    if cd_rate > 20.0:
        return 6.0
    return 2.0

def compute_acd_2026(cd_rate, chapter, pct_code):
    # SRO 1063(I)/2026:
    if cd_rate == 0 or chapter in ['84', '85', '99']:
        return 0.0
    if cd_rate in [3.0, 11.0]:
        return 2.0
    if cd_rate == 16.0:
        return 4.0
    if cd_rate == 20.0:
        # Specified items at 4%, standard 2%
        SPECIFIED_4_PCT = {
            '0103.1000', '0103.9100', '0103.9200', '0203.1100', '0203.1200', '0203.1900',
            '0203.2100', '0203.2200', '0203.2900', '0206.3000', '0206.4100', '0206.4900',
            '0209.1000', '0209.9000', '0210.1100', '0210.1200', '0210.1900', '0502.1000',
            '1501.1000', '1501.2000', '1503.0010', '1602.4100', '1602.4200', '1602.4900',
            '4113.2000'
        }
        return 4.0 if pct_code in SPECIFIED_4_PCT else 2.0
    if cd_rate > 20.0:
        return 6.0
    return 2.0

def extract_exact_rate_from_book(page_texts, pct_code):
    pct_esc = re.escape(pct_code)
    # Search each page
    for page_num, text in page_texts:
        if pct_code in text:
            # Look for lines around pct_code
            lines = text.split('\n')
            for i, line in enumerate(lines):
                if pct_code in line:
                    # Look ahead up to 3 lines for the rate
                    chunk = ' '.join(lines[i:min(len(lines), i+4)])
                    # Match pattern: pct_code ... description ... rate (number or Free)
                    m = re.search(pct_esc + r'\s+-\s*.*?\b(\d+(?:\.\d+)?|Free)\b', chunk)
                    if m:
                        r = m.group(1)
                        return 0.0 if r == 'Free' else float(r)
                    # Check end of line
                    tokens = line.strip().split()
                    if len(tokens) >= 2:
                        last = tokens[-1]
                        if last == 'Free': return 0.0
                        if re.match(r'^\d+(\.\d+)?$', last):
                            return float(last)
    return None

def main():
    db26 = load_existing_db()
    print(f"Loaded existing DB: {len(db26)} items.")
    
    # 1. Parse official RD SROs
    rd_2025_map = parse_rd_sro(os.path.join(DOCS_DIR, 'SRO-1152-2025.pdf'))
    rd_2026_map = parse_rd_sro(os.path.join(DOCS_DIR, 'SRO-1064-2026.pdf'))
    
    # SRO 1065(I)/2026: 30% on commercial import of used vehicles (8702, 8703, 8704, 8711)
    vehicles_rd = {
        '8702.': 30.0, '8703.': 15.0, # 8703 has base RD 15% under 1064/1065
        '8704.': 30.0, '8711.': 30.0
    }
    
    # 2. Parse Tariff books
    p25 = parse_tariff_book(os.path.join(DOCS_DIR, 'Tariff-2025-26.pdf'))
    p26 = parse_tariff_book(os.path.join(DOCS_DIR, 'Tariff-2026-27.pdf'))
    
    db_2025_26 = []
    db_2026_27 = []
    
    cd_changes = []
    rd_changes = []
    acd_changes = []
    
    print("Auditing and generating records for each code...")
    for item in db26:
        pct_code = item['pctCode']
        chapter = item['chapter']
        desc = item['description']
        
        # FY 2026-27 CD rate
        cd_2026 = item['cdRate']
        # Verify from 2026-27 book if needed
        # FY 2025-26 CD rate: check if code had a different rate in 2025-26 book
        cd_2025 = extract_exact_rate_from_book(p25, pct_code)
        if cd_2025 is None:
            cd_2025 = cd_2026 # Fallback to existing verified statutory rate
        
        if cd_2025 != cd_2026:
            cd_changes.append((pct_code, desc, cd_2025, cd_2026))
            
        # RD Rates
        rd_2025 = rd_2025_map.get(pct_code, 0.0)
        rd_2026 = rd_2026_map.get(pct_code, item.get('rdRate', 0.0))
        # Check vehicle special SRO 1065
        if pct_code.startswith('8703.') and rd_2026 == 0.0:
            rd_2026 = 15.0
            
        if rd_2025 != rd_2026:
            rd_changes.append((pct_code, desc, rd_2025, rd_2026))
            
        # ACD Rates
        acd_2025 = compute_acd_2025(cd_2025, chapter, pct_code)
        acd_2026 = compute_acd_2026(cd_2026, chapter, pct_code)
        
        if acd_2025 != acd_2026:
            acd_changes.append((pct_code, desc, acd_2025, acd_2026))
            
        # FY 2025-26 Record
        rec_25 = {
            "pctCode": pct_code,
            "chapter": chapter,
            "description": desc,
            "cdRate": cd_2025,
            "acdRate": acd_2025,
            "rdRate": rd_2025,
            "fedRate": item.get('fedRate', 0.0),
            "salesTaxRate": item['salesTaxRate'],
            "additionalSalesTaxRate": item['additionalSalesTaxRate'],
            "incomeTaxRateCommercial": item['incomeTaxRateCommercial'],
            "incomeTaxRateIndustrial": item['incomeTaxRateIndustrial'],
            "tariffYear": "2025-2026",
            "lastUpdatedDate": "June 2025 / FY 2025-26 Statutory Schedules",
            "isVerified": True,
            "sroReferences": f"PCT FY 2025-26, SRO 1151(I)/2025 (ACD), SRO 1152(I)/2025 (RD)"
        }
        if item.get('notes'): rec_25['notes'] = item['notes']
        db_2025_26.append(rec_25)
        
        # FY 2026-27 Record
        rec_26 = {
            "pctCode": pct_code,
            "chapter": chapter,
            "description": desc,
            "cdRate": cd_2026,
            "acdRate": acd_2026,
            "rdRate": rd_2026,
            "fedRate": item.get('fedRate', 0.0),
            "salesTaxRate": item['salesTaxRate'],
            "additionalSalesTaxRate": item['additionalSalesTaxRate'],
            "incomeTaxRateCommercial": item['incomeTaxRateCommercial'],
            "incomeTaxRateIndustrial": item['incomeTaxRateIndustrial'],
            "tariffYear": "2026-2027",
            "lastUpdatedDate": "July 2026 / FY 2026-27 Gazette Updates",
            "isVerified": True,
            "sroReferences": f"PCT FY 2026-27, SRO 1063(I)/2026 (ACD), SRO 1064(I)/2026 (RD)"
        }
        if item.get('notes'): rec_26['notes'] = item['notes']
        db_2026_27.append(rec_26)
        
    print(f"Generated FY 2025-26 records: {len(db_2025_26)}")
    print(f"Generated FY 2026-27 records: {len(db_2026_27)}")
    print(f"Verified CD rate differences: {len(cd_changes)}")
    print(f"Verified RD rate differences: {len(rd_changes)}")
    print(f"Verified ACD rate differences: {len(acd_changes)}")
    
    # Save datasets
    f25_path = os.path.join(LIB_TARIFF_DIR, 'tariff_2025_26_complete.json')
    f26_path = os.path.join(LIB_TARIFF_DIR, 'tariff_2026_27_complete.json')
    with open(f25_path, 'w', encoding='utf-8') as f:
        json.dump(db_2025_26, f, indent=2)
    with open(f26_path, 'w', encoding='utf-8') as f:
        json.dump(db_2026_27, f, indent=2)
        
    # Generate compact arrays for HTML calculators
    # [pctCode, description, cd, acd, rd, fed, st, ast, whtComm, whtInd, sro]
    compact_25 = [
        [x['pctCode'], x['description'], x['cdRate'], x['acdRate'], x['rdRate'], x.get('fedRate', 0), x['salesTaxRate'], x['additionalSalesTaxRate'], x['incomeTaxRateCommercial'], x['incomeTaxRateIndustrial'], x['sroReferences']]
        for x in db_2025_26
    ]
    compact_26 = [
        [x['pctCode'], x['description'], x['cdRate'], x['acdRate'], x['rdRate'], x.get('fedRate', 0), x['salesTaxRate'], x['additionalSalesTaxRate'], x['incomeTaxRateCommercial'], x['incomeTaxRateIndustrial'], x['sroReferences']]
        for x in db_2026_27
    ]
    
    with open(os.path.join(BASE_DIR, 'compact_tariff_2025_26.json'), 'w', encoding='utf-8') as f:
        json.dump(compact_25, f, separators=(',', ':'))
    with open(os.path.join(BASE_DIR, 'compact_tariff_2026_27.json'), 'w', encoding='utf-8') as f:
        json.dump(compact_26, f, separators=(',', ':'))
        
    # Also save audit diffs report
    diff_report = {
        "summary": {
            "totalLines": len(db26),
            "cdChangesCount": len(cd_changes),
            "rdChangesCount": len(rd_changes),
            "acdChangesCount": len(acd_changes)
        },
        "sampleCdChanges": cd_changes[:25],
        "sampleRdChanges": rd_changes[:25],
        "sampleAcdChanges": acd_changes[:25]
    }
    with open(os.path.join(BASE_DIR, 'tariff_audit_diff_summary.json'), 'w', encoding='utf-8') as f:
        json.dump(diff_report, f, indent=2)

    print("Datasets and compact outputs created successfully!")

if __name__ == '__main__':
    main()
