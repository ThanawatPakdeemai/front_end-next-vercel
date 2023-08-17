import { Grid, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import useFilterStore from "@stores/blogFilter"
import { isMobile } from "@hooks/useGlobal"
import { commonPattern } from "@constants/regex"

const Dropdown = dynamic(() => import("@components/atoms/DropdownCustom"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const HeadGames = ({ children }: { children: React.ReactNode }) => {
  const { setSearch: setSearchBlog } = useFilterStore()
  const [searchVal, setSearchVal] = useState<string>("")
  const { t } = useTranslation()
  const responsiveStyle =
    "mx-auto lg:mx-0 !w-[300px] md:!w-[265px] lg:!w-[200px] xl:!w-[218px]"

  useEffect(() => {
    const deboucer = setTimeout(() => {
      setSearchBlog(searchVal)
    }, 1000)

    return () => clearTimeout(deboucer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal])

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
          className="max-w-full"
        >
          <Dropdown
            title="All Game Types"
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
            value={searchVal}
            onChange={(event) => {
              let { value } = event.target
              value = value.replace(commonPattern, "")
              setSearchVal(value)
            }}
            placeholder={`${t("search_games")}...`}
            InputProps={{
              startAdornment: <Icomoon className="icon-Search mr-4" />
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
