import React from "react"

interface ILink {
  href: string
}

interface IMenuBase extends ILink {
  label: string
  icon: string | React.ReactElement
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
