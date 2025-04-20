/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用基于类的深色模式
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E88E5", // 主蓝色
          light: "#42A5F5",
          dark: "#1565C0",
        },
        secondary: "#03A9F4", // 浅蓝色
        background: {
          DEFAULT: "#F5F9FF", // 浅蓝背景
          light: "#FFFFFF",
          dark: "#E3F2FD",
          'gray-900': 'rgba(15, 23, 42, 0.95)', // 调整深色模式背景的透明度
          'background': 'rgba(241, 245, 249, 0.95)', // 调整浅色模式背景的透明度
        },
        text: {
          DEFAULT: "#2C3E50", // 深蓝灰色文字
          dark: "#1A2938",
          light: "#546E7A"
        },
        accent: "#4FC3F7", // 强调色
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
  plugins: [require("tailwindcss-animate")],
}
