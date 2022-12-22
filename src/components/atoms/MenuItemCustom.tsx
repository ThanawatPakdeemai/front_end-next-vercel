import { IMenu } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"

interface IProp extends IMenu {
  active?: boolean
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ active, ...props }: IProp) => (
  <MenuItem
    key={props.id}
    href={props.href}
    aria-label={props.id}
    sx={{
      backgroundColor: active ? "#010101" : null
    }}
  >
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText>{props.label}</ListItemText>
  </MenuItem>
)

export default MenuItemCustom
