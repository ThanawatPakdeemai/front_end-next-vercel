import * as React from "react"
import { IDropdown, IMenuBase } from "@interfaces/IMenu"
import InventoryIcon from "@components/icons/MenunIcon/InventoryIcon"
import WishlistIcon from "@components/icons/MenunIcon/WishlistIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import ItemRewardIcon from "@components/icons/MenunIcon/ItemRewardIcon"
import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import PlayHistoryIcon from "@components/icons/MenunIcon/PlayHistoryIcon"
import EditProfileIcon from "@components/icons/MenunIcon/EditProfileIcon"

export const DROPDOWN: IDropdown[] = [
  {
    title: "Dropdown",
    icon: <WishlistIcon />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/", icon: <WishlistIcon /> },
      {
        label: "Play History",
        href: "/",
        icon: <PlayHistoryIcon />
      },
      { label: "Your Mission", href: "/", icon: <YourMissionIcon /> },
      { label: "Inventory", href: "/", icon: <InventoryIcon /> },
      { label: "Item Reward", href: "/", icon: <ItemRewardIcon /> },
      { label: "Support", href: "/", icon: <SupportIcon /> }
    ]
  },
  {
    title: "Test",
    icon: <YourMissionIcon />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/", icon: <WishlistIcon /> }
    ]
  }
]
