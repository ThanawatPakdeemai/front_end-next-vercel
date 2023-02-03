// import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import React from "react"

interface ILink {
  href: string
}
interface IActiveMunu {
  active?: boolean
}
export interface IMenuBaseItem extends IActiveMunu {
  data?: any
}
export interface IMenuBase extends ILink, IMenuBaseItem {
  label: string | React.ReactElement
  icon: string | React.ReactElement
}

export interface IDropdown {
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
