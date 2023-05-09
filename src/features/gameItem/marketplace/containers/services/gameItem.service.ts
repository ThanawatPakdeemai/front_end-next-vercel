import services from "@configs/axiosGlobalConfig"
import { ITypesGameItemServ } from "@feature/gameItem/marketplace/interfaces/IGameItemService"

export const getTypesGameItem = () =>
  new Promise<ITypesGameItemServ>((resolve, reject) => {
    services
      .get<ITypesGameItemServ>(`/market-place/NFT-Game-Item/game-item`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
