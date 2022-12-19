import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import { MENU_PROFILE } from "@constants/menu"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

const MenuProfile = () => (
  <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
    {MENU_PROFILE.map((ele) => (
      <MenuItem key={ele.name}>
        <ListItemIcon>{ele.icon}</ListItemIcon>
        <ListItemText>{ele.name}</ListItemText>
      </MenuItem>
    ))}
    <ButtonToggleIcon
      startIcon={<PlugIcon />}
      text="Logout"
      handleClick={() => {}}
      className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
    />
  </MenuList>
)

export default MenuProfile
