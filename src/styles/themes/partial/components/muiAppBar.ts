import type { Components, Theme } from "@mui/material"

export const MuiAppBar: Components<Omit<Theme, "components">>["MuiAppBar"] = {
  defaultProps: {
    color: "inherit"
  }
}
