import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IChainSupport {
  chainSupport: ITokenContract[]
  getChainSupport: () => ITokenContract[]
  setChainSupport: (_value: ITokenContract[]) => void
  contractBNB: string | null
  getContractBNB: () => string | null
  setContractBNB: (_value: string | null) => void
}

const useChainSupport = create<IChainSupport>()(
  devtools(
    (set, get) => ({
      chainSupport: [],
      getChainSupport: () => get().chainSupport,
      setChainSupport: (_value: ITokenContract[]) => {
        set(
          () => ({ chainSupport: _value }),
          false,
          "ChainSupport/setChainSupport"
        )
      },
      contractBNB: null,
      getContractBNB: () => get().contractBNB,
      setContractBNB: (_value: string | null) => {
        set(
          () => ({ contractBNB: _value }),
          false,
          "ChainSupport/setContractBNB"
        )
      }
    }),
    configZustandDevTools("CoinSupport-Store")
  )
)

export default useChainSupport
