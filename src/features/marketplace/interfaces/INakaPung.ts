export interface MetaData {
  item_id: string
  name: string
  description: string
  NFT_token: string
  image: string
}

export interface Data {
  token_address: string
  token_name: string
  createdAt: string
  updatedAt: string
  current_time: string
  player_id: string
  player_wallet_address: string
  date_time: string
  amount: number
  fee: number
  type: string
  transaction_hash: string
  item_qty: number
  item_price: number
  meta_data: MetaData[]
  id: string
}

export interface Info {}

export interface INakaPang {
  status: boolean
  data: Data
  info: Info
}
