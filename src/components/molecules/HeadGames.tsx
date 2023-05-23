import Dropdown from "@components/atoms/DropdownCustom"
import SearchIcon from "@components/icons/SearchIcon"
import { isMobile } from "@hooks/useGlobal"
import { Grid, TextField } from "@mui/material"
import useFilterStore from "@stores/blogFilter"
import React from "react"
import { useTranslation } from "react-i18next"

const HeadGames = ({ children }: { children: React.ReactNode }) => {
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { t } = useTranslation()
  const responsiveStyle =
    "mx-auto lg:mx-0 !w-[300px] md:!w-[265px] lg:!w-[200px] xl:!w-[218px]"
  return (
    <div className="w-[calc(100%)]">
      <Grid
        container
        spacing={2}
        columns={15}
        className="mb-[30px] mt-4 grid md:mt-[-16px] md:grid-cols-2 lg:flex"
        sx={{
          padding: 0
        }}
      >
        <Grid
          item
          xs={3}
          className="max-w-full"
        >
          <Dropdown
            title={t("all_categories")}
            className={responsiveStyle}
          />
        </Grid>
        <Grid
          item
          xs={3}
          className="max-w-full"
        >
          <Dropdown
            title={t("all_game_assets")}
            className={responsiveStyle}
          />
        </Grid>
        {!isMobile && (
          <Grid
            item
            xs={3}
            className="max-w-full"
          >
            <Dropdown
              title={t("all_devices")}
              className={responsiveStyle}
            />
          </Grid>
        )}

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
            placeholder={`${t("search_games")}...`}
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
