import type { Components } from "@mui/material/styles/components"
import type { Theme } from "@mui/material/styles/createTheme"
import { PaletteCustom } from "../pattern"

export const MuiButton: Components<Omit<Theme, "components">>["MuiButton"] = {
  defaultProps: {
    classes: {
      textSizeLarge: "12px"
    }
  },
  styleOverrides: {
    root: {
      fontFamily: "neueMachinaSemiBold, Helvetica, Arial, sans-serif",
      boxShadow: "none",
      color: PaletteCustom.common.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "unset",
      transition: "all 0.75s cubic-bezier(0.215, 0.61, 0.355, 1)",
      ".MuiSvgIcon-root": {
        marginTop: "-2px"
      },
      "&.MuiButton-size": {
        "&Small": {
          minWidth: "134px",
          fontSize: "10px",
          padding: "2px 20px",
          ".MuiSvgIcon-root": {
            fontSize: "20px"
          }
        },
        "&Medium": {
          minWidth: "164px",
          ".MuiSvgIcon-root": {
            fontSize: "24px"
          }
        },
        "&Large": {
          minWidth: "180px",
          padding: "15px 25px 13px",
          borderRadius: "30px",
          ".MuiSvgIcon-root": {
            fontSize: "28px"
          }
        }
      },
      "&.MuiButton-outlined": {
        border: `1px solid ${PaletteCustom.grey[900]}`,
        "&Secondary": {
          borderColor: PaletteCustom.secondary.main,
          color: PaletteCustom.secondary.main
        },
        "&Success": {
          borderColor: PaletteCustom.success.main,
          color: PaletteCustom.success.main
        },
        "&Error": {
          borderColor: PaletteCustom.error.main,
          color: PaletteCustom.error.main
        },
        "&Warning": {
          borderColor: PaletteCustom.warning.main,
          color: PaletteCustom.warning.main
        },
        "&Info": {
          borderColor: PaletteCustom.info.main,
          color: PaletteCustom.info.main
        }
      },
      "&.MuiButton-contained": {
        backgroundColor: "#010101",
        "&Secondary": {
          backgroundColor: PaletteCustom.secondary.main,
          boxShadow: "none",
          ":hover": {
            background: `linear-gradient(95.05deg, #D91212 0%, #7B5BE6 57.62%, #27F1EC 100.57%)`,
            boxShadow:
              "0px -27px 71px rgba(1, 62, 137, 0.25), 0px -11.28px 29.6621px rgba(1, 62, 137, 0.179714), 0px -6.0308px 15.8588px rgba(1, 62, 137, 0.149027), 0px -3.38082px 8.8903px rgba(1, 62, 137, 0.125), 0px -1.79553px 4.72157px rgba(1, 62, 137, 0.100973), 0px -0.747159px 1.96475px rgba(1, 62, 137, 0.0702864), 0px 4px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 1px rgba(255, 255, 255, 0.4), inset 0px -1px 1px rgba(0, 0, 0, 0.25)"
          }
        },
        "&Success": {
          backgroundColor: PaletteCustom.success.main
        },
        "&Error": {
          backgroundColor: PaletteCustom.error.main,
          color: PaletteCustom.primary.main
        },
        "&Warning": {
          backgroundColor: PaletteCustom.warning.main
        },
        "&Info": {
          backgroundColor: PaletteCustom.info.main
        }
      }
    }
  }
}
