import type { Palette } from "@mui/material/styles"

export const PaletteCustom: Palette = {
  primary: {
    main: "#232329",
    light: "#232329",
    dark: "#232329",
    contrastText: "#70727B"
  },
  secondary: {
    main: "#7a5be6",
    light: "#7a5be6",
    dark: "#7a5be6",
    contrastText: "#010101"
  },
  error: {
    main: "#F42728",
    light: "#F42728",
    dark: "#F42728",
    contrastText: "#010101"
  },
  info: {
    main: "#27F1EC",
    light: "#27F1EC",
    dark: "#27F1EC",
    contrastText: "#010101"
  },
  success: {
    main: "#5DBE74",
    light: "#5DBE74",
    dark: "#5DBE74",
    contrastText: "#010101"
  },
  warning: {
    main: "#E1D35A",
    light: "#E1D35A",
    dark: "#E1D35A",
    contrastText: "#010101"
  },
  background: {
    default: "#1d2029",
    paper: "#2f3441"
  },
  divider: "#232329",
  common: {
    black: "#000",
    white: "#fff"
  },
  mode: "dark",
  contrastThreshold: 1,
  tonalOffset: 1,
  grey: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#232329",
    A100: "#18181C",
    A200: "#010101",
    A400: "#303030",
    A700: "#616161"
  },
  text: {
    primary: "#70727B",
    secondary: "#A6A9AE",
    disabled: "#70727B"
  },
  action: {
    active: "#70727B",
    hover: "#70727B",
    hoverOpacity: 0.08,
    selected: "#70727B",
    selectedOpacity: 0.16,
    disabled: "#70727B",
    disabledBackground: "#70727B",
    disabledOpacity: 0.3,
    focus: "#70727B",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  },
  getContrastText: () => "#70727B",
  augmentColor: () => ({
    main: "#7a5be6",
    light: "#7a5be6",
    dark: "#7a5be6",
    contrastText: "#7a5be6"
  })
}
