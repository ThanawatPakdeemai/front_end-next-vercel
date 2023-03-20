export interface ISeoData {
  createdAt: Date
  updatedAt: Date
  type: string
  id_for_type: string
  meta_title: string
  meta_description: string
  meta_keyword: string
  is_active: boolean
  fav_image: string
  og_image: string
  url: string
  id: string
}
export interface ISeoResponse {
  status: boolean
  data: ISeoData[]
  info?: {}
}

export interface IPath {
  _path: string
}
