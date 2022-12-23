import Dropdown from "@components/atoms/DropdownCustom"
import { Grid } from "@mui/material"
import React from "react"

const HeadGames = () => (
  <div className="w-[calc(100%)]">
    <Grid
      container
      spacing={2}
      columns={15}
    >
      <Grid
        item
        xs={3}
      >
        <Dropdown
          title="All Categories"
          className=""
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Dropdown
          title="All Game Assets"
          className=""
        />
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Dropdown
          title="All Devices"
          className=""
        />
      </Grid>
    </Grid>
  </div>
)
export default HeadGames
