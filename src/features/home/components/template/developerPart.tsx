import TopPlayer from "@feature/ranking/components/template/topPlayer"
import { Grid } from "@mui/material"
import { memo } from "react"
import Developer from "../organisms/developer"

const developerPart = () => (
  <>
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={8}
      >
        <Developer />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <TopPlayer />
      </Grid>
    </Grid>
  </>
)
export default memo(developerPart)
