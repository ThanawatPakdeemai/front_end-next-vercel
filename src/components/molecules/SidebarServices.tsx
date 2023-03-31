import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_SERVICES } from "@configs/menu"
import { MenuList } from "@mui/material"
import { NextRouter, useRouter } from "next/router"
import { useWeb3Provider } from "@providers/Web3Provider"
import Balance from "./balance/Balance"

const SidebarStaking = () => {
  const router: NextRouter = useRouter()
  const { isConnected, address } = useWeb3Provider()

  return (
    <div className="hidden w-[200px] flex-col gap-5 lg:flex">
      <MenuList className="rounded-[13px] bg-neutral-700 p-[6px]">
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
      {address && isConnected && <Balance />}
    </div>
  )
}

export default SidebarStaking
