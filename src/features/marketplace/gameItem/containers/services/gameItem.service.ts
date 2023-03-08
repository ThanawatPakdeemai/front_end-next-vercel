import services from "@configs/axiosGlobalConfig"
import { ITypesGameItemServ } from "@feature/marketplace/gameItem/interfaces/IGameItemService"

export const getTypesGameItem = () =>
  new Promise<ITypesGameItemServ>((resolve, reject) => {
    services
      .get<ITypesGameItemServ>(`/market-place/game-item"`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
