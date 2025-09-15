import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Design system color tokens from PRD
        bg: "hsl(240, 10%, 95%)",
        text: "hsl(240, 10%, 15%)",
        muted: "hsl(240, 10%, 40%)",
        accent: "hsl(160, 60%, 50%)",
        surface: "hsl(0, 0%, 100%)",
        // Extended primary colors for compatibility
        primary: {
          DEFAULT: "hsl(270, 70%, 60%)",
          50: "hsl(270, 70%, 95%)",
          100: "hsl(270, 70%, 90%)",
          200: "hsl(270, 70%, 80%)",
          300: "hsl(270, 70%, 70%)",
          400: "hsl(270, 70%, 65%)",
          500: "hsl(270, 70%, 60%)",
          600: "hsl(270, 70%, 55%)",
          700: "hsl(270, 70%, 50%)",
          800: "hsl(270, 70%, 45%)",
          900: "hsl(270, 70%, 40%)",
          950: "hsl(270, 70%, 35%)",
        },


        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
        xl: "24px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        card: "0 4px 12px hsla(240, 10%, 15%, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
