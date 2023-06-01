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
      width: "40px",
      height: "40px",
      borderRadius: "8px",
      fontFamily: "neueMachina",
      fontSize: "12px",
      fontWeight: 700,
      margin: "0 10px 0 0",
      color: PaletteCustom.neutral["300"],
      "&.MuiPaginationItem-root": {
        backgroundColor: PaletteCustom.neutral["800"],
        border: `1px solid ${PaletteCustom.neutral["700"]}`
      },
      "&.MuiPaginationItem-root:hover": {
        borderRadius: "999px"
      },
      "&.MuiPaginationItem-ellipsis": {
        backgroundColor: PaletteCustom.neutral["800"],
        border: `1px solid ${PaletteCustom.neutral["700"]}`,
        div: {
          margin: "auto 0"
        }
      },
      "&.MuiPaginationItem-ellipsis:hover": {
        borderRadius: "999px"
      },
      "&.MuiPaginationItem-sizeLarge": {
        padding: "10px 0 7px 0"
      },
      "&.Mui-selected": {
        backgroundColor: PaletteCustom.error.main,
        color: PaletteCustom.neutral["300"],
        border: "none"
      },
      "&.Mui-selected:hover": {
        backgroundColor: PaletteCustom.error.main,
        color: PaletteCustom.neutral["300"],
        borderRadius: "999px",
        border: "none"
      }
    }
  }
}
