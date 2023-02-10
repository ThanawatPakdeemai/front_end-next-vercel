import * as React from "react"
import MenuList from "@mui/material/MenuList"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"

import { MENU_LOGGEDIN } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { IProfile } from "@src/types/profile"
import useQuestStore from "@stores/quest"
import MissionComponent from "@feature/quest/components/organisms/MissionComponent"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

const MenuProfile = () => {
  const { profile, onReset } = useProfileStore()
  const { clearQuestStore, setOpen, open } = useQuestStore()
  const router = useRouter()
  const [profileData, setProfileData] = React.useState<IProfile>()

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  React.useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
    }
  }, [profile])

  return (
    <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
      {MENU_LOGGEDIN.map((ele) => {
        const active = router.asPath.includes(ele.href)
        return ele.href === "/profile" ? (
          <MenuItemCustom
            key={ele.id}
            id={ele.id}
            label={ele.label}
            icon={ele.icon}
            href={`/profile/${profileData && profileData.id}`}
            external={ele.external}
            onClick={() => {
              router.push(`/profile/${profileData && profileData.id}`)
            }}
            active={active}
          />
        ) : (
          <MenuItemCustom
            key={ele.id}
            id={ele.id}
            label={ele.label}
            icon={ele.icon}
            href={ele.href}
            external={ele.external}
            onClick={
              ele.id === "your-mission" ? () => handleModalMission() : undefined
            }
            active={active}
          />
        )
      })}
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
      <MissionComponent open={open} />
    </MenuList>
  )
}
export default MenuProfile
