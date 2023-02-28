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

export interface IResponseGetFee {
  status: boolean
  data: any
}

export interface IGasLimit {
  type: string
  hex: string
}

export interface IResponseTransaction {
  hash: string
  type: number
  accessList: null
  blockHash: null
  blockNumber: null
  transactionIndex: null
  confirmations: number
  from: string
  gasPrice: IGasLimit
  maxPriorityFeePerGas: IGasLimit
  maxFeePerGas: IGasLimit
  gasLimit: IGasLimit
  to: string
  value: IGasLimit
  nonce: number
  data: string
  r: string
  s: string
  v: number
  creates: null
  chainId: number
}
