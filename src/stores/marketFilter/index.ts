import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IFilter {
  value: string
}

interface IChecked {
  checked: boolean
}

type TKey = {
  [key: string]: string | number | null
}

interface IKeyValue {
  key: string
  value: string | number | null
}

export interface IuseMarketFilterStore {
  filter: string[]
  sort: TKey[]
  search: TKey[]
  getFilter: () => string[]
  getSort: () => TKey[]
  getSearch: () => TKey[]
  onSetFilter: (_filter: Array<IFilter & IChecked>) => void
  onSetSort: (_sort: IKeyValue) => void
  onSetSearch: (_search: IKeyValue) => void
  onResetFilter: () => void
  onResetSort: () => void
  onResetSearch: () => void
}

const handleKeyValue = (_arr: Array<TKey>, _payload: IKeyValue) => {
  let result: Array<TKey> = _arr
  const checkedSort = result.find((s) => Object.keys(s)[0] === _payload.key)
  if (checkedSort) {
    result.filter((s) => Object.keys(s)[0] !== _payload.key)
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

const useMarketFilterStore = create<IuseMarketFilterStore>()(
  devtools(
    (set, get) => ({
      filter: [],
      sort: [],
      search: [],
      getFilter: () => get().filter,
      getSort: () => get().sort,
      getSearch: () => get().search,
      onSetFilter: (_filter) => {
        const dummyFilter = get().filter
        const _remove: string[] = []
        const _combieArr = [...dummyFilter, ..._filter.map((r) => r.value)]
        let newFilter = _combieArr.filter(
          (c, index) => _combieArr.indexOf(c) === index
        )
        _filter.map((f) => {
          if (f.value === dummyFilter.find((d) => d === f.value)) {
            if (!f.checked) {
              _remove.push(f.value)
            }
          }
          return undefined
        })
        newFilter = newFilter.filter((val) => !_remove.includes(val))
        set(
          () => ({ filter: newFilter }),
          false,
          "MarketFilterStore/onSetFilter"
        )
      },
      onSetSort: (_sort) => {
        const dummySort = get().sort
        set(
          () => ({ sort: handleKeyValue(dummySort, _sort) }),
          false,
          "MarketFilterStore/onSetSort"
        )
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
      onResetFilter: () => {
        const setFilter = []
        set(
          () => ({ filter: setFilter }),
          false,
          "MarketFilterStore/onResetFilter"
        )
      },
      onResetSort: () => {
        set(() => ({ sort: [] }), false, "MarketFilterStore/onResetSort")
      },
      onResetSearch: () => {
        set(() => ({ search: [] }), false, "MarketFilterStore/onResetSearch")
      }
    }),
    configZustandDevTools("MarketFilter-Store")
  )
)

export default useMarketFilterStore
