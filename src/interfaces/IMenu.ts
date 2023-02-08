import { IGame } from "@feature/game/interfaces/IGameService"
import {
  IGameItem,
  IGameItemListData
} from "@feature/gameItem/interfaces/IGameItemService"
import React, { ReactNode } from "react"
import { ICURRENCY } from "@interfaces/ICurrency"
import {
  IDevice,
  IGameCategory
} from "@feature/dropdown/interfaces/IDropdownService"

interface ILink {
  href: string
}
interface IActiveMunu {
  active?: boolean
}

export interface IMenuBaseItem {
  data?:
    | IGameItem
    | IGame
    | IGameItemListData
    | ICURRENCY
    | IGameItem
    | IGameCategory
    | IDevice
    | Number
}
export interface IMenuBase extends ILink, IMenuBaseItem, IActiveMunu {
  label: string | React.ReactElement
  icon: string | React.ReactElement | ReactNode
}

export interface IDropdown {
  // title: ReactI18NextChild | Iterable<ReactI18NextChild>
  icon: React.ReactNode
  title: string
  className: string
  text: string
  details: IMenuBase[]
}

interface IMenuExtend {
  external: boolean
  isLive?: boolean
  hasToken?: boolean
}

export interface IMenuMain extends IMenuBase, IMenuExtend {
  itemRewardNoti?: number
  id?: string
}

export interface IMenu extends IMenuBase, IMenuExtend {
  id: string
  count?: string | number
}

export interface IMenuInventory extends IMenuBase {}
export interface IMenuSocial extends IMenuBase {}

export interface IMenuIcon extends ILink {
  title: string
  src: string
  alt: string
}

export interface ICrumb extends ILink {
  title: string
  onClick?: () => void
}
