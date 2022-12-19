import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { MENU_PROFILE } from "@constants/menu"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

const MenuProfile = () => (
  <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
    <MenuItemCustom array={MENU_PROFILE} />
    <ButtonToggleIcon
      startIcon={<PlugIcon />}
      text="Logout"
      handleClick={() => {}}
      className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
    />
  </MenuList>
)

export default MenuProfile
