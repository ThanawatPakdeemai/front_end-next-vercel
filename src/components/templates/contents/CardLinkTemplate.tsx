import { Grid } from "@mui/material"
import React, { ReactNode } from "react"

const CardLinkTemplate = ({ children }: { children: ReactNode }) => (
  <Grid
    item
    xs={12}
    sm={12}
    md={4}
    className="flex-[1_1_100%] sm:flex-auto"
  >
    {children}
  </Grid>
)

export default CardLinkTemplate
