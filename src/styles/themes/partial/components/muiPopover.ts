import { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiPopover: Components<Omit<Theme, "components">>["MuiPopover"] = {
  defaultProps: {},
  styleOverrides: {
    root: {
      backgroundColor: PaletteCustom.grey["02"],
      borderRadius: "10px",
      color: "white"
    }
  }
}
