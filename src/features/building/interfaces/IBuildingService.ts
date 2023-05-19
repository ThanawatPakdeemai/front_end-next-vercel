import {
  IMarketForm,
  INFTInitial,
  IRentalData
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

interface IBuild extends Omit<INFTInitial, "NFT_token">, IModel {
  NFT_token: string | undefined
  counting_mining_days: number | undefined
  building_id_smartcontract: number | undefined
  player_id: string | undefined
  owner_id: string | undefined
  deteriorate_building: IBuildDeterio | undefined
}

export interface IMyBuildData extends IBuild, IMarketForm {
  key_type?: string
  is_rent: boolean
  wallet_address: string
}

export interface IBuildData extends IBuild, IPrefixNo {
  prefix: number | undefined
  wallet_adddress: string | undefined
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

export interface IMyBuildRentalData extends Omit<IMyBuildData, "rentals_data"> {
  rentals_data: IRentalData | null
}

export interface IMyBuildRentalListServ extends IFormatService {
  data: IMyBuildRentalData[]
}

export interface IMyBuildListServ extends IFormatService {
  data: IMyBuildData[]
}
