import { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiTextfield: Components<
  Omit<Theme, "components">
>["MuiTextField"] = {
  defaultProps: {},
  styleOverrides: {
    root: {
      fontFamily: "Neue Machina",
      "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
        "& legend": {
          maxWidth: 0
        }
      },
      "& .MuiInputBase-input": {
        height: 40,
        padding: 0
      },
      "& .MuiInputLabel-root": {
        transition: "none",
        textTransform: "uppercase",
        position: "relative",
        left: -14,
        top: 12,
        fontWeight: 700,
        color: PaletteCustom.neutral[600],
        "&.Mui-error": {
          color: PaletteCustom.error.main
        },
        "&.Mui-focused": {
          color: PaletteCustom.neutral[500]
        }
      },
      "& .MuiFormHelperText-root": {
        color: PaletteCustom.neutral[600],
        marginLeft: 0,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        "&.Mui-error": {
          color: PaletteCustom.error.main
        }
      },
      "& .MuiOutlinedInput-root": {
        height: 40,
        borderRadius: "8px",
        background: PaletteCustom.neutral[800],
        border: `1px solid ${PaletteCustom.neutral[700]}`,
        "&.Mui-focused": {
          border: `1px solid ${PaletteCustom.neutral[600]}`
        },
        "&.Mui-error": {
          border: `1px solid ${PaletteCustom.error.main}`
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${PaletteCustom.neutral[800]} inset`,
            WebkitTextFillColor: PaletteCustom.neutral[500],
            caretColor: `#fff`,
            borderRadius: `unset`,
            height: `100%`
          }
        }
      },
      ":hover": {
        "& .MuiFormHelperText-root": {
          color: PaletteCustom.neutral[400]
        },
        "& .MuiOutlinedInput-root": {
          border: `1px solid ${PaletteCustom.secondary.main}`
        },
        "& .Mui-disabled": {
          border: `0px solid ${PaletteCustom.neutral[700]}`,
          color: PaletteCustom.neutral[600]
        },
        "& .MuiInputLabel-root": {
          color: PaletteCustom.neutral[400]
        }
      }
    }
  }
}

export const StyledTextField = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    fontWeight: 400,
    fontSize: "14px",
    fontWight: 700,
    fontFamily: "neueMachina"
  },
  "& .MuiInputLabel-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase"
  }
}

export const StyledTextField2 = {
  "& .MuiOutlinedInput-root": {
    width: "100%",
    fontWeight: 400,
    fontSize: "14px",
    fontWight: 700,
    fontFamily: "neueMachina",
    height: "120px"
  },
  "& .MuiInputLabel-root": {
    color: "#70727B",
    fontFamily: "neueMachina",
    textTransform: "uppercase",
    fontSize: "14px",
    top: "0",
    left: "0",
    transform: "none"
  }
}
