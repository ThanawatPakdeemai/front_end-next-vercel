import { ITransData } from "@feature/transaction/interfaces/ITransaction"
import configZustandDevTools from "@utils/configDevtools"
import create from "zustand"
import { devtools } from "zustand/middleware"

interface ITransStore {
  all: ITransData[]
  type: string
  getAllTransaction: () => ITransData[]
  getTypeTransaction: () => string
  setTransaction: (_transList: ITransData[]) => void
  setType: (_type: string) => void
}

const useTransactionStore = create<ITransStore>()(
  devtools(
    (set, get) => ({
      all: [],
      type: "all",
      getAllTransaction: () => get().all,
      getTypeTransaction: () => get().type,
      setTransaction: (_transList) => {
        set(() => ({ all: _transList }), false, "Transaction/setTransaction")
      },
      setType: (_type) => {
        set(() => ({ type: _type }), false, "Transaction/setType")
      }
    }),
    configZustandDevTools("Transaction-Store")
  )
)

export default useTransactionStore
