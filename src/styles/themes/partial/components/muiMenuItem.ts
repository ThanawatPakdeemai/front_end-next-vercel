import type { Components, SxProps, Theme } from "@mui/material"
import { PaletteCustom } from "../pattern"

export const MuiMenuItem: Components<Omit<Theme, "components">>["MuiMenuItem"] =
  {
    defaultProps: {
      dense: true
    },
    styleOverrides: {
      root: {
        borderRadius: "12px",
        marginBottom: "5px",
        padding: "8px 5px 8px 5px",
        "&:last-child": { marginBottom: 0 },
        backgroundColor: PaletteCustom.neutral["800"],
        "&:hover": {
          backgroundColor: PaletteCustom.error.main, // "transparent"
          color: PaletteCustom.white.primary,
          ".MuiSvgIcon-root": {
            color: PaletteCustom.white.primary
          }
        }
      }
    }
  }

export const StyledMenuItemCustom: SxProps<Theme> = {
  "&.MuiList-root": {
    background: "#18181C",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    ".MuiMenuItem-root": {
      display: "flex",
      alignItems: "center",
      padding: "10px 10px 9px",
      gap: "16px",
      borderRadius: "8px",
      height: "40px",
      margin: "0",
      background: "transparent",
      transition: "backgroundColor 0.3s ease",
      boxShadow: "none!important",
      "&.Mui-selected": {},
      "&:hover": {
        backgroundColor: "#010101",
        "a .MuiTypography-root": {
          color: "#E1E2E2"
        }
      },
      "a": {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        ".MuiListItemIcon-root": {
          minWidth: "auto"
        },
        ".MuiTypography-root": {
          fontSize: "12px",
          color: "#70727B",
          transition: "color 0.3s ease"
        },
        "&.active": {
          ".MuiTypography-root": {
            color: "#E1E2E2"
          }
        }
      }
    }
  }
}
