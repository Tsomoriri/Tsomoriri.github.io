// module.exports = {
//   darkMode: 'class',
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-fira-code)', ...fontFamily.sans],
      },
      backgroundImage: {
        'radial-grain-light': 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        'radial-grain-dark': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grain-4': '4px 4px',
        'grain-8': '8px 8px',
        'grain-16': '16px 16px',
        'grain-32': '32px 32px',
      },
    },
  },
  plugins: [],
};