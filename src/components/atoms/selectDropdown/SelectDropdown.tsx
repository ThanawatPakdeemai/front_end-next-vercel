import * as React from "react"
import MenuList from "@mui/material/MenuList"

import { Box } from "@mui/material"
import {
  IDevice,
  IDropdownAll,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import { IMenuBase } from "@interfaces/IMenu"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ICURRENCY } from "@interfaces/ICurrency"
import { IList } from "@interfaces/ITransaction"
import MenuItemCustom from "../MenuItemCustom"

interface IProp {
  className?: string
  details:
    | IGameCategory[]
    | IGameItem[]
    | IDevice[]
    | IMenuBase[]
    | IGameItemListData[]
    | ICURRENCY[]
    | IList[]
  setOnTitle?: (_value: IDropdownAll) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  icon?: string | React.ReactElement
  onChange?: any
}

const SelectDropdown = ({
  className,
  details,
  setOnTitle,
  setExpanded,
  title,
  icon,
  onChange
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details.map((item, index: number) => (
      <Box
        key={Number(index)}
        className="my-1"
        onClick={() => {
          if (onChange) {
            onChange(item)
          }
          if (setOnTitle) {
            setOnTitle(item)
            if (setExpanded) {
              setExpanded(false)
            }
          }
        }}
      >
        {title === "GameItem" ? (
          <MenuItemCustom
            label={item.price}
            icon={item.icon || icon}
            href={item.href}
            id=""
            external={false}
            active={item.active}
          />
        ) : (
          <MenuItemCustom
            label={"name" in item ? item.name : item.label}
            icon={item.icon || icon}
            href={item.href}
            id=""
            external={false}
            active={item.active}
          />
        )}
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdown
