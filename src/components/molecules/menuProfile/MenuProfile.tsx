import * as React from "react"
import MenuList from "@mui/material/MenuList"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import { MENU_LOGGEDIN, MENU_MARKETPLACE_INVENTORY } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import useQuestStore from "@stores/quest"
import MissionComponent from "@feature/quest/components/organisms/MissionComponent"
import { v4 as uuidv4 } from "uuid"
import useGlobal from "@hooks/useGlobal"
import useGameStore from "@stores/game"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"
import MenuLoggedin from "./MenuLoggedin"

const MenuProfile = () => {
  const { onReset } = useProfileStore()
  const { onSetGameItemSelectd, setQtyItemOfRoom } = useGameStore()
  const { open } = useQuestStore()
  const router = useRouter()
  const { isMarketplace } = useGlobal()
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
          onSetGameItemSelectd({} as IGameItemListData)
          setQtyItemOfRoom(0)
          await onReset()
          await router.push("/")
        }}
        className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
        type="button"
      />
      <MissionComponent open={open} />
    </MenuList>
  )
}
export default MenuProfile
