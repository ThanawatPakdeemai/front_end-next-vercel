import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import { MENU_PROFILE } from "@constants/menu"
import { Image } from "@components/atoms/image"
import ButtonLink from "@components/atoms/button/ButtonLink"

const MenuProfile = () => (
  <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-neutral-700 p-[6px]">
    {MENU_PROFILE.map((ele) => (
      <MenuItem key={ele.name}>
        <ListItemIcon>
          <Image
            src={ele.icon}
            alt={ele.name}
            width={24}
            height={24}
          />
        </ListItemIcon>
        <ListItemText>{ele.name}</ListItemText>
      </MenuItem>
    ))}
    <ButtonLink
      text="Log out"
      href="/"
      icon={
        <Image
          src="/images/menu/logout.png"
          alt="logout"
          width={24}
          height={24}
        />
      }
      size="medium"
      color="error"
      variant="contained"
      className="button-global my-4 w-full"
      textColor="text-white-default"
      arrowColor="text-white-default"
    />
  </MenuList>
)

export default MenuProfile
