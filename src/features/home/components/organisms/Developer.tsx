import { Grid } from "@mui/material"
import { memo } from "react"
import DeveloperTitle from "../molecules/developerTitle"
import DeveloperContent from "../molecules/developerContent"

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
