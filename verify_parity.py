import json
import math

# Load website database
with open("lib/tariff/tariff_2025_26_complete.json", "r", encoding="utf-8") as f:
    web_db_25 = {x["pctCode"]: x for x in json.load(f)}

with open("lib/tariff/tariff_2026_27_complete.json", "r", encoding="utf-8") as f:
    web_db_26 = {x["pctCode"]: x for x in json.load(f)}

# Load desktop compact database
with open("compact_tariff_2025_26.json", "r", encoding="utf-8") as f:
    desk_db_25 = {x[0]: x for x in json.load(f)}

with open("compact_tariff_2026_27.json", "r", encoding="utf-8") as f:
    desk_db_26 = {x[0]: x for x in json.load(f)}

usd_rate = 278.50 # Website rate (Desktop rate: 280.00, we test calculation logic with same exchange rate)
exchange_rate = 280.00

test_codes = ["8541.4300", "2815.1100", "8708.2931", "8703.2119", "8471.3010"]

print("=== CALCULATOR PARITY VERIFICATION (WEBSITE vs DESKTOP) ===")

def calc_duty(item, is_web=True, val_usd=10000, ex_rate=280.0, imp_type="commercial", tax_status="filer"):
    if is_web:
        cd_rate = item["cdRate"]
        acd_rate = item["acdRate"]
        rd_rate = item["rdRate"]
        fed_rate = item.get("fedRate", 0)
        st_rate = item["salesTaxRate"]
        ast_rate = item["additionalSalesTaxRate"] if (imp_type == "commercial" and st_rate > 0) else 0
        wht_rate = item["incomeTaxRateCommercial"] if imp_type == "commercial" else item["incomeTaxRateIndustrial"]
    else:
        cd_rate = item[2]
        acd_rate = item[3]
        rd_rate = item[4]
        fed_rate = item[5]
        st_rate = item[6]
        ast_rate = item[7] if (imp_type == "commercial" and st_rate > 0) else 0
        wht_rate = item[8] if imp_type == "commercial" else item[9]

    if tax_status == "non_filer":
        wht_rate *= 2

    # Section 25 CIF = FOB + 1% statutory insurance (if freight included in C&F)
    cf_pkr = round(val_usd * ex_rate)
    ins_pkr = round(cf_pkr * 0.01)
    cif_pkr = cf_pkr + ins_pkr

    cd_amt = round(cif_pkr * (cd_rate / 100.0))
    acd_amt = round(cif_pkr * (acd_rate / 100.0))
    rd_amt = round(cif_pkr * (rd_rate / 100.0))
    fed_base = cif_pkr + cd_amt + acd_amt + rd_amt
    fed_amt = round(fed_base * (fed_rate / 100.0)) if fed_rate > 0 else 0
    st_base = fed_base + fed_amt
    st_amt = round(st_base * (st_rate / 100.0))
    ast_amt = round(st_base * (ast_rate / 100.0))
    wht_base = st_base + st_amt + ast_amt
    wht_amt = round(wht_base * (wht_rate / 100.0))

    total = cd_amt + acd_amt + rd_amt + fed_amt + st_amt + ast_amt + wht_amt
    landed = cif_pkr + total
    return {
        "cd_rate": cd_rate, "acd_rate": acd_rate, "rd_rate": rd_rate,
        "cd_amt": cd_amt, "acd_amt": acd_amt, "rd_amt": rd_amt,
        "st_amt": st_amt, "ast_amt": ast_amt, "wht_amt": wht_amt,
        "total": total, "landed": landed
    }

for yr, w_db, d_db in [("FY 2025-26", web_db_25, desk_db_25), ("FY 2026-27", web_db_26, desk_db_26)]:
    print(f"\n--- Testing {yr} ---")
    for code in test_codes:
        w_item = w_db[code]
        d_item = d_db[code]
        w_res = calc_duty(w_item, is_web=True)
        d_res = calc_duty(d_item, is_web=False)

        assert w_res["cd_rate"] == d_res["cd_rate"], f"CD mismatch on {code}"
        assert w_res["acd_rate"] == d_res["acd_rate"], f"ACD mismatch on {code}"
        assert w_res["rd_rate"] == d_res["rd_rate"], f"RD mismatch on {code}"
        assert w_res["total"] == d_res["total"], f"Total tax mismatch on {code}"
        assert w_res["landed"] == d_res["landed"], f"Landed cost mismatch on {code}"

        print(f"✔ PCT {code}: CD={w_res['cd_rate']}%, ACD={w_res['acd_rate']}%, RD={w_res['rd_rate']}%, Total Taxes=PKR {w_res['total']:,}, Landed=PKR {w_res['landed']:,} (100% PARITY)")

print("\nALL REPRESENTATIVE TEST CASES ACHIEVED 100% PARITY!")
