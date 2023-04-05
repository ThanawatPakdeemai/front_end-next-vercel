import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { Box, ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { IChainList } from "@configs/chain"

interface IProp {
  className?: string
  details: IChainList[]
  setOnTitle?: (_value: IChainList) => void
  setExpanded?: (_value: boolean) => void
  title?: string
  icon?: string | React.ReactElement
  onChange?: any
}

const SelectDropdownChainList = ({
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
          key={item.chainId}
          aria-label={item.link}
          sx={
            {
              // color: active ? "#E1E2E2" : null,
              // backgroundColor: active ? "#010101" : null
            }
          }
        >
          <ListItemIcon className="text-center">{item.icon}</ListItemIcon>
          <ListItemText className="ml-2">{item.title}</ListItemText>
        </MenuItem>
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdownChainList
