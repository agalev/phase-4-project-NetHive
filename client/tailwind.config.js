
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'my-orange': '#EA590A',
        'my-red': '#DC2625',
        'my-blue': '#4875F1',
        'my-purple': '#7D25D0',
        'my-green': '#66A20B',
        'my-yellow': '#FACC13'
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
