import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_GUEST } from "@configs/menu"
import { PROFILE_MOCKUP } from "@constants/profileMockup"
import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import Balance from "./balance/Balance"
import StatProfile from "./statProfile/StatProfile"

const SidebarGames = () => {
  const router: NextRouter = useRouter()
  return (
    <div className="mx-auto flex w-[300px] flex-col gap-5 md:mx-0 md:w-[200px]">
      <MenuList className="rounded-[13px] bg-neutral-700 p-[6px]">
        {MENU_GUEST.map((ele) => {
          const active = router.asPath.includes(ele.href)
          return (
            <MenuItemCustom
              key={ele.id}
              id={ele.id}
              label={ele.label}
              icon={ele.icon}
              href={ele.href}
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
}

export default SidebarGames
