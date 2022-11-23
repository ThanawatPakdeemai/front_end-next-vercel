export interface IBuyItems {
  player_id: string
  item_id: string
  qty: number
}

export interface IBuyItemTransectionLog {
  address: string
  topics: string[]
  data: string
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  blockHash: string
  logIndex: number
  removed: boolean
  id: string
}

export interface IBuyItemTransectionResponse {
  blockHash: string
  blockNumber: number
  contractAddress: null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logs: IBuyItemTransectionLog[]
  logsBloom: string
  status: boolean
  to: string
  transactionHash: string
  transactionIndex: number
  type: string
  responseBalanceOf: number
}
