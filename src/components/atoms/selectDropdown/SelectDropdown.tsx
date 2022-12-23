import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { DROPDOWN } from "@configs/dropdown"
import { IDropdown, IMenuBase } from "@interfaces/IMenu"

interface IProp {
  title: string
  className: string
}

const SelectDropdown = ({ title, className }: IProp) => (
  <MenuList
    className={`${className} mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]`}
  >
    {DROPDOWN.map(
      (ele: IDropdown) =>
        ele.title === title &&
        ele.details.map((item: IMenuBase) => (
          <MenuItemCustom
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            id=""
            external={false}
          />
        ))
    )}
  </MenuList>
)
export default SelectDropdown
