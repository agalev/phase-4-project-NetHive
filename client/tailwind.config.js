/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'my-blue': '#4875F1',
        'my-purple': '#7D25D0',
        'my-secondpurple': '#7C27D1',
      },
      keyframes: {
        'upanddown': {
          '0%': { transform: 'translateY(1000px)' },
          '100%': { transform: 'translateY(000px)' },
        },
        'upanddown2': {
          '0%': { transform: 'translateY(1000px)' },
          '100%': { transform: 'translateY(000px)' },
        },
        'upanddown3': {
          '0%': { transform: 'translateY(1000px)' },
          '100%': { transform: 'translateY(000px)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'upanddown': 'upanddown 3s ease-in-out',
        'upanddown2': 'upanddown2 5s ease-in-out',
        'upanddown3': 'upanddown3 7s ease-in-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        upanddown: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        upanddown: 'upanddown 1s ease-in-out infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
