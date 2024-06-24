module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'custom': '1px 2px 2px black',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities } : any) {
      addUtilities({
        '.text-shadow-custom': {
          textShadow: '1px 2px 2px black',
        },
      })
    },
  ],
}