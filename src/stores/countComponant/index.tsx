import configZustandDevTools from "@utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

export interface IUseCountStore {
  count: number
}
const useCountStore = create<IUseCountStore>()(
  devtools(
    (set) => ({
      count: 0,
      increase: () => {
        set(
          (state) => ({ count: state.count + 1 }),
          false,
          "CountStore/increase"
        )
      },
      decrease: () => {
        set(
          (state) => ({ count: state.count - 1 }),
          false,
          "CountStore/decrease"
        )
      },
      removeAllCount: () => set({ count: 0 })
    }),
    configZustandDevTools("Count-Store")
  )
)

export default useCountStore
