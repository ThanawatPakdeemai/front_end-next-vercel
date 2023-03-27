import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_GUEST } from "@configs/menu"
// import { PROFILE_MOCKUP } from "@constants/profileMockup"
import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import useProfileStore from "@stores/profileStore"
import Balance from "./balance/Balance"
import StatProfile from "./statProfile/StatProfile"

const SidebarGames = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const router: NextRouter = useRouter()
  return (
    <div className="mx-auto w-full max-w-xs gap-5 md:mx-0 md:flex md:w-[200px] md:flex-col">
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
      {profile && (
        <>
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
              level: profile.level,
              expAmount: profile.exp,
              maxExp: profile.max_exp
            }}
            energy={{
              staminaPoint: profile.stamina_point,
              totalStamina: profile.total_stamina
            }}
            className="flex-col"
            sx={{
              minWidth: 200,
              height: "auto"
            }}
          />
        </>
      )}
    </div>
  )
}

export default SidebarGames
