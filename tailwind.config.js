/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: {
        default: "#ffffff"
      },
      purple: {
        "01": "#7a5be6"
      },
      red: {
        "01": "#F42728",
        to: "#ED3030"
      },
      green: {
        "01": "#5DBE74"
      },
      binance: {
        default: "#fcd535"
      },
      polygon: {
        default: "#8247e5"
      },
      black: {
        default: "#70727B",
        "01": "#010101",
        "02": "#18181C",
        "03": "#232329"
      }
    },
    fontFamily: {
      "neue-machina": ["neueMachina", "Helvetica", "Arial", "sans-serif"],
      "neue-machina-semi": [
        "neueMachinaSemiBold",
        "Helvetica",
        "Arial",
        "sans-serif"
      ],
      "neue-machina-bold": [
        "neueMachinaBold",
        "Helvetica",
        "Arial",
        "sans-serif"
      ]
    },
    extend: {
      keyframes: {
        "time-progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "rotating": {
          "from": {
            transform: "rotate(0deg)"
          },

          "to": {
            transform: "rotate(-360deg)"
          }
        }
      },
      animation: {
        "time-progress": "time-progress 5s linear forwards",
        "rotating": "rotating 7s linear infinite"
      }
    }
  },
  // important: true,
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/line-clamp")]
}
