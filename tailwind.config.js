/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Prefix Tailwind utilities to avoid conflicts with Vuetify
  prefix: 'tw-',
  // Disable Tailwind's base styles to avoid conflicts with Vuetify
  corePlugins: {
    preflight: false,
  }
}