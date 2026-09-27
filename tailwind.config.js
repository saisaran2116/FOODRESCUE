/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF9ED',
          50: '#FFFCF7',
          100: '#FFF9ED',
          200: '#FDF1D8',
          300: '#F8E6C0',
        },
        forest: {
          DEFAULT: '#12372A',
          deep: '#0B231B',
          light: '#1B4D3B',
        },
        leaf: {
          DEFAULT: '#2E8B57',
          hover: '#267347',
          light: '#3CA368',
        },
        mint: {
          DEFAULT: '#DFF5E1',
          soft: '#EAF8EC',
          strong: '#BCE8C1',
        },
        accent: {
          orange: '#FF9F43',
          'orange-hover': '#F38E2C',
          'orange-light': '#FFEBD7',
        },
        charcoal: {
          DEFAULT: '#171717',
          muted: '#6B6B63',
          subtle: '#9E9E94',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
        editorial: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(18, 55, 42, 0.04)',
        'float': '0 20px 40px -15px rgba(18, 55, 42, 0.12)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.03), 0 10px 25px -5px rgba(18, 55, 42, 0.05)',
      }
    },
  },
  plugins: [],
}
