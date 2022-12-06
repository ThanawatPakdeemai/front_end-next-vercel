import type { Components } from "@mui/material/styles/components"
import type { Theme } from "@mui/material/styles/createTheme"

export const MuiButton: Components<Omit<Theme, "components">>["MuiButton"] = {
  defaultProps: {
    size: "large",
    classes: {
      textSizeLarge: "12px"
    }
  },
  styleOverrides: {
    root: {
      borderRadius: "60px",
      fontFamily: "neueMachina, Helvetica, Arial,  sans-serif",
      minWidth: "240px",
      height: "60px",
      color: "#fff",
      textTransform: "unset"
    },
    containedInfo: {
      backgroundImage: "linear-gradient(180deg, #0C9DE6 0%, #0070FF 100%);",
      boxShadow:
        "0px 0px 44px #7796FF, inset 0px 1px 3px rgba(255, 255, 255, 0.5)",
      ":hover": {
        boxShadow: "none"
      }
    },
    containedPrimary: {
      backgroundColor: "#7a5be6",
      "&:disabled": {
        backgroundColor: "#98A0B5"
      },
      ":hover": {
        backgroundImage:
          "linear-gradient(95.05deg, #D91212 0%, #7B5BE6 57.62%, #27F1EC 100.57%)",
        boxShadow:
          "0px -27px 71px rgb(1 62 137 / 25%), 0px -11.28px 29.6621px rgb(1 62 137 / 18%), 0px -6.0308px 15.8588px rgb(1 62 137 / 15%), 0px -3.38082px 8.8903px rgb(1 62 137 / 13%), 0px -1.79553px 4.72157px rgb(1 62 137 / 10%), 0px -0.747159px 1.96475px rgb(1 62 137 / 7%), 0px 4px 4px rgb(0 0 0 / 10%), inset 0px 1px 1px rgb(255 255 255 / 40%), inset 0px -1px 1px rgb(0 0 0 / 25%)",
        borderRadius: "30px"
      }
    },
    containedSuccess: {
      backgroundColor: "linear-gradient(180deg, #0CBE79 0%, #17C582 100%)",
      boxShadow:
        "0px 0px 12px #00C076, inset 0px 1px 3px rgba(255, 255, 255, 0.5)",
      ":hover": {
        boxShadow:
          "0px 0px 0 transparent, inset 0px 1px 3px rgba(255, 255, 255, 0.5)"
      }
    }
  }
}
