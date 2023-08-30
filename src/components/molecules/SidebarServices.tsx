import React from "react"
import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import dynamic from "next/dynamic"
import { MENU_SERVICES } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import { StyledMenuItemCustom } from "@styles/themes/partial/components/muiMenuItem"

const MenuItemCustom = dynamic(
  () => import("@components/atoms/MenuItemCustom"),
  {
    suspense: true,
    ssr: false
  }
)

const Balance = dynamic(() => import("./balance/Balance"), {
  suspense: true,
  ssr: false
})

const SidebarStaking = () => {
  const router: NextRouter = useRouter()
  const { profile } = useProfileStore()

  return (
    <div className="hidden w-[200px] flex-col gap-5 lg:flex">
      <MenuList
        sx={StyledMenuItemCustom}
        className="rounded-[13px] bg-neutral-700 p-[6px]"
      >
        {MENU_SERVICES &&
          MENU_SERVICES.map((ele) => {
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
      {profile.data ? (
        <Balance widthBalance="w-[calc(100%-70px)]" />
      ) : undefined}{" "}
    </div>
  )
}

export default SidebarStaking
