import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_LOGGEDIN } from "@configs/menu"
import { MenuList } from "@mui/material"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
import { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import useQuestStore from "@stores/quest"
import Balance from "./balance/Balance"
import StatProfile from "./statProfile/StatProfile"

const SidebarProfile = () => {
  const router: NextRouter = useRouter()
  const { profile } = useProfileStore()
  const [profileData, setProfileData] = useState<IProfile>()
  const { clearQuestStore, setOpen } = useQuestStore()

  const handleModalMission = () => {
    setOpen()
    clearQuestStore()
  }

  useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
    }
  }, [profile])

  return (
    <div className="flex w-[200px] flex-col gap-5">
      <MenuList className="rounded-[13px] bg-neutral-700 p-[6px]">
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
                ele.id === "your-mission"
                  ? () => handleModalMission()
                  : undefined
              }
              active={active}
            />
          )
        })}
      </MenuList>

      <Balance
        variant="naka"
        token="NAKA"
        sx={{
          minWidth: 200,
          height: "auto"
        }}
      />

      {profileData && (
        <StatProfile
          exp={{
            level: profileData.level,
            expAmount: profileData.exp,
            maxExp: profileData.max_exp
          }}
          energy={{
            staminaPoint: profileData.stamina_point,
            totalStamina: profileData.total_stamina || 20
          }}
          className="flex-col"
          sx={{
            minWidth: 200,
            height: "auto"
          }}
        />
      )}
    </div>
  )
}

export default SidebarProfile
