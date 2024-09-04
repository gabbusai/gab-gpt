/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "martianMono" : ['Martian Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}