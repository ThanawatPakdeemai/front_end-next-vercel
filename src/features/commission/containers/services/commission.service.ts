import {
  ICommissionService,
  IGetCommission
} from "@feature/commission/interfaces/ICommission"
import services from "@src/configs/axiosGlobalConfig"

export const getCommission = ({ _playerId, _limit, _page }: IGetCommission) =>
  new Promise<ICommissionService>((resolve, reject) => {
    const data = {
      player_id: _playerId,
      limit: _limit,
      skip: _page
    }
    services
      .post<ICommissionService>(`/share_to_earn/commissions`, { ...data })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
