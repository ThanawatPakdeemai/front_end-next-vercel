import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { IMenu } from "@interfaces/IMenu"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

interface IProp {
  ele: IMenu
}

const MenuLoggedin = ({ ele }: IProp) => {
  const { profile } = useProfileStore()
  const [profileData, setProfileData] = useState<IProfile>()
  const { clearQuestStore, setOpen } = useQuestStore()
  const router = useRouter()
  const active = router.asPath.includes(ele.href)

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
    }
  }, [profile])

  return ele.href === "/profile" ? (
    <MenuItemCustom
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
      id={ele.id}
      label={ele.label}
      icon={ele.icon}
      href={ele.href === "/mission" ? "" : ele.href}
      external={ele.external}
      onClick={
        ele.id === "your-mission" ? () => handleModalMission() : undefined
      }
      active={active}
    />
  )
}

export default MenuLoggedin
