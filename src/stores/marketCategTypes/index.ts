import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ITypeBuild } from "@feature/building/interfaces/IBuildingService"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"

export type TCategory = TNFTType | undefined

interface IUseCategoryStore {
  category: TCategory
  fetchStatus: boolean
  gameItemTypes: IGameItemListData[] | undefined
  landTypes: ITypeMaterials[] | undefined
  buildingTypes: ITypeBuild[] | undefined
  materialTypes: ITypeMaterials[] | undefined
  setFetchStatus: (_value: boolean) => void
  getCurrentTypes: (
    _category: TCategory
  ) => Array<IGameItemListData | ITypeMaterials | ITypeBuild> | undefined
  onSetCategory: (_category: TCategory) => void
  onSetGameItemTypes: (_types: IGameItemListData[]) => void
  onSetLandTypes: (_types: ITypeMaterials[]) => void
  onSetBuildingTypes: (_types: ITypeBuild[]) => void
  onSetMaterialTypes: (_types: ITypeMaterials[]) => void
}

const useMarketCategTypes = create<IUseCategoryStore>()(
  devtools(
    (set, get) => ({
      category: undefined,
      fetchStatus: false,
      gameItemTypes: undefined,
      landTypes: undefined,
      buildingTypes: undefined,
      materialTypes: undefined,
      setFetchStatus: (_value) => {
        set(
          () => ({ fetchStatus: _value }),
          false,
          "MarketCategTypesStore/setFetchStatus"
        )
      },
      getCurrentTypes: (_category) => {
        let _types:
          | Array<IGameItemListData | ITypeMaterials | ITypeBuild>
          | undefined
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
            _types = undefined
            break
          case "nft_game":
            _types = undefined
            break
          case "nft_avatar":
            _types = undefined
            break
          default:
            _types = undefined
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
