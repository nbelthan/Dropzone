// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Scan these files for Tailwind classes
    ],
    theme: {
      extend: {
         // Add custom theme extensions if desired (e.g., specific colors, fonts)
         colors: {
          'brand-primary': '#3b82f6', // Example blue (blue-500)
          'brand-secondary': '#10b981', // Example green (emerald-500)
        }
      },
    },
    plugins: [],
  }