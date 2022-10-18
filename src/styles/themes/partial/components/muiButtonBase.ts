import type { Components, Theme } from '@mui/material';
export const MuiButtonBase: Components<
  Omit<Theme, 'components'>
>['MuiButtonBase'] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
    focusRipple: false
  },
  styleOverrides: {
    root: {
      '&:disabled, &.Mui-disabled': {
        backgroundColor: '#98A0B5 !important',
        color: '#fff !important'
      }
    }
  }
};
