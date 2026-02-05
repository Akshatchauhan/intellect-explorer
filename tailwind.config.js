/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your existing custom colors
      colors: {
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      // NEW: The Typography Clash Setup
      fontFamily: {
        // The "Empire" Font (Luxury, Headers)
        serif: ['"Playfair Display"', 'serif'],
        // The "Infrastructure" Font (Data, Code)
        mono: ['"JetBrains Mono"', 'monospace'],
        // Neutral fallback
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}