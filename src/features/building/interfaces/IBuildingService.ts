import {
  IMarketForm,
  INFTInitial
} from "@feature/marketplace/interfaces/IMarketService"
import { TLand } from "@feature/land/interfaces/ILandService"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import { IFormatService } from "@interfaces/IHelper"

interface IModel {
  model_id: number
  type: TLand
  level: number
  model_3d: string
}

interface IPrefixNo {
  prefix_no: number
  is_active: boolean
}

export interface IDeteriorate {
  percentage: number
  cost_material_repair: number
  counting_mining_days: number
  cost_prorate_array: number[]
  day_of_mining_start?: number
  day_of_mining_end?: number
  cost_material_repair_per_day?: number
}

export interface IBuildRepair {
  material_type: string
  percent_rate: number
  qty: number
  material_info: ITypeMaterials
}

export interface IBuildDeterio {
  rate_deteriorate: IDeteriorate
  material_repair_array: IBuildRepair[]
}

interface IBuild extends INFTInitial, IModel {
  counting_mining_days: number
  building_id_smartcontract: number
  player_id: string
  owner_id: string
  deteriorate_building: IBuildDeterio
}

export interface IMyBuildData extends IBuild, IMarketForm {
  is_rent: boolean
  wallet_address: string
}

export interface IBuildData extends IBuild, IPrefixNo {
  wallet_adddress: string
}

export interface ITypeBuild
  extends Omit<INFTInitial, "NFT_token">,
    IModel,
    IPrefixNo {
  createdAt: Date
  updatedAt: Date
  current_time: Date
  prefix: number
  material_id: string
  id: string
}

export interface ITypesBuildServ extends IFormatService {
  data: ITypeBuild[]
}

export interface IMyBuildListServ extends IFormatService {
  data: IMyBuildData[]
}
