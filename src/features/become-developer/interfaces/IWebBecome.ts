import { IFormatService } from "@interfaces/IHelper"

export interface IButtonData {
  text: string
  link: string
}

export interface IList {
  _id: string
  title: string
  sub_title: string
  detail: string
  image_url: string
}

export interface IWebBecomeDevData {
  button_data?: IButtonData
  button: boolean
  is_active: boolean
  list: IList[]
  createdAt: string
  updatedAt: string
  section_name: string
  detail: string
  image_url: string
  id: string
}

export interface IWebBecomeDev extends IFormatService {
  data: IWebBecomeDevData[]
}
