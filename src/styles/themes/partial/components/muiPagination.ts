import { Components, Theme } from "@mui/material"

export const MuiPagination: Components<
  Omit<Theme, "components">
>["MuiPagination"] = {
  defaultProps: {},
  styleOverrides: {
    root: {}
  }
}
