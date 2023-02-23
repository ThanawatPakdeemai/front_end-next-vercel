/* eslint-disable no-unused-vars */
export interface ITransactionState {
  // eslint-disable-next-line no-use-before-define
  all: any[] // ITransaction[]
  type: string
}
export interface ITransactionPlayload {
  // eslint-disable-next-line no-use-before-define
  data: any[] // ITransaction[]
  // eslint-disable-next-line no-use-before-define
  info: any // ITransactionInfo
}
export interface ITransaction {
  user_id: string
  date_time: string
  amount: number
  fee: number
  type: string
  transaction_hash: string
}
export interface ITransactionInfo {
  currentCount: number
  limit: number
  pages: number
  totalCount: number
}

export interface GameState {
  data: ITransaction | null | undefined
}

export interface ICreateTransaction {
  player_id: string
  date_time: string
  amount: number
  fee: number
  type: string
  transaction_hash: string
}
export interface IGetTransaction {
  player_id: string
  type: string
  skip: number
}

// Type for withdrew
export interface ITransectionResponse {
  blockHash: string
  blockNumber: number
  contractAddress: null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logsBloom: string
  status: boolean
  to: string
  transactionHash: string
  transactionIndex: number
  type: string
  // eslint-disable-next-line no-use-before-define
  events: any // IEvents
}
interface IEvents {
  // eslint-disable-next-line no-use-before-define
  WithdrawNaka: any // IWithdrawNaka
}

interface IWithdrawNaka {
  address: string
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  blockHash: string
  logIndex: number
  removed: boolean
  id: string
  event: string
  signature: string
}

// Buy item response
export interface IBuyItemResponse {
  status: boolean
  // eslint-disable-next-line no-use-before-define
  data: any // IBuyItemTransectionResponse
}

export interface IBuyItemTransectionResponse {
  blockHash: string
  blockNumber: number
  contractAddress: null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  // eslint-disable-next-line no-use-before-define
  logs: any[] // IBuyItemTransectionLog[]
  logsBloom: string
  status: boolean
  to: string
  transactionHash: string
  transactionIndex: number
  type: string
  responseBalanceOf: number
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

export interface IPriceCurrentResponse {
  time: number
  symbol: string
  buy: string
  sell: string
  changeRate: string
  changePrice: string
  high: string
  low: string
  vol: string
  volValue: string
  last: string
  averagePrice: string
  takerFeeRate: string
  makerFeeRate: string
  takerCoefficient: string
  makerCoefficient: string
}
