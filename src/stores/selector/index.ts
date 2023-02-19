import create from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ISelect {
  select: string
  setSelect: (_search: string) => void
}

const useSelectStore = create<ISelect>()(
  devtools(
    (set) => ({
      select: "date_released",
      setSelect: (_select) => {
        set(() => ({ select: _select }), false, "SelectStore/setSelect")
      }
    }),
    configZustandDevTools("Select-Store")
  )
)

export default useSelectStore
