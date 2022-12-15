import type { Components } from "@mui/material/styles/components"
import type { Theme } from "@mui/material/styles/createTheme"
import { PaletteCustom } from "../pattern"

export const MuiChip: Components<Omit<Theme, "components">>["MuiChip"] = {
  styleOverrides: {
    root: {
      fontFamily: "neueMachinaSemiBold, Helvetica, Arial, sans-serif",
      borderRadius: "4px",
      "&.MuiChip": {
        "&-size": {
          "&Small": {
            padding: "6px 0 4px",
            height: "25px",
            borderRadius: "4px",
            fontSize: "10px"
          },
          "&Medium": {
            padding: "10px 0 9px",
            height: "40px",
            borderRadius: "8px"
          }
        },
        "&-color": {
          "&Default": {
            backgroundColor: PaletteCustom.primary.main,
            color: PaletteCustom.text.primary
          },
          "&Primary": {
            backgroundColor: PaletteCustom.primary.main,
            color: PaletteCustom.text.primary
          },
          "&Secondary": {
            backgroundColor: PaletteCustom.secondary.main,
            color: PaletteCustom.secondary.contrastText
          },
          "&Success": {
            backgroundColor: PaletteCustom.success.main,
            color: PaletteCustom.success.contrastText
          },
          "&Warning": {
            backgroundColor: PaletteCustom.warning.main,
            color: PaletteCustom.warning.contrastText
          },
          "&Info": {
            backgroundColor: PaletteCustom.info.main,
            color: PaletteCustom.info.contrastText
          }
        },
        "&-outlined": {
          backgroundColor: "transparent",
          "&Default": {
            borderColor: PaletteCustom.neutral[700],
            backgroundColor: PaletteCustom.neutral[900],
            color: PaletteCustom.text.secondary
          },
          "&Primary": {
            borderColor: PaletteCustom.neutral[700],
            color: PaletteCustom.text.secondary
          },
          "&Secondary": {
            borderColor: PaletteCustom.secondary.main,
            color: PaletteCustom.secondary.main
          },
          "&Success": {
            borderColor: PaletteCustom.success.main,
            color: PaletteCustom.success.main
          },
          "&Warning": {
            borderColor: PaletteCustom.warning.main,
            color: PaletteCustom.warning.main
          },
          "&Info": {
            borderColor: PaletteCustom.info.main,
            color: PaletteCustom.info.main
          }
        }
      }
    }
  }
}
