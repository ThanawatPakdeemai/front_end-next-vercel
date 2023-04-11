import { IDropdownGameType } from "@configs/gameType"
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList
} from "@mui/material"
import React from "react"

interface IProp {
  className?: string
  details: IDropdownGameType[]
  setOnTitle?: (_value: IDropdownGameType) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  onChange?: any
}

const SelectDropdownGameType = ({
  className,
  details,
  setOnTitle,
  setExpanded,
  onChange
}: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mb-[6px] mt-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details.map((item, index: number) => (
      <Box
        key={Number(index)}
        className="my-1 uppercase"
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
        <MenuItem
          key={item.title}
          aria-label={item.title}
        >
          <ListItemIcon className="text-center">{item.icon}</ListItemIcon>
          <ListItemText className="ml-2">{item.title}</ListItemText>
        </MenuItem>
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownGameType
