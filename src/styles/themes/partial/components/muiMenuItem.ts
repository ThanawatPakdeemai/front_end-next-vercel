import type { Components, Theme } from "@mui/material"

export const MuiMenuItem: Components<Omit<Theme, "components">>["MuiMenuItem"] =
  {
    defaultProps: {
      dense: true
    }
  }
