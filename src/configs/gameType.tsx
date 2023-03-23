import * as React from "react"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined"
import { TGameType } from "@feature/game/interfaces/IGameService"

export interface IDropdownGameType {
  title: TGameType
  icon: React.ReactNode
}

export const DROPDOWN_GAMETYPE: IDropdownGameType[] = [
  {
    title: "singleplayer",
    icon: <PermIdentityOutlinedIcon />
  },
  {
    title: "multiplayer",
    icon: <GroupAddOutlinedIcon />
  },
  {
    title: "storymode",
    icon: <GroupAddOutlinedIcon />
  }
]
