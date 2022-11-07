import type { ThemeOptions } from "@mui/material"

import { PaletteCustom } from "./partial/pattern"

export const theme: ThemeOptions = {
  palette: PaletteCustom,
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    }
  },
  spacing: 8,
  direction: "rtl",
  shape: {
    borderRadius: 25
  }
}
