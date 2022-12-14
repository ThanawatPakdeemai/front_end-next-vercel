import type { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiMenuItem: Components<Omit<Theme, "components">>["MuiMenuItem"] =
  {
    defaultProps: {
      dense: true
    },
    styleOverrides: {
      root: {
        borderRadius: "12px",
        marginBottom: "5px",
        padding: "8px 5px 8px 5px",
        "&:last-child": { marginBottom: 0 },
        backgroundColor: PaletteCustom.grey["A100"],
        "&:hover": {
          backgroundColor: PaletteCustom.error.main, // "transparent"
          color: PaletteCustom.white.primary
        }
      }
    }
  }
