import { IMenu } from "@interfaces/IMenu"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import React from "react"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"

interface IProp extends IMenu {
  active?: boolean
  endIcon?: boolean
  icon: string | React.ReactElement
}

/**
 * @description In case use more type please add type in array prop
 */

const MenuItemCustom = ({ active, endIcon, icon, ...props }: IProp) => (
  // const router = useRouter()
  <MenuItem
    key={props.id}
    aria-label={props.id}
    // onClick={() => {
    //   if (props.href && props.href !== "") router.push(props.href)
    // }}
    sx={{
      color: active ? "#E1E2E2" : null,
      backgroundColor: active ? "#010101" : null
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText>{props.label}</ListItemText>
    {endIcon && <ArrowOutwardOutlinedIcon sx={{ height: 14 }} />}
  </MenuItem>
)

export default MenuItemCustom
