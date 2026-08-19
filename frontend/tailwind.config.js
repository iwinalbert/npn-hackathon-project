/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, near-black — a receipt-and-terminal palette, not the cool
        // blue-gray every dark dashboard defaults to. Nothing here is blue.
        base: '#0A0908',         // page background
        surface: '#14120F',      // cards
        elevated: '#1D1A16',     // hover / raised
        line: '#2B2721',         // borders
        'line-strong': '#3E382F',

        ink: '#F1ECE3',          // primary text
        'ink-muted': '#A79C8C',  // secondary text
        'ink-dim': '#6E6455',    // tertiary / axis labels

        // Copper instead of blue for "the model" — a price-tag, terminal-amber
        // accent — plus warm-shifted semantic states so nothing reads as the
        // stock SaaS blue-on-charcoal look.
        forecast: '#C9812F',     // predictions — copper/amber
        actual: '#CFC6B4',       // observed history — warm parchment gray
        good: '#6E9A55',
        warn: '#D1A73B',
        bad: '#BD5C42',
        accentSoft: '#211A0F',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'metric': ['1.75rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
      },
      borderRadius: { card: '0.125rem' },
      transitionDuration: { DEFAULT: '150ms' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        slideUp: 'slideUp 200ms ease-out',
      },
    },
  },
  plugins: [],
}
