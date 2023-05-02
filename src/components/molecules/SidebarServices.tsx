import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_SERVICES } from "@configs/menu"
import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import Balance from "./balance/Balance"
import { StyledMenuItemCustom } from "./SidebarGames"

const SidebarStaking = () => {
  const router: NextRouter = useRouter()

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
      <Balance widthBalance="w-[calc(100%-70px)]" />
    </div>
  )
}

export default SidebarStaking
