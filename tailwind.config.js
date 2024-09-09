/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-1": "hsl(var(--color-surface-1))",
        "surface-2": "hsl(var(--color-surface-2))",
        "surface-3": "hsl(var(--color-surface-3))",
        "foreground-1": "hsl(var(--color-foreground-1))",
        "foreground-2": "hsl(var(--color-foreground-2))",
        "foreground-3": "hsl(var(--color-foreground-3))",
      },
    },
  },
  plugins: [],
};
