import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { IMaterials } from "@feature/marketplace/material/interfaces/IMaterialService"
import { INFTBuilding } from "@feature/marketplace/building/interfaces/IBuildingService"

type TCategory =
  | "game-item"
  | "nft-land"
  | "nft-building"
  | "material"
  | "naka-punk"
  | "nft-game"
  | undefined

interface IUseCategoryStore {
  category: TCategory
  gameItemTypes: IGameItemListData[]
  landTypes: IMaterials[]
  buildingTypes: INFTBuilding[]
  materialTypes: IMaterials[]
  getCurrentTypes: (_category: TCategory) => void
  onSetCategory: (_category: TCategory) => void
  onSetGameItemTypes: (_types: IGameItemListData[]) => void
  onSetLandTypes: (_types: IMaterials[]) => void
  onSetBuildingTypes: (_types: INFTBuilding[]) => void
  onSetMaterialTypes: (_types: IMaterials[]) => void
}

const useMarketCategTypes = create<IUseCategoryStore>()(
  devtools(
    (set, get) => ({
      category: undefined,
      gameItemTypes: [],
      landTypes: [],
      buildingTypes: [],
      materialTypes: [],
      getCurrentTypes: (_category) => {
        let _types: Array<IGameItemListData | IMaterials | INFTBuilding> = []
        switch (_category) {
          case "game-item":
            _types = get().gameItemTypes
            break
          case "nft-land":
            _types = get().landTypes
            break
          case "nft-building":
            _types = get().buildingTypes
            break
          case "material":
            _types = get().materialTypes
            break
          case "naka-punk":
            _types = []
            break
          case "nft-game":
            _types = []
            break
          default:
            _types = []
            break
        }
        return _types
      },
      onSetCategory: (_category) => {
        set(
          () => ({ category: _category }),
          false,
          "MarketCategTypesStore/onSetCategory"
        )
      },
      onSetGameItemTypes: (_types) => {
        set(
          () => ({ gameItemTypes: _types }),
          false,
          "MarketCategTypesStore/onSetGameItemTypes"
        )
      },
      onSetLandTypes: (_types) => {
        set(
          () => ({ landTypes: _types }),
          false,
          "MarketCategTypesStore/onSetLandTypes"
        )
      },
      onSetBuildingTypes: (_types) => {
        set(
          () => ({ buildingTypes: _types }),
          false,
          "MarketCategTypesStore/onSetBuildingTypes"
        )
      },
      onSetMaterialTypes: (_types) => {
        set(
          () => ({ materialTypes: _types }),
          false,
          "MarketCategTypesStore/onSetMaterialTypes"
        )
      }
    }),
    configZustandDevTools("MarketCategTypes-Store")
  )
)

export default useMarketCategTypes
