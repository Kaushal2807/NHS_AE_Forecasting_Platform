/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical-blue': {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1976D2', // Primary
          600: '#1565c0',
          700: '#0d47a1',
          800: '#0a3a85',
          900: '#062e6a',
        },
        'soft-teal': {
          50: '#e0f2f1',
          100: '#b2dfdb',
          200: '#80cbc4',
          300: '#4db6ac',
          400: '#26a69a',
          500: '#00897B', // Secondary
          600: '#00796b',
          700: '#00695c',
          800: '#00594d',
          900: '#004940',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Disable Tailwind's preflight to avoid conflicts with MUI
    preflight: false,
  },
}
