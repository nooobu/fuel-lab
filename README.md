# ⛽ FUEL LAB — Trail Running Nutrition Planner

A prototype React app for planning and logging trail running nutrition.

## Features

### Onboarding Flow (`onboarding.jsx`)
- **Run type selection** — Official race or training run
- **Runner profile** — Height, weight, estimated calorie burn
- **Activity import** — Drag & drop Garmin CSV (lap export or activity summary)
- **Nutrition log** — Select and customize what you ate/drank with editable carb/Na values per item
- **Symptom log** — Record how you felt and at what km
- **Analysis & diagnosis** — Scored breakdown of carbs, water, and sodium vs. targets with fix suggestions

### Planner (`fuel_tracker.jsx`)
- GPX file upload with elevation profile
- Goal time → auto-calculated average pace
- Weather forecast via Open-Meteo (race date within 7 days)
- Auto-generated fuel plan with aid station timing

## Nutrition Items
Water, Sports Drink, Energy Gel, Caffeine Gel, Onigiri, Energy Bar, Salt Tabs, Cola, Banana, Manju, Potato Chips, Anpan — all with editable carb/Na values per item.

## Stack
- React (JSX, useState, useEffect, useMemo)
- No build step — runs directly in [Claude.ai Artifacts](https://claude.ai) or any React sandbox (CodeSandbox, StackBlitz)
- GPX parsing via browser DOMParser
- Weather: [Open-Meteo](https://open-meteo.com/) (free, no API key)

## How to Run

### Option A — Claude.ai Artifacts (easiest)
1. Open [claude.ai](https://claude.ai)
2. Paste the contents of `onboarding.jsx` into a new message and ask Claude to render it

### Option B — CodeSandbox / StackBlitz
1. Create a new React sandbox
2. Replace `App.jsx` with the contents of `onboarding.jsx`
3. Make sure the default export is `App` (it already is)

### Option C — Local Vite project
```bash
npm create vite@latest fuel-lab -- --template react
cd fuel-lab
# Replace src/App.jsx with onboarding.jsx contents
npm install && npm run dev
```

## Design
Dark glassmorphism UI. Designed for mobile-first (375px width).

---
Built with ❤️ using Claude (Cowork mode)
