/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "animate-fly-right",
    "animate-fly-left",
    "bg-purple-400",
    "bg-red-400",
    "bg-emerald-400",
    "text-purple-400",
    "text-red-400",
    "text-emerald-400",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        flyLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100vw)" },
        },
        flyRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },
      animation: {
        "fly-left": "flyLeft 0.5s ease-in forwards",
        "fly-right": "flyRight 0.5s ease-in forwards",
      },
    },
  },
  plugins: [],
};
