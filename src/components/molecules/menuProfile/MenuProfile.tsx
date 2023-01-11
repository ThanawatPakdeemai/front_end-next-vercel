import * as React from "react"
import MenuList from "@mui/material/MenuList"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import MenuItemCustom from "@components/atoms/MenuItemCustom"
import { MENU_LOGGEDIN } from "@configs/menu"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

const MenuProfile = () => {
  const { onReset } = useProfileStore()
  const router = useRouter()

  return (
    <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
      {MENU_LOGGEDIN.map((ele) => (
        <MenuItemCustom
          key={ele.id}
          id={ele.id}
          label={ele.label}
          icon={ele.icon}
          href={ele.href}
          external={ele.external}
        />
      ))}
      <ButtonToggleIcon
        startIcon={<PlugIcon />}
        text="Logout"
        handleClick={() => {
          onReset()
          router.push("/")
        }}
        className="btn-rainbow-theme my-4 bg-error-main px-14 text-sm text-white-default"
      />
    </MenuList>
  )
}
export default MenuProfile
