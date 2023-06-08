import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ITypeBuild } from "@feature/building/interfaces/IBuildingService"
import { ITypeMaterials } from "@feature/material/marketplace/interfaces/IMaterialService"
import {
  IMarketTypes,
  ISettingName,
  ISettingValue,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"

export type TCategory = TNFTType | undefined

interface IUseCategoryStore {
  fetchStatus: boolean
  NFTMintAble: {
    nft_land: boolean
    nft_building: boolean
  }
  gameItemTypes: IGameItemListData[] | undefined
  landTypes: ITypeMaterials[] | undefined
  buildingTypes: ITypeBuild[] | undefined
  materialTypes: ITypeMaterials[] | undefined
  setFetchStatus: (_value: boolean) => void
  getCurrentTypes: (
    _category: TCategory
  ) => Array<IGameItemListData | ITypeMaterials | ITypeBuild> | undefined
  onSetNFTMintAble: (
    _setting: Array<{
      _nft: ISettingName
      _value: ISettingValue
    }>
  ) => void
  onSetGameItemTypes: (_types: IGameItemListData[]) => void
  onSetLandTypes: (_types: ITypeMaterials[]) => void
  onSetBuildingTypes: (_types: ITypeBuild[]) => void
  onSetMaterialTypes: (_types: ITypeMaterials[]) => void
  onSetMarketTypes: (_types: IMarketTypes) => void
}

const useMarketCategTypes = create<IUseCategoryStore>()(
  devtools(
    (set, get) => ({
      fetchStatus: false,
      NFTMintAble: {
        nft_land: false,
        nft_building: false
      },
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
      onSetNFTMintAble: (_setting) => {
        const _dummy = { nft_land: false, nft_building: false }
        _setting.map((s) => {
          switch (s._nft) {
            case "land":
              _dummy.nft_land = s._value === "on"
              break
            case "building":
              _dummy.nft_building = s._value === "on"
              break
            default:
              break
          }
          return false
        })
        set(
          () => ({
            NFTMintAble: {
              nft_land: _dummy.nft_land,
              nft_building: _dummy.nft_building
            }
          }),
          false,
          "MarketCategTypesStore/onSetNFTMintAble"
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
      },
      onSetMarketTypes: (_types) => {
        set(
          () => ({
            landTypes: _types.land,
            buildingTypes: _types.building,
            gameItemTypes: _types.game_item,
            materialTypes: _types.material
          }),
          false,
          "MarketCategTypesStore/onSetMarketTypes"
        )
      }
    }),
    configZustandDevTools("MarketCategTypes-Store")
  )
)

export default useMarketCategTypes
