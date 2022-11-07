import type { Components, Theme } from "@mui/material"

export const MuiCheckbox: Components<Omit<Theme, "components">>["MuiCheckbox"] =
  {
    defaultProps: {
      size: "medium"
    }
  }
