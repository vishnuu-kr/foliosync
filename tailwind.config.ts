// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: '#09090B',
          raised: 'rgba(255, 255, 255, 0.04)',
          overlay: 'rgba(255, 255, 255, 0.06)',
        },
        accent: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          muted: '#4F46E5',
        },
      },
      borderRadius: {
        'ios': '24px',
        'ios-lg': '28px',
      },
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'ios-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
