module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {

    extend: {
      backgroundImage: theme => ({
        'hero-img': "url(../img/container_bg.jpg)"
      }),

      colors: {
        gray: {
          '100': '#f7fafc',
          '200': '#edf2f7',
          '300': '#ececec',
          '400': '#D9D9D9',
          '500': '#a0aec0',
          '600': '#718096',
          '700': '#4a5568',
          '800': '#2d3748',
          '900': '#1a202c',
        }
      },
    },

    inset: {
      '0': 0,
      '2': '1rem',
    },

    minWidth: {
      '0': '0',
      '1/5': '20%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
            },
  },
  variants: {},
  plugins: [],
}
