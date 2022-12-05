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
        backgroundColor: "#7a5be6"
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
