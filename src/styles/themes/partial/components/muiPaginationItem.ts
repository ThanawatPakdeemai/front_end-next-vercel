import { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiPaginationItem: Components<
  Omit<Theme, "components">
>["MuiPaginationItem"] = {
  defaultProps: {
    color: PaletteCustom.neutral["300"]
  },
  styleOverrides: {
    root: {
      borderRadius: "8px",
      color: PaletteCustom.neutral["300"],
      "&.MuiPaginationItem-root": {
        backgroundColor: PaletteCustom.neutral["800"],
        border: `1px solid ${PaletteCustom.primary.main}`
      },
      "&.MuiPaginationItem-ellipsis": {
        backgroundColor: PaletteCustom.neutral["800"],
        border: `1px solid ${PaletteCustom.primary.main}`,
        div: {
          margin: "auto 0"
        }
      },
      "&.MuiPaginationItem-sizeLarge": {
        padding: "10px 0 7px 0"
      },
      "&.Mui-selected": {
        backgroundColor: PaletteCustom.error.main,
        color: PaletteCustom.neutral["300"]
      },
      "&.Mui-selected:hover": {
        backgroundColor: PaletteCustom.error.main,
        color: PaletteCustom.neutral["300"]
      }
    }
  }
}
