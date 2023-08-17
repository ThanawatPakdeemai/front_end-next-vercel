import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { IMenu } from "@interfaces/IMenu"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
import useQuestStore from "@stores/quest"

const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  ele: IMenu
}

const MenuLoggedin = ({ ele }: IProp) => {
  const { profile } = useProfileStore()
  const [profileData, setProfileData] = useState<IProfile>()
  const { clearQuestStore, setOpen } = useQuestStore()
  const router = useRouter()
  const active = router.asPath.includes(ele.href)
  const isMarketplaceInv = router.asPath.includes("inventory")

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (profile && profile.data) {
        setProfileData(profile.data as IProfile)
      }
    }

    return () => {
      load = true
    }
  }, [profile])

  const activeMarket = router.asPath.split("/")[3] === ele.href.split("/")[3]
  const activeOnlyInventory =
    router.pathname.split("/")[3] === "[type]" &&
    ele.href.split("/").length === 3

  const checkActiveMarketMenu = activeMarket || activeOnlyInventory

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
      active={isMarketplaceInv ? checkActiveMarketMenu : active}
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
      active={isMarketplaceInv ? checkActiveMarketMenu : active}
    />
  )
}

export default MenuLoggedin
