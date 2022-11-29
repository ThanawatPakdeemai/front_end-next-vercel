export interface IMultichain {
  busd_price: number
  id: string
  naka_amount: number
  naka_price: number
  order_id: string
  order_type: string
  total_price: number
  trusted_order: boolean
  wallet_address: string
  created_at?: Date
  updated_at?: Date
  is_active?: boolean
  chain_name?: string
}
