import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IFilter {
  value: string
}

interface IChecked {
  checked: boolean
}

export type TKey = {
  [key: string]: string | number | null
}

interface IKeyValue {
  key: string
  value: string | number | null
}

export interface IuseMarketFilterStore {
  filterType: {
    nft_land: string[]
    nft_building: string[]
    nft_material: string[]
    game_item: string[]
  }
  sort: TKey[]
  search: TKey[]
  getSort: () => TKey[]
  getSearch: () => TKey[]
  onSetFilterType: (_type: TNFTType, _filter: Array<IFilter & IChecked>) => void
  onSetSort: (_sort: IKeyValue) => void
  onSetSearch: (_search: IKeyValue) => void
  onResetFilterType: () => void
  onResetSort: () => void
  onResetSearch: () => void
  onAllReset: () => void
}

const handleKeyValue = (_arr: Array<TKey>, _payload: IKeyValue) => {
  let result: Array<TKey> = _arr
  const checkedSort = result.find((s) =>
    Object.keys(s).find((k) => k === _payload.key)
  )
  if (checkedSort) {
    result = result.filter((s) =>
      Object.keys(s).find((k) => k !== _payload.key)
    )
    if (_payload.value) {
      result = [...result, { [_payload.key]: _payload.value }]
    } else {
      result = result.filter((f) => f.value === null)
    }
  } else if (_payload.value) {
    result = [...result, { [_payload.key]: _payload.value }]
  }
  return result
}

const handleAssignValue = (
  _arr: string[],
  _filter: Array<IFilter & IChecked>
) => {
  const _remove: string[] = []
  const _combieArr = [..._arr, ..._filter.map((r) => r.value)]
  let newFilter = _combieArr.filter(
    (c, index) => _combieArr.indexOf(c) === index
  )
  _filter.map((f) => {
    if (f.value === _arr.find((d) => d === f.value)) {
      if (f.checked) {
        _remove.push(f.value)
      }
    }
    return undefined
  })
  newFilter = newFilter.filter((val) => !_remove.includes(val))
  return newFilter
}

const useMarketFilterStore = create<IuseMarketFilterStore>()(
  devtools(
    (set, get) => ({
      filterType: {
        nft_land: [],
        nft_building: [],
        nft_material: [],
        game_item: []
      },
      filter: [],
      sort: [],
      search: [],
      getSort: () => get().sort,
      getSearch: () => get().search,
      onSetFilterType: (_type, _filter) => {
        const dummyFilter = get().filterType
        let _gameItemfilter: string[] = []
        let _nftLandfilter: string[] = []
        let _nftBuildingfilter: string[] = []
        let _nftMaterialfilter: string[] = []
        if (_type === "game_item")
          _gameItemfilter = handleAssignValue(dummyFilter.game_item, _filter)
        else if (_type === "nft_land")
          _nftLandfilter = handleAssignValue(dummyFilter.nft_land, _filter)
        else if (_type === "nft_building")
          _nftBuildingfilter = handleAssignValue(
            dummyFilter.nft_building,
            _filter
          )
        else if (_type === "nft_material")
          _nftMaterialfilter = handleAssignValue(
            dummyFilter.nft_material,
            _filter
          )
        set(
          () => ({
            filterType: {
              game_item: _gameItemfilter,
              nft_land: _nftLandfilter,
              nft_building: _nftBuildingfilter,
              nft_material: _nftMaterialfilter
            }
          }),
          false,
          "MarketFilterStore/onSetFilterType"
        )
      },
      onSetSort: (_sort) => {
        const dummySort = get().sort
        let newSearch: TKey[] = []
        newSearch = handleKeyValue(dummySort, _sort)
        set(() => ({ sort: newSearch }), false, "MarketFilterStore/onSetSort")
      },
      onSetSearch: (_search) => {
        const dummySort = get().search
        let newSearch: TKey[] = []
        newSearch = handleKeyValue(dummySort, _search)
        set(
          () => ({ search: newSearch }),
          false,
          "MarketFilterStore/onSetSearch"
        )
      },
      onResetFilterType: () => {
        const setFilter = {
          nft_land: [],
          nft_building: [],
          nft_material: [],
          game_item: []
        }
        set(
          () => ({ filterType: setFilter }),
          false,
          "MarketFilterStore/onResetFilterType"
        )
      },
      onResetSort: () => {
        set(() => ({ sort: [] }), false, "MarketFilterStore/onResetSort")
      },
      onResetSearch: () => {
        set(() => ({ search: [] }), false, "MarketFilterStore/onResetSearch")
      },
      onAllReset: () => {
        set(
          () => ({
            filterType: {
              game_item: [],
              nft_land: [],
              nft_building: [],
              nft_material: []
            },
            search: [],
            sort: []
          }),
          false,
          "MarketFilterStore/onAllReset"
        )
      }
    }),
    configZustandDevTools("MarketFilter-Store")
  )
)

export default useMarketFilterStore
