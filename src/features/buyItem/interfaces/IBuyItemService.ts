export interface IBuyItems {
  _player_id: string
  _item_id: string
  _qty: number
  _tokenAddress?: string
  _symbol?: string
}

interface IBuyItem {
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  blockHash: string
}

export interface IBuyItemTransactionLog extends IBuyItem {
  address: string
  topics: string[]
  data: string
  logIndex: number
  removed: boolean
  id: string
}

export interface IBuyItemTransactionResponse extends IBuyItem {
  contractAddress: null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logs: IBuyItemTransactionLog[]
  logsBloom: string
  status: boolean
  to: string
  type: string
  responseBalanceOf: number
}
