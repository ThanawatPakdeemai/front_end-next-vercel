import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface ICrumb {
  _id: string
  title: string | undefined
}
export interface ICrumbStore {
  crumb: ICrumb
  getCrumb: () => ICrumb
  onReset: () => void
  setCrumbData: (_Blog: ICrumb) => void
}

const useCrumbStore = create<ICrumbStore>()(
  devtools(
    (set, get) => ({
      crumb: {
        _id: "",
        title: ""
      },
      getCrumb: () => get().crumb,
      onReset: () =>
        set({
          crumb: {
            _id: "",
            title: ""
          }
        }),
      setCrumbData: (_crumb) => {
        set(() => ({ crumb: _crumb }), false, "crumbs/setCrumbData")
      }
    }),
    configZustandDevTools("Crumb-Store")
  )
)

export default useCrumbStore
