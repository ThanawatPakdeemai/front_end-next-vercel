import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { Box } from "@mui/material"
import {
  IDevice,
  IGameCategory,
  IGameItem
} from "@feature/dropdown/interfaces/IDropdownService"

interface IProp {
  className?: string
  details: IGameCategory[] | IGameItem[] | IDevice[]
  setOnTitle?: (_value: IGameCategory | IGameItem | IDevice) => void
  setExpanded?: (_value: boolean) => void
  title?: string
}

const SelectDropdown = ({
  className,
  details,
  setOnTitle,
  setExpanded
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details.map((item: any, index: number) => (
      <Box
        key={Number(index)}
        className="my-1"
        onClick={() => {
          if (setOnTitle && setExpanded) {
            setOnTitle(item)
            setExpanded(false)
          }
        }}
      >
        <MenuItemCustom
          label={item.name}
          icon=""
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
