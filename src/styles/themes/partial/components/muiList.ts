import type { Components, Theme } from "@mui/material"

export const MuiList: Components<Omit<Theme, "components">>["MuiList"] = {
  defaultProps: {
    dense: true
  }
}
