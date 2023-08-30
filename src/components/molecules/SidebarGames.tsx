import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import { MENU_GUEST } from "@configs/menu"
import { StyledMenuItemCustom } from "@styles/themes/partial/components/muiMenuItem"

const Balance = dynamic(() => import("./balance/Balance"), {
  suspense: true,
  ssr: false
})
const StatProfile = dynamic(() => import("./statProfile/StatProfile"), {
  suspense: true,
  ssr: false
})
const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)

const SidebarGames = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const router: NextRouter = useRouter()

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-[10px] md:mx-0 md:w-[200px]">
      <MenuList
        className="flex flex-col gap-[5px] rounded-[13px]"
        sx={StyledMenuItemCustom}
      >
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
          <Balance />

          <StatProfile
            exp={{
              level: profile?.level ?? 0,
              expAmount: profile?.exp,
              maxExp: profile?.max_exp
            }}
            energy={{
              staminaPoint: profile?.stamina_point,
              totalStamina: profile?.total_stamina
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
