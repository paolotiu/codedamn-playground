module.exports = {
  purge: ['**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#181818',
        'off-black': '#2e2e2e',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
