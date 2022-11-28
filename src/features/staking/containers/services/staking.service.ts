import services from "@configs/axiosGlobalConfig"
import { IStaking, IStakingdata } from "../../interfaces/IStaking"

export const getStakingAll = ({ _limit, _skip }: IStaking) =>
  new Promise<IStakingdata>((resolve, reject) => {
    const data = {
      limit: _limit,
      skip: _skip
    }
    services
      .post<IStakingdata>(`/staking/all `, { ...data })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
