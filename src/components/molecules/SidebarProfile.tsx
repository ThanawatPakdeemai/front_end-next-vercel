import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_LOGGEDIN } from "@configs/menu"
import { MenuList } from "@mui/material"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
import { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Balance from "./balance/Balance"
import StatProfile from "./statProfile/StatProfile"

const SidebarProfile = () => {
  const router: NextRouter = useRouter()
  const { profile } = useProfileStore()
  const [profileData, setProfileData] = useState<IProfile>()

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
          return (
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
