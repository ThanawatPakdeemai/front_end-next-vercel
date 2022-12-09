import { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiList: Components<Omit<Theme, "components">>["MuiList"] = {
  defaultProps: {
    dense: true
  },
  styleOverrides: {
    root: {
      backgroundColor: PaletteCustom.grey["900"],
      padding: 0,
      borderRadius: "5px",
      color: "#70727B"
    }
  }
}
