export interface BlogTagsPayload {
  limit: number
  skip: number
  sort: string
  search: string
  tags_id: string
}
export interface Info {
  like: number
  shared: number
  view: number
}

export interface CategoryData {
  name: string
  slug: string
  is_active: boolean
  id: string
}

export interface Tag {
  name: string
  slug: string
  is_active: boolean
  id: string
}

export interface IInfo {
  pages: number
  limit: number
  currentCount: number
  totalCount: number
}

export interface IBlogs {
  info: Info
  category_id: string
  _id: string
  title: string
  slug: string
  description: string
  date_released: string
  category_data: CategoryData
  image_list: string
  tags: Tag[]
}

export interface BlogTags {
  status: boolean
  info: IInfo
  data: IBlogs[]
}
