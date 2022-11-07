import type { ThemeOptions } from "@mui/material"

import { MuiAppBar as _muiAppBar } from "./partial/components/muiAppBar"
import { MuiAutocomplete as _muiAutocomplete } from "./partial/components/muiAutocomplete"
import { MuiBackdrop as _muiBackdrop } from "./partial/components/muiBackdrop"
import { MuiButton as _muiButton } from "./partial/components/muiButton"
import { MuiButtonBase as _muiButtonBase } from "./partial/components/muiButtonBase"
import { MuiButtonGroup as _muiButtonGroup } from "./partial/components/muiButtonGroup"
import { MuiCheckbox as _muiCheckbox } from "./partial/components/muiCheckbox"
import { MuiFab as _muiFab } from "./partial/components/muiFab"
import { MuiList as _muiList } from "./partial/components/muiList"
import { MuiMenuItem as _muiMenuItem } from "./partial/components/muiMenuItem"
import { MuiTable as _muiTable } from "./partial/components/muiTable"
import { PaletteCustom } from "./partial/pattern"
import { TypographyCustom } from "./partial/typography"

export const theme: ThemeOptions = {
  typography: TypographyCustom,
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
  },
  components: {
    MuiButtonBase: _muiButtonBase,
    MuiButton: _muiButton,
    MuiAppBar: _muiAppBar,
    MuiList: _muiList,
    MuiMenuItem: _muiMenuItem,
    MuiTable: _muiTable,
    MuiBackdrop: _muiBackdrop,
    MuiButtonGroup: _muiButtonGroup,
    MuiCheckbox: _muiCheckbox,
    MuiFab: _muiFab,
    MuiAutocomplete: _muiAutocomplete,
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "medium"
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: "large"
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense"
      }
    },
    MuiRadio: {
      defaultProps: {
        size: "medium"
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: "medium"
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "medium"
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    }
  }
}
