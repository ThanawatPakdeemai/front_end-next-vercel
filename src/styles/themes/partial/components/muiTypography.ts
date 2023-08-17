import type { Components, Theme } from "@mui/material"

export const StyledFormLabel = {
  "&.MuiFormLabel-root, &.MuiTypography-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    position: "relative",
    display: "block",
    fontSize: "12px",
    marginTop: "5px",
    fontWeight: "bold"
  }
}

export const MuiTypography: Components<
  Omit<Theme, "components">
>["MuiTypography"] = {
  styleOverrides: {
    root: {
      fontFamily: "neueMachina, Helvetica, Arial, sans-serif"
    },
    h1: {
      fontSize: "30px"
    },
    h2: {
      fontSize: "26px"
    },
    h3: {
      fontSize: "18px"
    }
  }
}
