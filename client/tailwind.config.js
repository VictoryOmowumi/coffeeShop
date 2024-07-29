/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          light: '#D9C5B2',
          DEFAULT: '#6F4E37',
          dark: '#3B2F2F',
        },
        cream: {
          light: '#F5F5DC',
          DEFAULT: '#FFFDD0',
          dark: '#E7D3B4',
        },
        accent: {
          light: '#FFD700',
          DEFAULT: '#FF8C00',
          dark: '#8B4513',
        },
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
}
