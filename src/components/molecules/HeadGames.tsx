import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { Grid, TextField } from "@mui/material"
import useFilterStore from "@stores/blogFilter"
import React from "react"

const HeadGames = ({ children }: { children: React.ReactNode }) => {
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const responsiveStyle =
    "mx-auto lg:mx-0 !w-[300px] md:!w-[265px] lg:!w-[200px] xl:!w-[218px]"
  return (
    <div className="w-[calc(100%)]">
      <Grid
        container
        spacing={2}
        columns={15}
        className="mt-4 mb-10 grid md:mt-[-16px] md:grid-cols-2 lg:flex"
      >
        <Grid
          item
          xs={3}
          className="max-w-full"
        >
          <Dropdown
            title="All Categories"
            className={responsiveStyle}
          />
        </Grid>
        <Grid
          item
          xs={3}
          className="max-w-full"
        >
          <Dropdown
            title="All Game Assets"
            className={responsiveStyle}
          />
        </Grid>
        <Grid
          item
          xs={3}
          className="max-w-full"
        >
          <Dropdown
            title="All Devices"
            className={responsiveStyle}
          />
        </Grid>
        <Grid
          item
          xs={3}
          className="hidden 2xl:block"
        />
        <Grid
          item
          xs={3}
          className="mx-auto max-w-full lg:mx-0"
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
              startAdornment: <SearchIcon className="mr-4 lg:max-xl:mr-2" />
            }}
            className="w-[300px] md:!w-[265px] lg:!w-[164px] xl:!w-[218px]"
          />
        </Grid>
      </Grid>
      {children}
    </div>
  )
}
export default HeadGames
