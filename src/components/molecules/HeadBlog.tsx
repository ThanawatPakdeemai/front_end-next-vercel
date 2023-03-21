import SearchIcon from "@components/icons/SearchIcon"
import { MENU_BLOG_HEADER } from "@configs/menu"
import { Button, TextField, Typography } from "@mui/material"
import useSearchStore from "@stores/blogFilter"
import useSelectStore from "@stores/selector"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const HeadBlog = ({ children }: { children: React.ReactNode }) => {
  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "15px !important"
  }

  const {
    search: searchBlog,
    setSearch: setSearchBlog,
    clearSearch
  } = useSearchStore()
  const { select: selectHeader, setSelect: setSelectHeader } = useSelectStore()
  const router = useRouter()

  useEffect(() => {
    clearSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return (
    <div className="mx-auto xl:mx-0">
      {/* {selectHeader} */}
      <div className="justify-between max-md:my-[30px] md:flex">
        <div className="mx-auto mb-[30px] flex w-full max-w-xs justify-between gap-1 rounded-2xl bg-neutral-700 p-1 md:mx-0 md:w-[230px]">
          {MENU_BLOG_HEADER.map((item) => (
            <Button
              key={item.name}
              sx={styleButton}
              className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary group h-[50px] w-full !text-black-default ${
                selectHeader === item.link
                  ? "!bg-primary-main"
                  : "!bg-neutral-800"
              } md:mb-0`}
              variant="contained"
              size="large"
              onClick={() => {
                setSelectHeader(item.link)
              }}
            >
              <div className="">{item.icon}</div>
              <Typography className="!font-neue-machina-semi !text-sm">
                {item.name}
              </Typography>
            </Button>
          ))}
        </div>
        <TextField
          value={searchBlog}
          onChange={(event) => {
            let { value } = event.target
            value = value.replace(/[^A-Za-z0-9]/gi, "")
            setSearchBlog(value)
          }}
          className="mx-auto w-full max-w-xs max-md:flex md:mx-0 md:w-[234px] md:px-2"
          placeholder="Search Blog"
          InputProps={{
            style: {
              fontSize: "12px",
              fontFamily: "neueMachina",
              color: "#fff"
            },
            startAdornment: <SearchIcon className="mr-4" />
          }}
        />
      </div>

      <div>{children}</div>
    </div>
  )
}

export default HeadBlog
