/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    /* base config */
    colors: {
      primary: {
        main: "#010101",
        light: "#010101",
        dark: "#010101",
        contrastText: "#A6A9AE"
      },
      secondary: {
        main: "#7B5BE6",
        light: "#CFB6F6",
        dark: "#7B5BE6",
        contrastText: "#010101"
      },
      error: {
        main: "#F42728",
        light: "#FFAEAB",
        dark: "#F42728",
        contrastText: "#010101"
      },
      info: {
        main: "#27F1EC",
        light: "#27F1EC",
        dark: "#27F1EC",
        contrastText: "#010101"
      },
      success: {
        main: "#5DBE74",
        light: "#D8F3D5",
        dark: "#5DBE74",
        contrastText: "#010101"
      },
      warning: {
        main: "#E1D35A",
        light: "#FBE88E",
        dark: "#FFCA63",
        contrastText: "#010101"
      },
      neutral: {
        100: "#F7FBFA",
        200: "#F1F4F4",
        300: "#E1E2E2",
        400: "#A6A9AE",
        500: "#70727B",
        600: "#4E5057",
        700: "#232329",
        800: "#18181C",
        900: "#010101"
      },
      black: {
        100: "#000000",
        200: "#2f2f2f",
        300: "#01010133",
        400: "#010101D9",
        500: "#18181cff",
        600: "#6F727B",
        700: "#111111",
        800: "#0101015e",
        900: "#24242498"
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
      ],
      "digital-7": "digital-7",
      "mondwest": ["mondwest", "Helvetica", "Arial", "sans-serif"]
    },
    /* extend config here */
    extend: {
      fontSize: {
        xs: "10px",
        sm: "12px",
        default: "14px"
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
        red: {
          from: "#E65D5D",
          to: "#ED3030",
          default: "#EC2F2F",
          shadow: "#EC2F2F",
          border: "#EC2F2F",
          card: "#F42728"
        },
        green: {
          card: "#5DBE74",
          "01": "#5DBE74",
          to: "#ED3030",
          "lemon": "#A0ED61"
        },
        varidian: {
          default: "#3DCD95"
        },
        binance: {
          default: "#fcd535"
        },
        polygon: {
          default: "#8247e5"
        },
        grey: {
          default: "#98A0B5",
          "neutral04": "#A6A9AE"
        },
        black: {
          default: "#70727B"
        },
        transparent: "transparent"
      },
      borderRadius: {
        less: "4px",
        sm: "11px",
        default: "16px",
        md: "24px"
      },
      backgroundImage: {
        "room-list": "url('/images/lobbybackground.webp')"
      },
      transitionDuration: {
        400: "400ms"
      },
      transitionTimingFunction: {
        "bounce": "cubic-bezier(.17,.67,.83,.67)"
      },
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
        },
        "right-to-left": {
          "0%": { left: "100%", transform: `translate-x-0` },
          "100%": { left: "-50%", transform: `translate-x-full` }
        }
      },
      animation: {
        "time-progress": "time-progress 5s linear forwards",
        "rotating": "rotating 7s linear infinite",
        "right-to-left": "right-to-left 100s linear infinite"
      }
    }
  },
  // important: true,
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/line-clamp")],
  babel: {
    plugins: ["preval"]
  }
}
