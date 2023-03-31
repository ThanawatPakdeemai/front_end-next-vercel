import * as React from "react"
import MenuList from "@mui/material/MenuList"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import { MENU_LOGGEDIN, MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import useQuestStore from "@stores/quest"
import MissionComponent from "@feature/quest/components/organisms/MissionComponent"
import { v4 as uuidv4 } from "uuid"
import useGlobal from "@hooks/useGlobal"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"
import MenuLoggedin from "./MenuLoggedin"

const MenuProfile = () => {
  const { open } = useQuestStore()
  const { isMarketplace, onClickLogout } = useGlobal()
  const menuProfile = isMarketplace ? MENU_MARKETPLACE_INVENTORY : MENU_LOGGEDIN

  return (
    <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
      {menuProfile.map((ele) => (
        <MenuLoggedin
          ele={ele}
          key={uuidv4()}
        />
      ))}
      <ButtonToggleIcon
        startIcon={<PlugIcon />}
        text="Logout"
        handleClick={async () => {
          onClickLogout()
        }}
        className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
        type="button"
      />
      <MissionComponent open={open} />
    </MenuList>
  )
}
export default MenuProfile
