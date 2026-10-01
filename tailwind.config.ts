import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        facility: {
          950: '#06090e',
          900: '#0b111a',
          850: '#101826',
          800: '#162032',
          700: '#1f2e46',
          600: '#2d4365',
        },
        nuke: {
          cyan: '#00f0ff',
          amber: '#ffb703',
          red: '#ff2a5f',
          green: '#00ff88',
        }
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
        'scanline': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
      }
    },
  },
  plugins: [],
} satisfies Config
