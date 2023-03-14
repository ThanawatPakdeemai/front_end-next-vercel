import {
  IGame,
  IGetType,
  TGameType,
  TTypeCode
} from "@feature/game/interfaces/IGameService"
import {
  IInstallData,
  IMarketData,
  IMarketHistory
} from "@feature/marketplace/interfaces/IMarketService"
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

interface INFTInfoData {
  NFT_info: INFTInfo
  marketplaces_data: IMarketData[] | null //
}

interface IArcGameCateg extends IName {
  id: string
}

interface IArcGameCategList extends IId, IName {}

export interface IArcGameData extends IId, IName, INFTInfoData {
  story: string
  play_time: number
  version: string
  developer: string
  category: IArcGameCateg
  category_list: IArcGameCategList[]
  game_type: TGameType
  type_code: TTypeCode
  game_url: string
  game_mode: IGetType
  animation_nft_arcade_game: string
  history: IMarketHistory[]
  image_nft_arcade_game: string
  installments_data: IInstallData[] | null //
}

export interface IArcGameDetail extends IId, IGame, INFTInfoData {
  pdf_url: string
}

export interface IMyArcGameListServ extends IInfoFormatServ {
  data: IArcGameData[]
}

export interface IArcGameDetailServ extends IFormatService {
  data: IArcGameData
}
