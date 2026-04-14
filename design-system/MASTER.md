## Design System: Portfo

### Pattern
- **Name:** Portfolio Grid
- **Conversion Focus:**  hover overlay info,  lightbox view, Visuals first. Filter by category. Fast loading essential.
- **CTA Placement:** Project Card Hover + Footer Contact
- **Color Strategy:** Neutral background (let work shine). Text: Black/White. Accent: Minimal.
- **Sections:** 1. Hero (Name/Role), 2. Project Grid (Masonry), 3. About/Philosophy, 4. Contact

### Style
- **Name:** Liquid Glass
- **Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur, iridescent, chromatic aberration
- **Best For:** Premium SaaS, high-end e-commerce, creative platforms, branding experiences, luxury portfolios
- **Performance:** ΓÜá Moderate-Poor | **Accessibility:** ΓÜá Text contrast

### Colors
| Role | Hex |
|------|-----|
| Primary | #0F172A |
| Secondary | #1E293B |
| CTA | #22C55E |
| Background | #020617 |
| Text | #F8FAFC |

*Notes: Dark bg + green positive indicators*

### Typography
- **Heading:** Satoshi
- **Body:** General Sans
- **Mood:** premium, modern, clean, sophisticated, versatile, balanced
- **Best For:** Premium brands, modern agencies, SaaS, portfolios, startups
- **Google Fonts:** https://fonts.google.com/share?selection.family=DM+Sans:wght@400;500;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
```

### Key Effects
Morphing elements (SVG/CSS), fluid animations (400-600ms curves), dynamic blur (backdrop-filter), color transitions

### Avoid (Anti-patterns)
- Cheap visuals
- Fast animations

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

