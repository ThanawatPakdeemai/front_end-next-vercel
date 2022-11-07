import type { Components, Theme } from "@mui/material"

export const MuiFab: Components<Omit<Theme, "components">>["MuiFab"] = {
  defaultProps: {
    size: "large"
  }
}
