import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { GameAllId, IGame } from "@src/features/game/interfaces/IGameService"
import configZustandDevTools from "@src/utils/configDevtools"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface IUseGameItemStore {
  data: IGame | null
  dataGamePartner: IPartnerGameData | null
  gameId: GameAllId[]
  onSetGameData: (_game: IGame) => void
  onSetGamePartnersData: (_game: IPartnerGameData) => void
  clearGameData: () => void
  clearGamePartnersData: () => void
  setGameID: (_gameID: GameAllId[]) => void
  clearGameID: () => void
  getGame: () => void
  itemSelected: IGameItemListData | null
  onSetGameItemSelectd: (_item: IGameItemListData | null) => void
  qtyItemOfRoom: number
  setQtyItemOfRoom: (_qty: number) => void // TODO YUI when create room set qty item
}

const useGameStore = create<IUseGameItemStore>()(
  devtools(
    persist(
      (set, get) => ({
        data: null,
        dataGamePartner: null,
        gameId: [],
        onSetGameData: (_game) => {
          set(() => ({ data: _game }), false, "GameStore/setGame")
        },
        onSetGamePartnersData: (_game) => {
          set(
            () => ({ dataGamePartner: _game }),
            false,
            "GameStore/setGamePartners"
          )
        },
        clearGamePartnersData: () => {
          set(() => ({ data: null }), false, "GameStore/clearGamePartnersData")
        },
        clearGameData: () => {
          set(() => ({ data: null }), false, "GameStore/clearGameData")
        },
        setGameID: (_gameID) => {
          set(() => ({ gameId: _gameID }), false, "GameStore/setGameID")
        },
        clearGameID: () => {
          set(() => ({ gameId: [] }), false, "GameStore/clearGameID")
        },
        getGame: () => get().data,
        itemSelected: null,
        onSetGameItemSelectd: (_item) => {
          set(
            () => ({ itemSelected: _item }),
            false,
            "GameStore/setGameItemSelected"
          )
        },
        qtyItemOfRoom: 0,
        setQtyItemOfRoom: (_qty) => {
          set(
            () => ({ qtyItemOfRoom: _qty }),
            false,
            "GameStore/setGameItemQtyOfRoom"
          )
        }
      }),
      configZustandDevTools("Game-Store")
    )
  )
)

export default useGameStore
