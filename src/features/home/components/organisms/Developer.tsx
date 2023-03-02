import { Grid } from "@mui/material"
import { memo } from "react"
import DeveloperContent from "@feature/home/components/molecules/DeveloperContent"
import DeveloperTitle from "@feature/home/components/molecules/DeveloperTitle"

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
      className="hidden lg:block"
    >
      <DeveloperContent />
    </Grid>
  </Grid>
)
export default memo(Developer)
