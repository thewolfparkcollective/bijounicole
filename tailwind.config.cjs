module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 16px 40px rgba(0,0,0,0.08)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
