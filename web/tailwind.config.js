const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
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
  plugins: [
    plugin(function ({ addUtilities, theme, e }) {
      const colors = theme('colors');
      const shadowBorderUtilities = Object.keys(colors).reduce((acc, key) => {
        if (typeof colors[key] === 'string') {
          return {
            ...acc,
            [`.shadow-border-b-${e(key)}`]: {
              'box-shadow': `0 1px 0 ${colors[key]}`,
            },
          };
        }

        const colorShades = Object.keys(colors[key]);

        return {
          ...acc,
          ...colorShades.reduce(
            (a, shade) => ({
              ...a,
              [`.shadow-border-b-${e(key)}-${shade}`]: {
                'box-shadow': `inset 0 -2px 0 ${colors[key][shade]}`,
              },
            }),
            {},
          ),
        };
      }, {});

      addUtilities(shadowBorderUtilities, ['responsive', 'hover', 'focus-within']);
    }),
  ],
};
