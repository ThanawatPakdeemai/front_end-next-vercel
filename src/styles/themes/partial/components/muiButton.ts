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
      fontSize: "12px",
      borderRadius: "18px",
      fontFamily: "neue-machina, Helvetica, Arial,  sans-serif",
      minWidth: "240px",
      height: "48px",
      color: "#fff"
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
      backgroundColor: "#EC2F2F",
      boxShadow:
        "0px 0px 20px #EC2F2F, inset 0px 1px 3px rgba(255, 255, 255, 0.5)",
      "&:disabled": {
        backgroundColor: "#98A0B5"
      },
      ":hover": {
        backgroundColor: "#EC2F2F",
        boxShadow:
          "0px 0px 0 transparent, inset 0px 1px 3px rgba(255, 255, 255, 0.5)"
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
