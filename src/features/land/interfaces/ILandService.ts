import {
  IMarketForm,
  INFTInitial,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import { IMaterialData } from "@feature/material/marketplace/interfaces/IMaterialService"
import { IFormatService, IInfoFormatServ } from "@interfaces/IHelper"

export type TLand =
  | "copper"
  | "iron"
  | "wood"
  | "gems"
  | "petrol"
  | "coal"
  | "desert"
  | "grassland"
  | "urban_area"

export interface IPosition {
  x: string
  y: string
}

interface ILand extends Omit<INFTInitial, "detail"> {
  details: string
  qrcode_image: string
  land_id: string
  position: IPosition
  logo_approved: boolean
  logo_in_map: null | string
}

export interface ILandData extends ILand {
  type: TNFTType
}

export interface IMarketLandData extends ILand, IMarketForm {
  key_type?: string
  type: TLand
  effect_percent: null
  is_open: boolean
  is_installment: boolean
  continents_name: string
  planets_name: string
  wallet_address: string
  owner_id: string
  player_id: string
  is_rent: boolean
  material_detail: IMaterialData[] | null
}

export interface IMyLandListServ extends IInfoFormatServ {
  data: IMarketLandData[]
}

export interface ILandServ extends IFormatService {
  data: IMarketLandData
}

export interface IRedeemServ extends IInfoFormatServ {
  data: string
}
