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
      // blue: {
      //   from: "#0C9DE6",
      //   to: "#0070FF",
      //   default: "#0C9DE6",
      //   shadow: "#7796ff",
      //   border: "#3D65EF"
      // },
      red: {
        "01": "#F42728",
        to: "#ED3030"
        // from: "#E65D5D",
        // default: "#EC2F2F",
        // shadow: "#EC2F2F",
        // border: "#EC2F2F"
      },
      green: {
        "01": "#5DBE74"
        // from: "#0CBE79",
        // to: "#17C582",
        // default: "#27DE7F",
        // shadow: "#00C076"
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
        }
      },
      animation: {
        "time-progress": "time-progress 5s linear forwards"
      }
    }
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/line-clamp")]
}
