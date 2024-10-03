/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc700",
        secondary: "#10a958",
        goodred: "#f24e1e",
        goodgreen: "#0fa958",
        goodyellow: "#ffc700",
        goodpurple: "#c7b9ff",
        goodblue: "#3cb1f3",
      },
      boxShadow: {
        dark: "2px 2px 0px 0px #000",
        darkSmall: "1px 1px 0px 0px #000",
        light: "2px 2px 0px 0px #FFF",
        "dark-big": "4px 4px 0px 0px #000",
        "dark-down": "0px 2px 0px 0px #000",
        "light-down": "0px 2px 0px 0px #FFF",
      },
      keyframes: {
        updown: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
        },
        swipeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        loadingSwipe: {
          "100%": { left: "100%" },
        },
      },
      animation: {
        updown: "updown 1s ease-in-out infinite",
        swipeup: "swipeUp 0.25s ease forwards",
        loadingSwipe:
          "loadingSwipe 0.75s cubic-bezier(0.2, 0.1, 0.2, 1) forwards",
        loadingSwipeInfinite:
          "loadingSwipe 1s cubic-bezier(0.2, 0.1, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
