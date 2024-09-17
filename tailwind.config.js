/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "hsl(var(--primary))",
        "secondary": "hsl(var(--secondary))",
        "surface-1": "hsl(var(--surface-1))",
        "surface-2": "hsl(var(--surface-2))",
        "surface-3": "hsl(var(--surface-3))",
        "foreground-1": "hsl(var(--foreground-1))",
        "foreground-2": "hsl(var(--foreground-2))",
        "foreground-3": "hsl(var(--foreground-3))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
