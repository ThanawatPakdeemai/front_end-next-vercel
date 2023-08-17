import * as React from "react"
import dynamic from "next/dynamic"
import { IDropdown } from "@interfaces/IMenu"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

export const DROPDOWN: IDropdown[] = [
  {
    title: "All Categories",
    icon: <Icomoon className="icon-Grid-02" />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <Icomoon className="icon-User-Pass" />
      },
      {
        label: "Wishlist",
        href: "/favourite-games",
        icon: <Icomoon className="icon-Heart" />
      },
      {
        label: "Play History",
        href: "/",
        icon: <Icomoon className="icon-Clock" />
      },
      {
        label: "Your Mission",
        href: "/",
        icon: <Icomoon className="icon-Camp-Fire" />
      },
      {
        label: "Inventory",
        href: "/",
        icon: <Icomoon className="icon-Box-Download" />
      },
      {
        label: "Item Reward",
        href: "/",
        icon: <Icomoon className="icon-Diamond" />
      },
      {
        label: "Support",
        href: "/",
        icon: <Icomoon className="icon-Headset" />
      }
    ]
  },
  {
    title: "All Game Assets",
    icon: <Icomoon className="icon-Grid-02" />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <Icomoon className="icon-User-Pass" />
      },
      {
        label: "Wishlist",
        href: "/favourite-games",
        icon: <Icomoon className="icon-Heart" />
      }
    ]
  },
  {
    title: "All Devices",
    icon: <Icomoon className="icon-Laptop-and-Phone" />,
    className: "w-[200px]",
    text: "string",
    details: [
      {
        label: "Edit Profile",
        href: "/",
        icon: <Icomoon className="icon-User-Pass" />
      },
      {
        label: "Wishlist",
        href: "/favourite-games",
        icon: <Icomoon className="icon-Heart" />
      },
      {
        label: "Play History",
        href: "/",
        icon: <Icomoon className="icon-Clock" />
      },
      {
        label: "Your Mission",
        href: "/",
        icon: <Icomoon className="icon-Camp-Fire" />
      },
      {
        label: "Inventory",
        href: "/",
        icon: <Icomoon className="icon-Box-Download" />
      }
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
        icon: <Icomoon className="icon-User-Pass" />
      },
      {
        label: "Wishlist",
        href: "/favourite-games",
        icon: <Icomoon className="icon-Heart" />
      }
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
        icon: <Icomoon className="icon-User-Pass" />
      },
      { label: "1 Item", href: "/", icon: <Icomoon className="icon-Heart" /> }
    ]
  }
]
