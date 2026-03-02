# Quantumy — QBT Token Website

Built with **Next.js 16.1.6**, **Tailwind CSS v3**, and **shadcn/ui**.

## Stack
- **Next.js 16.1.6** (App Router, Turbopack stable default)
- **React 19.2** (View Transitions, useEffectEvent, Activity)
- Tailwind CSS v3
- shadcn/ui (Accordion, Button, Card, Badge, Separator)
- Radix UI primitives
- Lucide React icons
- Orbitron + Exo 2 fonts (Google Fonts)

## Requirements
- **Node.js 20.9.0 or higher** (required by Next.js 16)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (Turbopack is now default — no flag needed)
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Upgrade Next.js (future)

```bash
npm run upgrade
# or manually:
npm install next@latest react@latest react-dom@latest
```

## Deploy to Vercel (Recommended)

```bash
npx vercel
```

## What's new in Next.js 16
- ⚡ Turbopack stable — default bundler, 2–5× faster builds
- 🗂️ Turbopack File System Caching — instant dev server restarts
- ⚛️ React Compiler support (stable, opt-in)
- 🔀 Enhanced routing — layout deduplication, incremental prefetching
- 📦 20MB smaller install size

## Project Structure

```
quantumy-v3/
├── app/
│   ├── globals.css       ← Tailwind + CSS variables (shadcn)
│   ├── layout.jsx        ← Root layout + metadata
│   └── page.jsx          ← Main page
├── components/
│   ├── ui/               ← shadcn/ui components
│   │   ├── accordion.jsx
│   │   ├── badge.jsx
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   └── separator.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx          ← pt-[120px] top fix for 125% Windows scaling
│   ├── About.jsx
│   ├── WhyUs.jsx
│   ├── Tokenomics.jsx
│   ├── Roadmap.jsx
│   ├── Team.jsx
│   ├── FAQ.jsx
│   └── Footer.jsx
├── lib/
│   └── utils.js          ← cn() helper
├── public/
│   └── logo.jpeg
├── components.json       ← shadcn config
├── tailwind.config.js
├── postcss.config.js
└── next.config.js        ← Next.js 16 config
```

