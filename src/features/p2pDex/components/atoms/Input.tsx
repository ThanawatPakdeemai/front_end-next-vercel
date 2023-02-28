import React, { ReactElement, ReactNode } from "react"
import { InputAdornment, TextField } from "@mui/material"
// UseFormReturn FieldValues, UseFormRegister
interface IProp {
  name: string
  endIcon?: ReactNode | ReactElement
  placeholder?: string
  disabled?: boolean
}
const Input = ({
  name,
  endIcon,
  placeholder,
  disabled = false,
  ...dataForm
}: IProp) => {
  const regis = dataForm && {
    ...dataForm["register"](name, { required: true })
  }

  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: "0 10px"
        }
      }}
      {...regis}
      disabled={disabled}
      name={name}
      id={name}
      value={dataForm["watch"](name)}
      variant="outlined"
      className="my-2 w-full"
      placeholder={placeholder || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{endIcon && endIcon}</InputAdornment>
        )
      }}
    />
  )
}
export default Input
