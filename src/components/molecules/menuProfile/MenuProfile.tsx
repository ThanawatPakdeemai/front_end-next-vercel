import * as React from "react"
import MenuList from "@mui/material/MenuList"
import { MENU_LOGGEDIN, MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import useQuestStore from "@stores/quest"
import MissionComponent from "@feature/quest/components/organisms/MissionComponent"
import { v4 as uuidv4 } from "uuid"
import useGlobal from "@hooks/useGlobal"
import MenuLoggedin from "./MenuLoggedin"

const MenuProfile = () => {
  const { open } = useQuestStore()
  const { isMarketplace } = useGlobal()
  const menuProfile = isMarketplace ? MENU_MARKETPLACE_INVENTORY : MENU_LOGGEDIN

  return (
    <MenuList className="custom-scroll mx-[6px] mb-[6px] mt-[14px] h-[250px] overflow-y-auto rounded-[13px] bg-neutral-700 p-[6px] 3xl:h-auto">
      {menuProfile.map((ele) => (
        <MenuLoggedin
          ele={ele}
          key={uuidv4()}
        />
      ))}
      <MissionComponent open={open} />
    </MenuList>
  )
}
export default MenuProfile
