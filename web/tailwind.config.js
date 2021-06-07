module.exports = {
  purge: ['**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#181818',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
