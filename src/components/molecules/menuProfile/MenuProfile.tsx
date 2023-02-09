import * as React from "react"
import MenuList from "@mui/material/MenuList"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_LOGGEDIN } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { IProfile } from "@src/types/profile"
import useQuestStore from "@stores/quest"
import MissionComponent from "@feature/quest/components/organisms/MissionComponent"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

const MenuProfile = () => {
  const { profile, onReset } = useProfileStore()
  const { clearQuestStore } = useQuestStore()
  const router = useRouter()
  const [profileData, setProfileData] = React.useState<IProfile>()
  // NOTE: don't forget to change to false
  const [open, setOpen] = React.useState<boolean>(true)

  const handleModalMission = () => {
    setOpen(!open)
    clearQuestStore()
  }

  React.useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
    }
  }, [profile])

  return (
    <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
      {MENU_LOGGEDIN.map((ele) => (
        <MenuItemCustom
          key={ele.id}
          id={ele.id}
          label={ele.label}
          icon={ele.icon}
          href={
            ele.href === "/profile"
              ? `/profile/${profileData && profileData.id}`
              : ele.href
          }
          external={ele.external}
          onClick={
            ele.id === "your-mission" ? () => handleModalMission() : undefined
          }
        />
      ))}
      <ButtonToggleIcon
        startIcon={<PlugIcon />}
        text="Logout"
        handleClick={() => {
          onReset()
          router.push("/")
        }}
        className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
        type="button"
      />
      <MissionComponent
        open={open}
        handle={handleModalMission}
      />
    </MenuList>
  )
}
export default MenuProfile
