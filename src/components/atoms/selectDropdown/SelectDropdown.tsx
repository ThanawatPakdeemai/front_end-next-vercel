import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { IMenuBase } from "@interfaces/IMenu"

interface IProp {
  className: string
  details: IMenuBase[]
}

const SelectDropdown = ({ className, details }: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]`}
  >
    {details.map((item: IMenuBase) => (
      <MenuItemCustom
        key={item.label}
        label={item.label}
        icon={item.icon}
        href={item.href}
        id=""
        external={false}
      />
    ))}
  </MenuList>
)

export default SelectDropdown
