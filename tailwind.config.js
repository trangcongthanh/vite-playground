/** @type {import('tailwindcss').Config} */
const configs = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'infinite-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(var(--slider-item-width, 20cqw) * var(--slider-item-count, 5) * -1))' },
        },
      },
      animation: {
        'infinite-scroll':
          'infinite-scroll var(--slider-speed, 10s) var(--slider-timing-function, linear) var(--slider-iteration-count, infinite)',
      },
    },
  },
  plugins: [],
}
export default configs
