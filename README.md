# King Agency — Customs Clearing Agent Website & Tariff System

**Official web platform for King Agency**  
Licensed Customs Clearing Agent #1064 (Karachi Customs Agents Association - KCAA)  
Sunny Plaza, Hasrat Mohani Road, Karachi, Pakistan.

---

## 🌟 Key Features

1. **Customs Clearance Services**: Sea cargo (FCL/LCL), air cargo, GD filing, and port terminal liaison.
2. **Pakistan Customs Duty Calculator**: Official FY 2026–2027 statutory tariff assessment engine with **7,611 verified PCT lines**, operative ACD (SRO 1063(I)/2026), RD (SRO 1064(I)/2026), Sales Tax (18%), 12th Schedule AST (3%), and Section 148 advance income tax.
3. **Responsive Operations Desk & Quotation Form**: Direct integration with email and WhatsApp desks.
4. **Verified Corporate Records**: Authentic client directory, sectoral portfolios, and testimonials.
5. **SEO & Metadata**: Complete sitemap (`/sitemap.xml`), robots (`/robots.txt`), and JSON-LD schema.

---

## 🚀 Quick Start (Running Locally)

### Option 1: One-Click Startup (Windows)
Double-click either:
- **`start-dev.bat`** — Starts the development environment with hot reloading.
- **`start-prod.bat`** — Builds an optimized production package and serves on `http://localhost:3000`.

---

### Option 2: Command Line (PowerShell / Command Prompt)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   ```bash
   copy .env.example .env.local
   ```
   *Note: `FORM_DEV_LOG=true` is enabled by default so quote and contact forms work immediately without needing external email credentials.*

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

4. **Run Automated Test Suite:**
   ```bash
   npm test
   ```

5. **Build and Run for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Backend & Environment Configuration

Configuration is managed via `.env.local`:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain URL | `http://localhost:3000` |
| `FORM_DEV_LOG` | Logs form submissions to terminal console | `true` |
| `FORM_TO_EMAIL` | Destination mailbox for submissions | `info@kingagency.world` |
| `RESEND_API_KEY` | Optional: Resend API key for live outbound email | *(leave blank for dev-log)* |
| `FORM_FROM_EMAIL` | Optional: Verified sender address | *(leave blank for dev-log)* |

---

## 📂 Project Architecture

```
Final King/
├── app/                        # Next.js App Router (Pages & API endpoints)
│   ├── api/
│   │   ├── contact/route.ts    # Contact form backend endpoint
│   │   ├── quote/route.ts      # Quotation request backend endpoint
│   │   ├── tariff/calculate/   # Customs duty calculation engine
│   │   └── tariff/search/      # 7,611 PCT line fast search API
│   ├── about/                  # About King Agency & company facts
│   ├── clients/                # Corporate client directory
│   ├── contact/                # Direct contact & operations desk
│   ├── import-duty-calculator/ # Dedicated duty calculator page
│   ├── request-a-quote/        # Consignment quotation form
│   ├── services/               # Sea, air, and documentation services
│   ├── testimonials/           # Client reviews & testimonials
│   ├── layout.tsx              # Root layout & header/footer branding
│   └── page.tsx                # Homepage
├── components/                 # Reusable UI components & forms
├── lib/                        # Business logic, site constants & tariff engine
│   ├── site.ts                 # Verified business credentials & services
│   ├── forms.ts                # Anti-spam, rate limiting, and email dispatch
│   └── tariff/                 # Complete 7,611 line database & statutory formulas
├── public/                     # Static media, high-res crest emblems & videos
├── test/                       # 14 automated verification test cases
├── start-dev.bat               # Windows one-click dev runner
├── start-prod.bat              # Windows one-click prod runner
├── .env.example                # Safe environment template
└── package.json                # Project dependencies
```

---

## 🛡️ License & Compliance
© 2026 King Agency. Licensed Customs Clearing Agent #1064, Karachi Customs Agents Association (KCAA).
