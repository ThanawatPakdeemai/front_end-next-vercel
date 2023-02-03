import SearchIcon from "@components/icons/SearchIcon"
import { MENU_BLOG_HEADER } from "@configs/menu"
import { Button, TextField, Typography } from "@mui/material"
import useFilterStore from "@stores/blogFilter"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const HeadBlog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "15px !important"
  }

  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-[30px] flex w-[460px] rounded-2xl bg-neutral-700 p-1">
          {MENU_BLOG_HEADER.map((item) => {
            if (!item.isChide) {
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className="m-auto table"
                >
                  <Button
                    sx={styleButton}
                    className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary mb-1 h-[50px] !text-black-default ${
                      router.pathname === item.link
                        ? "!bg-primary-main"
                        : "!bg-neutral-800"
                    } md:mb-0`}
                    variant="contained"
                    size="large"
                  >
                    <div className="hover:bg-grey-default">{item.icon}</div>
                    <Typography className="!font-neue-machina-semi !text-sm">
                      {item.name}
                    </Typography>
                  </Button>
                </Link>
              )
            }
            return (
              <Link
                key={item.name}
                href={item.link}
                className="m-auto table"
              >
                <Button
                  sx={styleButton}
                  className={`button-select-naka xs:mb-1 !hover:bg-error-main !hover:text-white-primary mb-1 h-[50px] !text-black-default ${
                    router.pathname === item.link
                      ? "!bg-primary-main"
                      : "!bg-neutral-800"
                  } md:mb-0`}
                  variant="contained"
                  size="large"
                >
                  {item.icon}
                  <Typography className="!font-neue-machina-semi !text-sm">
                    {item.name}
                  </Typography>
                </Button>
              </Link>
            )
          })}
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
