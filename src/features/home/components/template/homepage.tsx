import { Layout } from "@components/template"
import TopPlayer from "@feature/ranking/components/template/topPlayer"
import { Grid } from "@mui/material"
import { memo } from "react"
import Developer from "../molecules/developer"

const Homepage = () => (
  <Layout>
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
  </Layout>
)
export default memo(Homepage)
