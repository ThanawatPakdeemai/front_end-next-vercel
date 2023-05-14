import {
  IMarketForm,
  INFTInitial,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import { IMaterialData } from "@feature/material/marketplace/interfaces/IMaterialService"
import { IFormatService, IInfoFormatServ } from "@interfaces/IHelper"
import * as THREE from "three"

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
  logo_approved?: boolean
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

interface IMarketData {
  is_active: boolean
  seller_type: "system" | "user"
  _id: string
}

export interface ILandMap {
  image: string
  land_id: string
  logo_in_map: string | null
  marketplaces_data: IMarketData | null
  name: string
  player_id: string
  position: { x: string; y: string }
  qrcode_image: string
  type: string
  wallet_address: string
  _id: string
  color?: THREE.ColorRepresentation | null
}

export interface IAllLand extends IFormatService {
  data: ILandMap[]
}
