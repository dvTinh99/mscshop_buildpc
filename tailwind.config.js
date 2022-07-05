module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  variants: {
    extend: {
      backgroundColor: ['disabled'],
    },
  },
  theme: {
    extend: {
      corePlugins: {
        preflight: false,
        //aspectRatio: false
      },
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
