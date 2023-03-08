import { IFormatService } from "@interfaces/IHelper"

export interface INFTBuilding {
  NFT_image: string
  NFT_video: string
  createdAt: Date
  current_time: Date
  detail: string
  id: string
  image: string
  is_active: boolean
  level: number
  material_id: string
  model_3d: string
  model_id: number
  name: string
  prefix: number
  prefix_no: number
  type: string
  updatedAt: Date
}

export interface ITypesBuildingServ extends IFormatService {
  data: INFTBuilding[]
}
