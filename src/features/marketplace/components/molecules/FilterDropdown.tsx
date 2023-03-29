import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  INVENTORY_DROPDOWN,
  INVENTORY_DROPDOWN_FORSALE,
  INVENTORY_DROPDOWN_PROCESS
} from "@configs/menu"

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

  return (
    <FormControl>
      <Select
        className="mb-1 flex h-[40px] w-[218px] flex-row justify-between rounded-[13px] border-[1px] border-solid border-neutral-700 !bg-secondary-main !stroke-white-default px-5 !text-[12px] !text-white-default hover:text-white-primary"
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
  )
}

export default FilterDropdown
