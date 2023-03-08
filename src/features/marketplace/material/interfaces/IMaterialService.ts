import { IFormatService } from "@interfaces/IHelper"

export interface IMaterials {
  createdAt: Date
  current_time: Date
  detail: string
  id: string
  image: string
  is_active: boolean
  material_id_smartcontract: number
  material_type_id: number
  model_id: number
  name: string
  name_type: string
  type: "material" | "land"
}

export interface ITypesMaterialServ extends IFormatService {
  data: IMaterials[]
}
