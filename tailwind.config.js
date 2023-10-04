/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'custom-blue': '#5271FF',
    },
      backgroundColor: {
        'custom-blue': '#5271FF',
      }
    },
  },
  plugins: [
  ],
}

