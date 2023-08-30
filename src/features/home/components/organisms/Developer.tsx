import { Grid } from "@mui/material"
import dynamic from "next/dynamic"
import { memo } from "react"

const DeveloperContent = dynamic(
  () => import("@feature/home/components/molecules/DeveloperContent"),
  {
    suspense: true,
    ssr: false
  }
)

const DeveloperTitle = dynamic(
  () => import("@feature/home/components/molecules/DeveloperTitle"),
  {
    suspense: true,
    ssr: false
  }
)

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
