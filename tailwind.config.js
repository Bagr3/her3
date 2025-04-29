module.exports = {
  content: [
    "./index.html",
    "./css/**/*.css",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6F61',
        secondary: '#6B5B93',
        accent: '#88B04B',
      },
      animation: {
        bounce: 'bounce 1s infinite',
        fade: 'fade 0.5s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}