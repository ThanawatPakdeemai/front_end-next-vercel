import React from "react"
import dynamic from "next/dynamic"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
export interface ICategoryIcon {
  id: string
  icon: string | React.ReactElement
}

/**
 * "id" must be the same as the "slug" in database
 */
export const CATEGORY_ICON: ICategoryIcon[] = [
  {
    id: "adventure",
    icon: <Icomoon className="icon-Camp-Fire" />
  },
  {
    id: "action",
    icon: <Icomoon className="icon-Camp-Fire" />
  },
  {
    id: "boardgames",
    icon: <Icomoon className="icon-Chess" />
  },
  {
    id: "card",
    icon: <Icomoon className="icon-Heart-Tablet" />
  },
  {
    id: "casino",
    icon: <Icomoon className="icon-Poker-Chip" />
  },
  {
    id: "dice",
    icon: <Icomoon className="icon-Cube-4" />
  },
  {
    id: "educational",
    icon: <Icomoon className="icon-School" />
  },
  {
    id: "family",
    icon: <Icomoon className="icon-Home" />
  },
  {
    id: "music",
    icon: <Icomoon className="icon-Double-Note" />
  },
  {
    id: "racing",
    icon: <Icomoon className="icon-Motorsports" />
  },
  {
    id: "role-playing",
    icon: <Icomoon className="icon-Film" />
  },
  {
    id: "simulation",
    icon: <Icomoon className="icon-Plus-in-a-box" />
  },
  {
    id: "strategy",
    icon: <Icomoon className="icon-Map" />
  },
  {
    id: "word",
    icon: <Icomoon className="icon-Letter-Check" />
  },
  {
    id: "trivia",
    icon: <Icomoon className="icon-Screen-Text" />
  },
  {
    id: "puzzle",
    icon: <Icomoon className="icon-Ticket" />
  },
  {
    id: "casual",
    icon: <Icomoon className="icon-Macro" />
  },
  {
    id: "fighting",
    icon: <Icomoon className="icon-Axe" />
  },
  {
    id: "others",
    icon: <Icomoon className="icon-Joystick" />
  },
  {
    id: "shooting",
    icon: <Icomoon className="icon-Expand-Rotated" />
  },
  {
    id: "sport",
    icon: <Icomoon className="icon-Basketball" />
  },
  {
    id: "nft",
    icon: <Icomoon className="icon-Diamond" />
  },
  {
    id: "others",
    icon: <Icomoon className="icon-Joystick" />
  }
]
