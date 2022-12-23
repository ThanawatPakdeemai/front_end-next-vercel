import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { Grid, TextField } from "@mui/material"
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
      <Grid
        item
        xs={3}
      />
      <Grid
        item
        xs={3}
      >
        <TextField
          placeholder="Search Games..."
          InputProps={{
            startAdornment: <SearchIcon className="mr-4" />
          }}
        />
      </Grid>
    </Grid>
  </div>
)
export default HeadGames
