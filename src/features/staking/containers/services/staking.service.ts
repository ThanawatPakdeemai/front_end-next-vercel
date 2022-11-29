import services from "@configs/axiosGlobalConfig"
import {
  IStakingPaging,
  IStakingResponse
} from "../../interfaces/IStakingService"

export const getStakingAll = ({ _limit, _skip }: IStakingPaging) =>
  new Promise<IStakingResponse>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _skip
    }
    services
      .post<IStakingResponse>(`/staking/all `, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
