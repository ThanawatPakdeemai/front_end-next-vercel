import { IMenuBase } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ ...props }: IMenuBase) => (
  <MenuItem
    key={props.label}
    href={props.href}
    aria-label={props.label}
  >
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText>{props.label}</ListItemText>
  </MenuItem>
)

export default MenuItemCustom
