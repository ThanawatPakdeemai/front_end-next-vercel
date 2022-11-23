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
export interface ICategoryDetail {
  id: string
  is_active: boolean
  name: string
  slug: string
}

export interface ICategoryData {
  createdAt: string
  id: string
  is_active: boolean
  name: string
  slug: string
  updatedAt: string
}
interface ICateInfoData {
  like: number
  shared: number
  view: number
}
export interface IBlogData {
  category_data: ICateData
  category_id: string
  date_released: string
  description: string
  image_list: string
  info: ICateInfoData
  slug: string
  title: string
  _id: string
}

export interface IBlogDetail {
  category_data: ICategoryDetail[]
  category_id: string
  content: string
  createdAt: string
  date_released: string
  description: string
  image_list: string
  info: ICateInfoData
  is_active: boolean
  related: IBlogData[]
  slug: string
  title: string
  updatedAt: string
  _id: string
}
export interface IBlogDetailResponse {
  status: boolean
  message: string
  data: IBlogDetail | undefined
}
export interface IBlogResponse {
  status: boolean
  info: IInfo
  data: IBlogData[]
}

export interface ICategoryResponse {
  status: boolean
  message: string
  data: ICategoryData[]
}
