import { Tag } from "./IBlogTagsService"

export interface Blog {
  limit: number
  skip: number
  search: string
  cate: string
  sort: string
}

interface IInfo {
  currentCount: number
  limit: number
  pages: number
  totalCount: number
}

interface ICateData {
  id: string
  is_active: true
  name: string
  slug: string
}

export interface ICategoryDetail extends ICateData {}

export interface ICategoryData extends ICateData {
  createdAt: string
  updatedAt: string
}

interface ICateInfoData {
  like: number
  shared: number
  view: number
}

interface IBlog {
  category_id: string
  date_released: string
  description: string
  image_list: string
  info: ICateInfoData
  slug: string
  title: string
  _id: string
  tags: Tag[]
}

export interface IBlogData extends IBlog {
  category_data: ICateData
}

export interface IBlogDetail extends IBlog {
  category_data: ICategoryDetail[]
  content: string
  createdAt: string
  is_active: boolean
  related: IBlogData[]
  updatedAt: string
}

interface IBlogRes {
  status: boolean
  message: string
}

export interface IBlogDetailResponse extends IBlogRes {
  data: IBlogDetail | undefined
}

export interface ICategoryResponse extends IBlogRes {
  data: ICategoryData[]
}

export interface IBlogResponse {
  status: boolean
  info: IInfo
  data: IBlogData[]
}
