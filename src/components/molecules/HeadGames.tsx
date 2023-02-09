import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { Grid, TextField } from "@mui/material"
import useFilterStore from "@stores/blogFilter"
import React from "react"

const HeadGames = ({ children }: { children: React.ReactNode }) => {
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  return (
    <div className="w-[calc(100%)]">
      <Grid
        container
        spacing={2}
        columns={15}
        className="mb-10"
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
            value={searchBlog}
            onChange={(event) => {
              let { value } = event.target
              value = value.replace(/[^A-Za-z0-9]/gi, "")
              setSearchBlog(value)
            }}
            placeholder="Search Games..."
            InputProps={{
              startAdornment: <SearchIcon className="mr-4" />
            }}
          />
        </Grid>
      </Grid>
      {children}
    </div>
  )
}
export default HeadGames
