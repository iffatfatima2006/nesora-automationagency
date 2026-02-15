# EXERRA

A cinematic, scroll-driven landing page for an AI automation agency — built with Next.js, Framer Motion, Three.js, and OGL.

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-screen 3D particle wave scene with animated headline and custom cursor |
| 2 | **Benefits** | Horizontal scroll cards showcasing key value propositions |
| 3 | **Our Process** | 4-step 3D card stack with scroll-synced text, CPPN shader background (DarkVeil) |
| 4 | **AI Case Studies** | GSAP-powered pinned case study carousel with light ray effects |
| 5 | **Need More Proof** | Cinematic zoom-in text reveal ("NEED MORE PROOF?") |
| 6 | **Name Drops** | Brand marquee with infinite scroll logos |
| 7 | **Testimonials** | Client testimonials with alternating layout |
| 8 | **Pricing** | Three-tier pricing cards |
| 9 | **Footer** | LiquidEther fluid background, scrolling "LET'S TALK" marquee, newsletter signup |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12, GSAP 3
- **3D / WebGL:** Three.js + React Three Fiber, OGL
- **Fonts:** Poppins, Bodoni Moda, Inter (Google Fonts), Climate Crisis (local)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm (or yarn/pnpm)

### Install & Run

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd my-app

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout, font loading, global CSS
├── page.tsx            # Main page — assembles all sections
├── globals.css         # Global styles & Tailwind
├── fonts/              # Local font files (Climate Crisis)
└── components/
    ├── Hero.tsx             # Hero section + particle scene
    ├── ParticleWaveScene.tsx # Three.js 20K particle wave
    ├── HeroOverlay.tsx      # Hero content overlay
    ├── CustomCursor.tsx     # Custom cursor effect
    ├── BenefitsSection.tsx  # Horizontal scroll benefits
    ├── OurProcess.tsx       # 3D card stack + DarkVeil shader
    ├── DarkVeil.tsx         # OGL CPPN neural shader
    ├── AITransforms.tsx     # GSAP case study carousel
    ├── LightRays.tsx        # OGL light ray shader
    ├── NeedMoreProof.tsx    # Zoom-in text reveal
    ├── NameDrops.tsx        # Brand marquee logos
    ├── Testimonials.tsx     # Client testimonials
    ├── Pricing.tsx          # Pricing tier cards
    ├── Footer.tsx           # Footer + LiquidEther background
    ├── LiquidEther.tsx      # Three.js fluid simulation
    ├── GlobalHeader.tsx     # Sticky header, auto-hides per section
    └── Loader.tsx           # Page load animation
public/
├── fonts/              # TypoGraphica font
└── *.svg               # Static assets
```

## Deploy on Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Framework Preset will auto-detect **Next.js**
5. Click **Deploy** — no extra config needed

## Key Configuration

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js settings |
| `tsconfig.json` | TypeScript compiler options |
| `postcss.config.mjs` | PostCSS + Tailwind plugin |
| `eslint.config.mjs` | ESLint rules |
| `package.json` | Dependencies & scripts |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## License

Private project. All rights reserved.
