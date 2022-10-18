import type { ThemeOptions } from '@mui/material';

import { MuiAppBar } from './partial/components/muiAppBar';
import { MuiBackdrop } from './partial/components/muiBackdrop';
import { MuiButton } from './partial/components/muiButton';
import { MuiButtonBase } from './partial/components/muiButtonBase';
import { MuiButtonGroup } from './partial/components/muiButtonGroup';
import { MuiCheckbox } from './partial/components/muiCheckbox';
import { MuiFab } from './partial/components/muiFab';
import { MuiList } from './partial/components/muiList';
import { MuiMenuItem } from './partial/components/muiMenuItem';
import { MuiTable } from './partial/components/muiTable';
import { PaletteCustom } from './partial/pattern';
import { TypographyCustom } from './partial/typography';

export const theme: ThemeOptions = {
  typography: TypographyCustom,
  palette: PaletteCustom,
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  },
  spacing: 8,
  direction: 'rtl',
  shape: {
    borderRadius: 25
  },
  components: {
    MuiButtonBase: MuiButtonBase,
    MuiButton: MuiButton,
    MuiAppBar: MuiAppBar,
    MuiList: MuiList,
    MuiMenuItem: MuiMenuItem,
    MuiTable: MuiTable,
    MuiBackdrop: MuiBackdrop,
    MuiButtonGroup: MuiButtonGroup,
    MuiCheckbox: MuiCheckbox,
    MuiFab: MuiFab,
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'medium'
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'large'
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiRadio: {
      defaultProps: {
        size: 'medium'
      }
    },
    MuiSwitch: {
      defaultProps: {
        size: 'medium'
      }
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'medium'
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true
      }
    }
  }
};
