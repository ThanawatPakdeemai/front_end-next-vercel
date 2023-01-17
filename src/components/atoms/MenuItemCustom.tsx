import { IMenu } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"

interface IProp extends IMenu {
  active?: boolean
  endIcon?: boolean
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ active, endIcon, ...props }: IProp) => {
  const router = useRouter()

  return (
    <MenuItem
      key={props.id}
      aria-label={props.id}
      onClick={() => router.push(props.href)}
      sx={{
        color: active ? "#E1E2E2" : null,
        backgroundColor: active ? "#010101" : null
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>{props.label}</ListItemText>
      {endIcon && <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />}
    </MenuItem>
  )
}

export default MenuItemCustom
