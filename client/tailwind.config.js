/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        facebookDark: { 
          DEFAULT: '#121212', 
          100: '#1a1a1a', 
          200: '#242424', 
          300: '#2e2e2e', 
          400: '#383838', 
          500: '#424242', 
          600: '#4c4c4c', 
          700: '#565656', 
          800: '#606060', 
          900: '#6a6a6a',
        }, 
      },
      boxShadow: {
        glow: '0px 0px 10px 5px #475569',
      },
      screens: {
        zs: '281px',
        xs: '480px',         // Extra small devices
        '3xl': '1920px',     // Ultra-wide monitors
      },
      fontFamily: {
        rubik: ['"Rubik Distressed"', 'serif'],
        anton: ['"Anton"', 'serif'],
        roboto: ['"Roboto"', 'serif'],
        aquafina: ['"Aguafina Script"', 'serif'],
        oswald: ['"Oswald"', 'serif'],
        playwrite: ['"Playwrite CA"', 'serif'],
        sourcecode: ['"Source Code Pro"', 'monospace'],
      },
    },
  },
  plugins: [],
}

