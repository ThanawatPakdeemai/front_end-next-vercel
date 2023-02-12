import { ReactNode } from "react"

export interface ITableHeader {
  title?: string
  keyUp?: boolean
  keyDown?: boolean
  onClick?: () => void
  arrowIcon?: boolean // >?< optional จะใส่หรือไม่ใส่ก็ได้ ถ้าไม่ใส่ undefinded
  filterIcon?: boolean
  filterList?: Array<string>
  curFilter?: Array<string>
  onFilter?: (_value: string, _checked: boolean) => void
  child?: ReactNode
  className?: string
}
