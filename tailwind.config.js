/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'SUIT', 'Apple SD Gothic Neo', '-apple-system', 'sans-serif'],
      },
      colors: {
        main: '#4F7457',
        main2: '#8FAB95',
        sub1: '#D5E4D8',
        sub2: '#8FAB95',
        gray1: '#C2C2C2',
        red1: '#C53737',
      },
    },
  },
  plugins: [],
}
