import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ITypesBuildServ } from "@feature/building/interfaces/IBuildingService"
import { ITypeMaterials } from "@feature/material/interfaces/IMaterialService"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"

type TCategory = TNFTType | undefined

interface IUseCategoryStore {
  category: TCategory
  gameItemTypes: IGameItemListData[]
  landTypes: ITypeMaterials[]
  buildingTypes: ITypesBuildServ[]
  materialTypes: ITypeMaterials[]
  getCurrentTypes: (_category: TCategory) => void
  onSetCategory: (_category: TCategory) => void
  onSetGameItemTypes: (_types: IGameItemListData[]) => void
  onSetLandTypes: (_types: ITypeMaterials[]) => void
  onSetBuildingTypes: (_types: ITypesBuildServ[]) => void
  onSetMaterialTypes: (_types: ITypeMaterials[]) => void
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
        let _types: Array<
          IGameItemListData | ITypeMaterials | ITypesBuildServ
        > = []
        switch (_category) {
          case "game_item":
            _types = get().gameItemTypes
            break
          case "nft_land":
            _types = get().landTypes
            break
          case "nft_building":
            _types = get().buildingTypes
            break
          case "nft_material":
            _types = get().materialTypes
            break
          case "nft_naka_punk":
            _types = []
            break
          case "nft_game":
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
