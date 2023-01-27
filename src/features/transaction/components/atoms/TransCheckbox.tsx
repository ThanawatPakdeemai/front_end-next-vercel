import * as React from "react"
import Box from "@mui/material/Box"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

const TransCheckbox = () => {
  const [state, setState] = React.useState({
    deposit: true,
    withdraw: true
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const { deposit, withdraw } = state

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        variant="standard"
      >
        <FormLabel component="legend">Select type</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={deposit}
                onChange={handleChange}
                name="deposit"
              />
            }
            label="Deposit"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={withdraw}
                onChange={handleChange}
                name="withdraw"
              />
            }
            label="Withdraw"
          />
        </FormGroup>
      </FormControl>
    </Box>
  )
}

export default TransCheckbox
