import { Components, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiTextfield: Components<
  Omit<Theme, "components">
>["MuiTextField"] = {
  defaultProps: {},
  styleOverrides: {
    root: {
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
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        "&.Mui-error": {
          color: PaletteCustom.error.main
        }
      },
      "& .MuiOutlinedInput-root": {
        width: 234,
        height: 40,
        borderRadius: "8px",
        background: PaletteCustom.neutral[800],
        border: `1px solid ${PaletteCustom.neutral[700]}`,
        "&.Mui-focused": {
          border: `1px solid ${PaletteCustom.neutral[600]}`
        },
        "&.Mui-error": {
          border: `1px solid ${PaletteCustom.error.main}`
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
