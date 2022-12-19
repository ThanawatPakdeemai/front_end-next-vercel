import { IMenuBase } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"

interface IProp {
  array: IMenuBase[]
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ array }: IProp) => (
  <>
    {array.map((ele) => (
      <MenuItem
        key={ele.label}
        href={ele.href}
        aria-label={ele.label}
      >
        <ListItemIcon>{ele.icon}</ListItemIcon>
        <ListItemText>{ele.label}</ListItemText>
      </MenuItem>
    ))}
  </>
)

export default MenuItemCustom
