import services from "@configs/axiosGlobalConfig"
import { IGetHistory, IPlayloadHistory } from "../../interfaces/IHistoryService"

const getHistory = ({ player_id, limit, skip }: IGetHistory) =>
  new Promise<IPlayloadHistory[]>((resolve, reject) => {
    services
      .post(`/summary/history`, {
        player_id,
        limit,
        skip
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

export { getHistory }
