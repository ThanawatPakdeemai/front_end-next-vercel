import services from "@src/configs/axiosGlobalConfig"
import { BASE_URL } from "@src/constants/site"
import { IGetHistory, IPlayloadHistory } from "../../interfaces/IHistory"

const getHistory = ({ player_id, limit, skip }: IGetHistory) =>
  new Promise<IPlayloadHistory[]>((resolve, reject) => {
    services
      .post(`${BASE_URL.api}/summary/history`, {
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
