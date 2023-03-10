import { ReactNode } from "react"

export interface IList {
  label: ReactNode
  data: string
  icon: string
  href: string
  active: boolean
}
interface ITransactionBase {
  date_time: string
  amount: number
  fee: number
  type: string
  transaction_hash: string
}

export interface ITransaction extends ITransactionBase {
  user_id: string
}

export interface ICreateTransaction extends ITransactionBase {
  player_id: string
}

export interface ITransactionInfo {
  currentCount: number
  limit: number
  pages: number
  totalCount: number
}

export interface ITransactionState {
  all: ITransaction[]
  type: string
}

export interface ITransactionPayload {
  data: ITransaction[]
  info: ITransactionInfo
}

export interface GameState {
  data: ITransaction | null | undefined
}

export interface IGetTransaction {
  player_id: string
  type: string
  skip: number
}

interface IWithdrawBase {
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  blockHash: string
}

interface ITransactionExtend {
  address: string
  logIndex: number
  id: string
  removed: boolean
}

interface IWithdrawNaka extends IWithdrawBase, ITransactionExtend {
  event: string
  signature: string
}

interface IEvents {
  WithdrawNaka: IWithdrawNaka
}

interface ITransactionResponseBase {
  contractAddress: null
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logsBloom: string
  status: boolean
  to: string
  type: string
}

// Type for withdraw
export interface ITransactionResponse
  extends IWithdrawBase,
    ITransactionResponseBase {
  wait: () => Promise<ITransactionResponse>
  events: IEvents
}

export interface IBuyItemTransactionLog
  extends IWithdrawBase,
    ITransactionExtend {
  topics: string[]
  data: string
}

export interface IBuyItemTransactionResponse
  extends IWithdrawBase,
    ITransactionResponseBase {
  logs: IBuyItemTransactionLog[]
  responseBalanceOf: number
}

// Buy item response
export interface IBuyItemResponse {
  status: boolean
  data: IBuyItemTransactionResponse
}

export interface IGetEventLog {
  allowed: string[]
  events: object
}
