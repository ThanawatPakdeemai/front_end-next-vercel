import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Select, SelectChangeEvent } from "@mui/material"
import {
  INVENTORY_DROPDOWN,
  INVENTORY_DROPDOWN_FORSALE,
  INVENTORY_DROPDOWN_PROCESS,
  INVENTORY_DROPDOWN_RENTAL
} from "@configs/menu"
import useMarketFilterStore from "@stores/marketFilter"

const Button = dynamic(() => import("@mui/material/Button"), {
  suspense: true,
  ssr: false
})
const Collapse = dynamic(() => import("@mui/material/Collapse"), {
  suspense: true,
  ssr: false
})
const FormControl = dynamic(() => import("@mui/material/FormControl"), {
  suspense: true,
  ssr: false
})
const MenuItem = dynamic(() => import("@mui/material/MenuItem"), {
  suspense: true,
  ssr: false
})
const MenuButtonExpandMobile = dynamic(
  () => import("@feature/page/marketplace/mobilescreen/MenuButtonExpandMobile"),
  {
    suspense: true,
    ssr: false
  }
)
const FilterSearchBox = dynamic(() => import("./FilterSearchBox"), {
  suspense: true,
  ssr: false
})
const SwipeableEdgeDrawer = dynamic(
  () => import("../organisms/DrawerMobileFilter"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const FilterDropdown = () => {
  const router = useRouter()
  const [value, setValue] = useState<string>("Land")

  const ddList = () => {
    if (router.pathname.includes("forsale")) {
      return INVENTORY_DROPDOWN_FORSALE
    }
    if (router.pathname.includes("process")) {
      return INVENTORY_DROPDOWN_PROCESS
    }
    if (router.pathname.includes("rental")) {
      return INVENTORY_DROPDOWN_RENTAL
    }
    return INVENTORY_DROPDOWN
  }

  useEffect(() => {
    let load = false

    if (!load) {
      const checkRoute = ddList().find((_val) =>
        _val.href.includes(router.asPath.split("/").pop() as string)
      )
      if (checkRoute) {
        setValue(checkRoute.label)
      }
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  // const isP2P = router.asPath.includes("p2p")
  // eslint-disable-next-line no-unused-vars
  const [searchReset, setSearchReset] = useState<boolean>(false)

  const { onSetSearch } = useMarketFilterStore()

  const handleOnExpandClick = () => {
    setExpanded(!expanded)
  }

  const styleButton = {
    minWidth: "10px !important",
    borderRadius: "8px !important",
    "&:hover": {
      boxShadow: "none !important",
      "svg rect": {
        fill: "#E1E2E2 !important"
      }
    }
  }

  return (
    <>
      <FormControl>
        <Select
          className="mb-1 flex hidden h-[40px] w-[218px] flex-row justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 !bg-secondary-main !stroke-white-default px-5 !text-[12px] !text-white-default hover:text-white-primary sm:flex"
          // defaultValue={ro}
          value={value}
          onChange={handleChange}
          MenuProps={{
            onClick: (e) => {
              e.preventDefault()
            }
          }}
        >
          {ddList().map((data) => {
            const active = router.pathname.includes(data.href)
            return (
              <MenuItem
                key={uuidv4()}
                value={data.label}
                onClick={() => router.push(data.href)}
                sx={{
                  color: active ? "#E1E2E2" : null,
                  backgroundColor: active ? "#010101" : null
                }}
              >
                {/* <ListItemIcon>{data.label}</ListItemIcon> */}
                {data.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <div className="mb-4 flex	 p-4 sm:hidden">
        <div className="grid h-[40px] w-[40px] content-center justify-center rounded-lg bg-purple-primary p-2">
          <MenuButtonExpandMobile
            isOpen={expanded}
            onClick={handleOnExpandClick}
            strokeWidth="2"
            color="#F1F4F4"
            transition={{
              ease: "easeOut",
              duration: 0.2,
              stiffness: 10,
              bounce: 5
            }}
            width="20"
            height="10"
          />
        </div>
        <Collapse
          in={expanded}
          timeout="auto"
          className="!mt-[48px] w-[200px] rounded-[19px] p-2"
          sx={{
            backgroundColor: "#232329",
            zIndex: 99999,
            position: "absolute",
            width: "218px"
          }}
        >
          {ddList().map((data) => {
            const active = router.pathname.includes(data.href)
            return (
              <MenuItem
                key={uuidv4()}
                value={data.label}
                onClick={() => router.push(data.href)}
                sx={{
                  color: active ? "#E1E2E2" : null,
                  backgroundColor: active ? "#010101" : null
                }}
              >
                {/* <ListItemIcon>{data.label}</ListItemIcon> */}
                {data.label}
              </MenuItem>
            )
          })}
        </Collapse>
        <FilterSearchBox
          className="!px-5"
          title=""
          placeholder="e.g. 11900011"
          onClick={(_value) => {
            onSetSearch({ key: "nft_token", value: _value })
          }}
          onKey={(event, _value) => {
            if (event.key === "Enter") {
              event.preventDefault()
              onSetSearch({
                key: "nft_token",
                value: _value
              })
            }
          }}
          reset={searchReset}
        />
        <div className="!h-[40px] !w-[40px]">
          <Button
            sx={styleButton}
            onClick={() => {
              setOpenFilter(true)
            }}
            className="!h-[40px] !w-[40px] rounded-lg border border-neutral-700 bg-neutral-800 p-2"
          >
            <Icomoon className="icon-Filters-Horizontal text-white-default" />
          </Button>
        </div>
        <SwipeableEdgeDrawer
          open={openFilter}
          setClose={(_toggle) => setOpenFilter(_toggle)}
        />
      </div>
    </>
  )
}

export default FilterDropdown
