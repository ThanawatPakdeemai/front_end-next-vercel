import React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"

export default function TransTextField() {
  const [page, setPage] = React.useState("")
  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value as string)
  }
  return (
    <Box sx={{ width: "160px", height: "40px" }}>
      <FormControl fullWidth>
        <InputLabel id="fieldLabel">SHOW</InputLabel>
        <Select
          labelId="fieldLabel"
          id="textField"
          value={page}
          label="Page"
          onChange={handleChange}
          className="rounded-sm"
        >
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
