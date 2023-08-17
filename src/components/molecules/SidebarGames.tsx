import { MenuList, SxProps, Theme } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import { MENU_GUEST } from "@configs/menu"

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

export const StyledMenuItemCustom: SxProps<Theme> = {
  "&.MuiList-root": {
    background: "#18181C",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    ".MuiMenuItem-root": {
      display: "flex",
      alignItems: "center",
      padding: "10px 10px 9px",
      gap: "16px",
      borderRadius: "8px",
      height: "40px",
      margin: "0",
      background: "transparent",
      transition: "backgroundColor 0.3s ease",
      boxShadow: "none!important",
      "&.Mui-selected": {},
      "&:hover": {
        backgroundColor: "#010101",
        "a .MuiTypography-root": {
          color: "#E1E2E2"
        }
      },
      "a": {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        ".MuiListItemIcon-root": {
          minWidth: "auto"
        },
        ".MuiTypography-root": {
          fontSize: "12px",
          color: "#70727B",
          transition: "color 0.3s ease"
        },
        "&.active": {
          ".MuiTypography-root": {
            color: "#E1E2E2"
          }
        }
      }
    }
  }
}

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
