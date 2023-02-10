import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { Box } from "@mui/material"
import {
  IDevice,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"
import { IMenuBase } from "@interfaces/IMenu"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ICURRENCY } from "@interfaces/ICurrency"

interface IOnchange {
  onChange?: (
    _item:
      | IGameItemListData
      | ICURRENCY
      | IGameCategory
      | IGameItem
      | IDevice
      | number
  ) => void
}
interface IProp extends IOnchange {
  className?: string
  details: IMenuBase[] // <= send data format this format IMenuBase
  setExpanded?: (_value: boolean) => void
}

const SelectDropdown = ({
  className,
  details,
  setExpanded,
  onChange
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details &&
      details.map((item: IMenuBase, index: number) => (
        <Box
          key={Number(index)}
          className="my-1"
          onClick={() => {
            if (onChange && item && item.data) {
              onChange(
                item.data as
                  | IGameItemListData
                  | ICURRENCY
                  | IGameCategory
                  | IGameItem
                  | IDevice
              )
            }
            if (setExpanded) {
              setExpanded(false)
            }
          }}
        >
          <MenuItemCustom
            label={item.label}
            icon={item.icon}
            href={item.href}
            id=""
            external={false}
            active={item.active}
          />
        </Box>
      ))}
  </MenuList>
)

export default SelectDropdown
