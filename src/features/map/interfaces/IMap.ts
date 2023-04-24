import { ReactNode } from "react"

export type ITabMenu = {
  tabValue: string
  tabLabel: ReactNode
  children: ReactNode
  btn?: boolean
}
