import type { Components, Theme } from "@mui/material"

export const MuiButtonGroup: Components<
  Omit<Theme, "components">
>["MuiButtonGroup"] = {
  defaultProps: {
    size: "large"
  }
}
