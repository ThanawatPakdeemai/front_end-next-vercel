import {
  IGame,
  IGetType,
  TGameType,
  TTypeCode
} from "@feature/game/interfaces/IGameService"
import { IMarketForm } from "@feature/marketplace/interfaces/IMarketService"
import { IFormatService, IInfoFormatServ } from "@interfaces/IHelper"

interface IId {
  _id: string
}

interface IName {
  name: string
}

interface IArcMetaData extends IName {
  description: string
  external_url: string
  image: string
  animation_url: string
}

export interface INFTInfo {
  NFT_token: string
  image_game_ipfs_cid: string
  vdo_game_ipfs_cid: string
  address_owner: string
  owner_id: string
  meta_data: IArcMetaData
  player_id: string
}

export interface INFTInfoData {
  NFT_info: INFTInfo
}

interface IArcGameCateg extends IName {
  id: string
}

interface IArcGameCategList extends IId, IName {}

export interface IArcGame extends IId, IName, INFTInfoData {
  animation_nft_arcade_game: string
  category_list: IArcGameCategList[]
  developer: string
  game_type: TGameType
  game_url: string
  image_nft_arcade_game: string
  play_time: number
  story: string
  version: string
}

export interface IArcGameInfo extends IArcGame {
  is_NFT: string
}

export interface IArcGameData
  extends IArcGame,
    Pick<IMarketForm, "history" | "marketplaces_data" | "installments_data"> {
  category: IArcGameCateg
  type_code: TTypeCode
  game_mode: IGetType
}

export interface IArcGameDetail
  extends IId,
    IGame,
    INFTInfoData,
    Pick<IMarketForm, "marketplaces_data"> {
  pdf_url: string
}

export interface IMyArcGameListServ extends IInfoFormatServ {
  data: IArcGameData[]
}

export interface IArcGameDetailServ extends IFormatService {
  data: IArcGameData
}
