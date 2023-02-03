import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameItem } from "@feature/gameItem/interfaces/IGameItemService"
import React from "react"

interface ILink {
  href: string
}
export interface IMenuBaseItem {
  data?: IGameItem | IGame
}
export interface IMenuBase extends ILink, IMenuBaseItem {
  label: string
  icon: string | React.ReactElement
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
export interface ICURENCY {
  id: string
  name: string
  image_icon: string | React.ReactNode
}

export interface ICrumb extends ILink {
  title: string
  onClick?: () => void
}
