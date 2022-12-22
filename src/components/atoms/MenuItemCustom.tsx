import { IMenu } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ ...props }: IMenu) => (
  <MenuItem
    key={props.id}
    href={props.href}
    aria-label={props.id}
  >
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText>{props.label}</ListItemText>
  </MenuItem>
)

export default MenuItemCustom
