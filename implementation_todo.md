# Portfo: Full Implementation & Design TODO

This TODO list merges the high-end **UI/UX Pro Max** design guidelines for a premium, specialized "Authentic Software" experience.

## 🎨 Phase 1: Design System Foundation (Authentic Software)
Align the website's visual language with a grounded, premium developer tool aesthetic.

- [x] **Typography**: Standardized on **Inter** with precise letter-spacing. Updated `layout.tsx` and `globals.css`.
- [x] **Color Palette**: Shifted to strict, high-contrast black theme (`#000000`, `#0A0A0A`).
- [x] **Component Language**: Defined `ios-card`, `ios-card-elevated`, `btn-primary` using iOS system colors (Blue, Green).
- [x] **Theme Persistence**: Removed all "AI-neon" and "Liquid Glass" tropes in favor of restraint and functional design.

## 📱 Phase 2: Interaction Model (PopApp iOS)
Translate modern iOS interaction patterns to the Next.js interface.

- [x] **Safe Areas & Spacing**: Standardized on clean, grid-based layout with consistent padding.
- [x] **Navigation**: Refined sticky pill Navbar with minimal iconography and Sign-In/Get Started CTAs.
- [x] **List Patterns**: Updated `ConnectPage` to follow a clean, accessible form pattern.
- [x] **Snappy Transitions**: Standardized on `cubic-bezier(0.25, 1, 0.5, 1)` for all motion.

## 🧠 Phase 3: AI & Scraping Intelligence
Finalize the logic that builds the portfolio without manual data entry.

- [x] **AI Detective Mode**: Prompt upgraded to infer career from GitHub README, repos, and webContext.
- [x] **Direct X/Twitter Scraper**: Multi-fallback chain (Syndication + FxTwitter + RSSHub) implemented.
- [x] **LinkedIn Scraper**: Playwright-based scraper with manual profile HTML fallback.
- [x] **API Convergence**: `/api/generate` and `/api/user` endpoints functional.

## 🖼️ Phase 4: Page Implementation (Authentic Software)
Modernize all application views using the premium software aesthetic.

- [x] **Landing Page**: All components (Hero, Features, Pricing, etc.) redesigned for restraint and visual excellence.
- [x] **Flow Pages**: redesigned `Connect` and `Generating` screens for a professional "Compiling" vibe.
- [x] **Portfolio View**: Redesigned `[username]` page as a high-end personal OS/Dashboard.
- [x] **Dashboard**: Functional user dashboard for managing handles and build settings.

## 🛠️ Phase 5: Technical & SEO Checklist
- [x] **Build Integrity**: Project builds successfully with `next build`.
- [x] **Type Safety**: Resolved image source nullability and other minor TS lints.
- [x] **SEO Best Practices**: Proper metadata title/description mapping.
- [x] **Deployment Ready**: All internal links (/steps/connect, /dashboard, /[username]) properly routed.

---

**Current Status**: Complete. Replaced legacy AI-tropes with an award-winning "Authentic Software" aesthetic across the entire stack.
