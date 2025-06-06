import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        background: 'var(--color-background)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        foreground: 'var(--color-foreground)',
        heading: 'var(--color-heading)',
        border: 'var(--color-border)',
        highlight: 'var(--color-highlight)',
      },
    },
  },
  plugins: [],
};

export default config;
// tailwind.config.js or tailwind.config.ts
