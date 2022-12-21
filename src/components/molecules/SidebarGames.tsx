import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_GAMES } from "@constants/menu"
import { PROFILE_MOCKUP } from "@constants/profileMockup"
import { MenuList } from "@mui/material"
import React from "react"
import Balance from "./balance/Balance"
import StatProfile from "./statProfile/StatProfile"

const SidebarGames = () => (
  <div className="flex w-[200px] flex-col gap-5">
    <MenuList className="rounded-[13px] bg-neutral-700 p-[6px]">
      {MENU_GAMES.map((ele) => (
        <MenuItemCustom
          key={ele.label}
          label={ele.label}
          icon={ele.icon}
          href={ele.href}
        />
      ))}
    </MenuList>

    <Balance
      variant="naka"
      token="NAKA"
      sx={{
        minWidth: 200,
        height: "auto"
      }}
    />

    <StatProfile
      exp={{
        level: PROFILE_MOCKUP.level,
        expAmount: PROFILE_MOCKUP.exp,
        maxExp: PROFILE_MOCKUP.max_exp
      }}
      energy={{
        staminaPoint: PROFILE_MOCKUP.stamina_point,
        totalStamina: PROFILE_MOCKUP.total_stamina
      }}
      className="flex-col"
      sx={{
        minWidth: 200,
        height: "auto"
      }}
    />
  </div>
)

export default SidebarGames
