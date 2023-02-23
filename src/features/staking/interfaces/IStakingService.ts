import { IStakingAll } from "@src/types/staking"

export interface IStakingPaging {
  _limit: number
  _skip: number
}
export interface IStakingResponse {
  data: IStakingAll[]
  info: {
    pages: number
    limit: number
    currentCount: number
    totalCount: number
  }
  message: string
  status: boolean
}
