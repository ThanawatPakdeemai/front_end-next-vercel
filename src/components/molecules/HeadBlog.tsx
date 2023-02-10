import SearchIcon from "@components/icons/SearchIcon"
import { MENU_BLOG_HEADER } from "@configs/menu"
import { Button, TextField, Typography } from "@mui/material"
import useSearchStore from "@stores/blogFilter"
import useSelectStore from "@stores/selector"
import React from "react"

const HeadBlog = ({ children }: { children: React.ReactNode }) => {
  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "15px !important"
  }

  const { search: searchBlog, setSearch: setSearchBlog } = useSearchStore()
  const { select: selectHeader, setSelect: setSelectHeader } = useSelectStore()

  return (
    <div>
      {/* {selectHeader} */}
      <div className="flex justify-between">
        <div className="mb-[30px] flex w-[230px] justify-between rounded-2xl bg-neutral-700 p-1">
          {MENU_BLOG_HEADER.map((item) => (
            <Button
              key={item.name}
              sx={styleButton}
              className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary group mb-1 h-[50px] !text-black-default ${
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
          className="px-2"
          placeholder="Search Blog"
          InputProps={{
            style: {
              fontSize: "12px",
              fontFamily: "neueMachina",
              width: "218px",
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
