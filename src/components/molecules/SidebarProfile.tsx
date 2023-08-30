import { MENU_LOGGEDIN } from "@configs/menu"
import { MenuList } from "@mui/material"
import { IProfile } from "@src/types/profile"
import useProfileStore from "@stores/profileStore"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { StyledMenuItemCustom } from "@styles/themes/partial/components/muiMenuItem"

const Balance = dynamic(() => import("./balance/Balance"), {
  suspense: true,
  ssr: true
})

const ButtonGold = dynamic(() => import("@components/atoms/gold/ButtonGold"), {
  suspense: true,
  ssr: true
})

const MenuLoggedin = dynamic(
  () => import("@components/molecules/menuProfile/MenuLoggedin"),
  {
    suspense: true,
    ssr: true
  }
)

const StatProfile = dynamic(
  () => import("@components/molecules/statProfile/StatProfile"),
  {
    suspense: true,
    ssr: true
  }
)

const SidebarProfile = () => {
  const { profile } = useProfileStore()
  const [profileData, setProfileData] = useState<IProfile>()
  const router = useRouter()
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

  return (
    <div className="mx-auto w-full max-w-xs gap-5 md:mx-0 md:flex md:w-[200px] md:flex-col">
      <MenuList
        sx={StyledMenuItemCustom}
        className="rounded-[13px] bg-neutral-700 p-[6px]"
      >
        {MENU_LOGGEDIN.map((ele) => (
          <MenuLoggedin
            ele={ele}
            key={uuidv4()}
          />
        ))}
      </MenuList>
      <ButtonGold
        onClick={() => router.push("/gold-transfer")}
        text="Get ”NAKA” Gold"
        showIcon
      />
      <Balance />

      {profileData && (
        <StatProfile
          exp={{
            level: profileData?.level,
            expAmount: profileData?.exp,
            maxExp: profileData?.max_exp
          }}
          energy={{
            staminaPoint: profileData?.stamina_point,
            totalStamina: profileData?.total_stamina || 20
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
