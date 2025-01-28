/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          950: '#002828',
        },
        mint: '#98FF98',
        aqua: '#7FFFD4',
        charcoal: '#36454F',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0,40,40,0.37)',
        '3d': '0 10px 20px rgba(0,40,40,0.3), 0 6px 6px rgba(0,40,40,0.2)',
      }
    },
  },
  plugins: [],
};