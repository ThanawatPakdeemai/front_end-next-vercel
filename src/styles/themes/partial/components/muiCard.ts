import { Components, Theme } from "@mui/material"
// import { PaletteCustom } from "../pattern"

export const MuiCard: Components<Omit<Theme, "components">>["MuiCard"] = {
  defaultProps: {},
  styleOverrides: {
    root: {
      boxShadow: "none"
    }
  }
}
