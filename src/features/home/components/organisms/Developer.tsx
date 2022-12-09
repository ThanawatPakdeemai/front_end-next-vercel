import { Grid } from "@mui/material"
import { memo } from "react"
import DeveloperTitle from "../molecules/DeveloperTitle"
import DeveloperContent from "../molecules/DeveloperContent"

const Developer = () => (
  <Grid
    container
    spacing={2}
  >
    <Grid
      item
      xs={12}
      md={6}
    >
      <DeveloperTitle />
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
    >
      <DeveloperContent />
    </Grid>
  </Grid>
)
export default memo(Developer)
