import type { Palette } from "@mui/material/styles"
import fullConfig from "../../../../tailwindResolver"

const { theme } = fullConfig

export const PaletteCustom: Palette | any = theme &&
  theme.colors && {
    primary: theme.colors["primary"],
    secondary: theme.colors["secondary"],
    error: theme.colors["error"],
    info: theme.colors["info"],
    success: theme.colors["success"],
    warning: theme.colors["warning"],
    background: {
      default: theme.colors["grey"]["900"],
      paper: "#2f3441"
    },
    divider: theme.colors["grey"]["900"],
    common: {
      black: "#000",
      white: "#fff"
    },
    mode: "dark",
    contrastThreshold: 1,
    tonalOffset: 1,
    grey: theme.colors["grey"],
    white: theme.colors["white"],
    text: {
      primary: theme.colors["black"]["default"],
      secondary: theme.colors["grey"]["neutral04"],
      disabled: theme.colors["black"]["default"]
    },
    action: {
      active: theme.colors["black"]["default"],
      hover: theme.colors["black"]["default"],
      hoverOpacity: 0.08,
      selected: theme.colors["black"]["default"],
      selectedOpacity: 0.16,
      disabled: theme.colors["black"]["default"],
      disabledBackground: theme.colors["black"]["default"],
      disabledOpacity: 0.3,
      focus: theme.colors["black"]["default"],
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    },
    getContrastText: () => "#70727B",
    augmentColor: () => theme.colors && theme.colors["secondary"]
  }
