import type { Components } from "@mui/material/styles/components"
import type { Theme } from "@mui/material/styles/createTheme"

export const MuiAutocomplete: Components<
  Omit<Theme, "components">
>["MuiAutocomplete"] = {
  styleOverrides: {
    root: {
      fontSize: "12px",
      borderRadius: "18px",
      fontFamily: "satoshimedium, Helvetica, Arial,  sans-serif",
      minWidth: "240px",
      height: "48px",
      color: "#fff",
      border: 0
    }
  }
}
