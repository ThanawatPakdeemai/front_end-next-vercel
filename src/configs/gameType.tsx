import * as React from "react"
import AllCategoriesIcon from "@components/icons/AllCategoriesIcon"
import AllGamesIcon from "@components/icons/AllGamesIcon"

export interface IDropdownGameType {
  id: string
  title: string
  icon: React.ReactNode
}

export const DROPDOWN_GAMETYPE: IDropdownGameType[] = [
  {
    id: "singleplayer",
    title: "Singleplayer",
    icon: <AllGamesIcon />
  },
  {
    id: "multiplayer",
    title: "Multiplayer",
    icon: <AllCategoriesIcon />
  }
]
