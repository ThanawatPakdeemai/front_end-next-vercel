import * as React from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import { NumericFormat, NumericFormatProps } from "react-number-format"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

interface CustomProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          })
        }}
        decimalScale={4}
        thousandSeparator
        valueIsNumericString
        // prefix="$"
      />
    )
  }
)
NumericFormatCustom.displayName = "NumericFormatCustom"

interface IProps {
  values: string
  onSetValues: (_value: string) => void
}

export default function FormattedInputs({ values, onSetValues }: IProps) {
  // const [values, setValues] = React.useState<State>({
  //   textmask: "(100) 000-0000",
  //   numberformat: "1320"
  // })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value
    // })
    onSetValues(event.target.value)
  }

  return (
    <Box component="div">
      <TextField
        placeholder="E.G. 1,000"
        value={values}
        onChange={handleChange}
        // name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any
        }}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#010101",
            paddingLeft: "10px"
          },
          "input": {
            color: "#E1E2E2 !important"
          }
        }}
      />
    </Box>
  )
}
