import * as React from "react"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import { MENU_PROFILE } from "@constants/menu"
import { Image } from "@components/atoms/image"
import { Button } from "@mui/material"

const MenuProfile = () => (
  <MenuList className="mx-[6px] mt-[14px] mb-[6px] rounded-[13px] bg-grey-900 p-[6px]">
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
    <Button
      className="my-4 flex h-10 w-full items-center justify-center self-center"
      variant="contained"
      color="error"
    >
      <div className="flex">
        <Image
          src="/images/menu/logout.png"
          alt="logout"
          width={24}
          height={24}
        />
        <ListItemText className="ml-[10px] text-sm text-white-default">
          Log out
        </ListItemText>
      </div>
    </Button>
  </MenuList>
)

export default MenuProfile
