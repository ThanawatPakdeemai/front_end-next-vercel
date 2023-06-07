import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface IUseCountStore {
  count: number
  min: number
  max: number
  setCount: (_count: number) => void
  setMin: (_min: number) => void
  setMax: (_max: number) => void
  increase: (_count: number) => void
  decrease: (_count: number) => void
  removeAllCount: () => void
}
const useCountStore = create<IUseCountStore>()(
  devtools(
    (set) => ({
      count: 1,
      min: 1,
      max: 1,
      setCount: (_count) => {
        set(() => ({ count: _count }), false, "CountStore/SetCount")
      },
      setMin: (_min) => {
        set(() => ({ min: _min }), false, "CountStore/SetMin")
      },
      setMax: (_max) => {
        set(() => ({ max: _max }), false, "CountStore/SetMax")
      },
      increase: () => {
        set(
          (state) => ({
            count: state.count >= state.max ? state.max : state.count + 1
          }),
          false,
          "CountStore/increase"
        )
      },
      decrease: () => {
        set(
          (state) => ({
            count: state.count <= state.min ? state.min : state.count - 1
          }),
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
