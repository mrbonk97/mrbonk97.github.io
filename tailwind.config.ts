import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        foreground: {
          DEFAULT: "var(--foreground)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
        },
      },
    },
  },
  plugins: [],
};
export default config;

// 400: "#FF3B00",
//         },
//         secondary: {
//           // 400: '#F3EFE7',
//           400: "#FFFFFF",
