import {
  Button,
  Collapse,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  INVENTORY_DROPDOWN,
  INVENTORY_DROPDOWN_FORSALE,
  INVENTORY_DROPDOWN_PROCESS,
  INVENTORY_DROPDOWN_RENTAL
} from "@configs/menu"
import SearchIcon from "@components/icons/SearchIcon"
import SettingIconFilter from "@components/icons/Inventory/SettingIconFilter"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import MenuButtonExpandMobile from "@feature/page/marketplace/mobilescreen/MenuButtonExpandMobile"
import FilterBox from "./FilterBox"

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

  const onCloseModalCustom = () => {
    setOpenFilter(!openFilter)
  }

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
      <div className="mb-4 flex gap-4 p-4 sm:hidden">
        <div className="grid h-[40px] w-[50px] content-center justify-center rounded-lg bg-purple-primary p-2">
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
          className="mt-10 w-[200px] rounded-[19px] p-2"
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
        <TextField
          className="w-full"
          placeholder="Search Keyword"
          InputProps={{
            style: {
              fontSize: "14px",
              fontFamily: "neueMachina",
              // width: "100%",
              paddingLeft: 16
            },
            endAdornment: (
              <InputAdornment
                position="end"
                className="cursor-pointer"
                onClick={() => {}}
              >
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={(_event) => {}}
        />
        <div className="!h-[40px] !w-[40px]">
          <Button
            sx={styleButton}
            onClick={() => {
              setOpenFilter(true)
            }}
            className="!h-[40px] !w-[40px] rounded-lg border border-neutral-700 bg-neutral-800 p-2"
          >
            <SettingIconFilter />
          </Button>
        </div>

        <ModalCustom
          open={openFilter}
          onClose={onCloseModalCustom}
          className="m-auto gap-3 rounded-[34px] p-[10px] max-[420px]:w-[370px]"
          width={515}
        >
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-2 uppercase">
              <ModalHeader
                handleClose={onCloseModalCustom}
                title="Filter"
              />
            </div>
            <div className="grid h-[500px] w-full justify-items-center overflow-y-auto">
              <FilterBox />
            </div>
          </Stack>
        </ModalCustom>
      </div>
    </>
  )
}

export default FilterDropdown
