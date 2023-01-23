import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { IMenuBase } from "@interfaces/IMenu"
import { Box } from "@mui/material"

interface IProp {
  className?: string
  details: IMenuBase[]
  onChange?: (_value) => void
}

const SelectDropdown = ({ className, details, onChange }: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 px-[6px] py-[3px]`}
  >
    {details.map((item: IMenuBase, index: number) => (
      <Box
        key={Number(index)}
        className="my-1"
        onClick={() => {
          if (item && item.data && onChange) onChange(item.data)
        }}
      >
        <MenuItemCustom
          label={item.label}
          icon={item.icon}
          href={item.href}
          id=""
          external={false}
        />
      </Box>
    ))}
  </MenuList>
)

export default SelectDropdown
