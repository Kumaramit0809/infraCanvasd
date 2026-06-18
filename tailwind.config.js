/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#090b10',
        panel: '#0d1117',
        card: '#111827',
        border: '#1f2937',
        muted: '#9ca3af',
        success: '#22c55e',
        error: '#ef4444',
        accent: '#2563eb',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
