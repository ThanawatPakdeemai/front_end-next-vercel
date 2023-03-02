export interface IPopularTags {
  _id: string
  count: number
  name: string
  slug: string
}

export interface Info {}

export interface PopularTags {
  status: boolean
  data: IPopularTags[]
  info: Info
}
