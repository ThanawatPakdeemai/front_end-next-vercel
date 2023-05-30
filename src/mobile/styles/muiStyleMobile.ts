import { SxProps, Theme } from "@mui/material"

export const StyledInput: SxProps<Theme> = {
  fontFamily: "Urbanist",
  fontSize: "16px",
  color: "#fff",
  fontWeight: 600,
  opacity: 1
}

export const StyledSearchInputMobile: SxProps<Theme> = {
  background: "rgba(242, 201, 76, 0.08)",
  border: "1px solid #F2C94C",
  borderRadius: "16px",
  maxWidth: "100%",
  minWidth: "100%",
  width: "100%",
  height: "56px",
  justifyContent: "center",
  ...StyledInput,
  input: {
    ...StyledInput
  },
  "input::placeholder": {
    ...StyledInput
  },
  ".MuiOutlinedInput-root": {
    height: "auto",
    borderRadius: "inherit",
    background: "transparent",
    border: 0,
    gap: "10px",
    "&:hover": {
      border: 0
    }
  }
}
