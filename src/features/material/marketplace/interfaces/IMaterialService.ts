import { TLand } from "@feature/land/interfaces/ILandService"
import { IFormatService } from "@interfaces/IHelper"

export type TMaterial =
  | "copper_ore"
  | "iron_ore"
  | "wood_log"
  | "raw_gems"
  | "petroleum"
  | "coal_ore"
  | "copper"
  | "iron"
  | "wood"
  | "gems"
  | "petrol"
  | "coal"

export type TMaterialType = "material" | "land"

interface IId {
  _id: string
}

interface IMaterialInit {
  image: string
  name: string
  detail: string
  material_id_smartcontract: number
}

interface IMaterialDetail extends IMaterialInit {
  material_type_id: number
  is_active: boolean
  model_id: number
  type: TMaterialType
}

export interface IMaterialInfo extends IMaterialInit, IId {
  name_type: TMaterial
}

export interface ITypeMaterials extends IMaterialDetail {
  createdAt: Date
  current_time: Date
  id: string
  name_type: TMaterial & TLand
}

export interface IMaterialData extends IMaterialDetail, IId {
  material_id: string
  qty: number
  flag: number
  name_type: TMaterial
}

export interface ITypesMaterialServ extends IFormatService {
  data: ITypeMaterials[]
}
