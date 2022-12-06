/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: "10px",
      sm: "12px",
      default: "14px"
    },
    borderRadius: {
      less: "4px",
      sm: "11px",
      default: "16px",
      md: "24px"
    },
    colors: {
      purple: {
        primary: "#7B5BE6",
        "01": "#7a5be6"
      },
      white: {
        primary: "#E1E2E2",
        default: "#ffffff"
      },
      blue: {
        from: "#0C9DE6",
        to: "#0070FF",
        default: "#0C9DE6",
        shadow: "#7796ff",
        border: "#3D65EF"
      },
      // blue: {
      //   from: "#0C9DE6",
      //   to: "#0070FF",
      //   default: "#0C9DE6",
      //   shadow: "#7796ff",
      //   border: "#3D65EF"
      // },
      red: {
        from: "#E65D5D",
        to: "#ED3030",
        default: "#EC2F2F",
        shadow: "#EC2F2F",
        border: "#EC2F2F",
        card: "#F42728"
      },
      green: {
        // from: "#0CBE79",
        // default: "#27DE7F",
        // shadow: "#00C076",
        card: "#5DBE74",
        "01": "#5DBE74",
        to: "#ED3030"
      },

      binance: {
        default: "#fcd535"
      },
      polygon: {
        default: "#8247e5"
      },
      gray: {
        default: "#98A0B5",
        100: "#ffffff80",
        200: "#5B606F",
        300: "#5E6679",
        400: "#5B6070",
        500: "#353945",
        600: "#282D3B",
        700: "#222531",
        800: "#1D2029",
        900: "#14161E",
        110: "#232329",
        "neutral04": "#A6A9AE"
      },
      black: {
        "neutral07": "#232329",
        "neutral08": "#010101",
        "neutral7.5": "#18181C",
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
