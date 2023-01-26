import MenuItemCustom from "@components/atoms/MenuItemCustom"
import Footer from "@components/organisms/Footer"
import Header from "@components/organisms/Header"
import { MENU_PROFILE_Datell } from "@configs/menu"
import { MenuList } from "@mui/material"
import React from "react"
import ButtonToggleIcon from "@src/components/molecules/gameSlide/ButtonToggleIcon"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import StatProfile from "@components/molecules/statProfile/StatProfile"
import Balance from "@components/molecules/balance/Balance"

const ProfiileLayout = ({
  children
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) => {
  const { onReset } = useProfileStore()
  const router = useRouter()
  const profile = useProfileStore((state) => state.profile.data)
  return (
    <div className="main-container mx-auto">
      <Header />
      <div className="flex flex-row gap-3">
        <div>
          <MenuList className="m-auto h-fit w-[200px] rounded-[13px] bg-neutral-800 p-[6px]">
            <div>
              {MENU_PROFILE_Datell.map((ele) => (
                <MenuItemCustom
                  key={ele.id}
                  id={ele.id}
                  label={ele.label}
                  icon={ele.icon}
                  href={ele.href}
                  external={ele.external}
                />
              ))}
            </div>
          </MenuList>
          <div className="mb-2">
            <Balance
              sx={{
                maxWidth: 200,
                minWidth: 200,
                height: "auto"
              }}
            />
          </div>
          <div className="mb-2">
            <StatProfile
              exp={{
                level: profile?.level,
                expAmount: profile?.exp,
                maxExp: profile?.max_exp
              }}
              energy={{
                staminaPoint: profile?.stamina_point,
                totalStamina: profile?.total_stamina
              }}
              sx={{
                maxWidth: 265,
                minWidth: 265,
                height: 70
              }}
              type="col"
            />
          </div>
          <ButtonToggleIcon
            startIcon={<PlugIcon />}
            text="Logout"
            handleClick={() => {
              onReset()
              router.push("/")
            }}
            className="btn-rainbow-theme bg-error-main px-14 text-sm text-white-default"
            type="button"
          />
        </div>
        <div className="mx-6 flex h-full w-[100%] flex-col">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfiileLayout
