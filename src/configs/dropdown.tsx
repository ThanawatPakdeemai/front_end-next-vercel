import * as React from "react"
import { IDropdown } from "@interfaces/IMenu"
import InventoryIcon from "@components/icons/MenunIcon/InventoryIcon"
import WishlistIcon from "@components/icons/MenunIcon/WishlistIcon"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import ItemRewardIcon from "@components/icons/MenunIcon/ItemRewardIcon"
import YourMissionIcon from "@components/icons/MenunIcon/YourMissionIcon"
import PlayHistoryIcon from "@components/icons/MenunIcon/PlayHistoryIcon"
import EditProfileIcon from "@components/icons/MenunIcon/EditProfileIcon"
import AllCategoriesIcon from "@components/icons/AllCategoriesIcon"
import AllGamesIcon from "@components/icons/AllGamesIcon"
import AllDevicesIcon from "@components/icons/AllDevicesIcon"

export const DROPDOWN: IDropdown[] = [
  {
    title: "All Categories",
    icon: <AllCategoriesIcon />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/favourite-games", icon: <WishlistIcon /> },
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
    title: "All Game Assets",
    icon: <AllGamesIcon />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/favourite-games", icon: <WishlistIcon /> }
    ]
  },
  {
    title: "All Devices",
    icon: <AllDevicesIcon />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/favourite-games", icon: <WishlistIcon /> },
      {
        label: "Play History",
        href: "/",
        icon: <PlayHistoryIcon />
      },
      { label: "Your Mission", href: "/", icon: <YourMissionIcon /> },
      { label: "Inventory", href: "/", icon: <InventoryIcon /> }
    ]
  },
  {
    title: "Currently Week",
    icon: null,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "Wishlist", href: "/favourite-games", icon: <WishlistIcon /> }
    ]
  },
  {
    title: "Item Game",
    icon: null,
    className: "w-full",
    text: "string",
    details: [
      {
        label: "1 Item",
        href: "/",
        icon: <EditProfileIcon />
      },
      { label: "1 Item", href: "/", icon: <WishlistIcon /> }
    ]
  }
]
