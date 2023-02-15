import type { Components, Theme } from "@mui/material"

export const MuiTableCell: Components<
  Omit<Theme, "components">
>["MuiTableCell"] = {
  defaultProps: {
    size: "medium"
  },
  styleOverrides: {
    root: {
      fontFamily: "neueMachinaSemiBold, Helvetica, Arial, sans-serif",
      fontSize: "10px"
    }
  }
}
