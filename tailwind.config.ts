export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "var(--background-light)",
          dark: "var(--background-dark)",
        },
        foreground: {
          light: "var(--foreground-light)",
          dark: "var(--foreground-dark)",
        },
      },
    },
  },
  plugins: [],
};
