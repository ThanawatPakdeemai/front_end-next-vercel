import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface IChainSupport {
  chainSupport: ITokenContract[]
  getChainSupport: () => ITokenContract[]
  setChainSupport: (_value: ITokenContract[]) => void
  contractBNB: string | null
  getContractBNB: () => string | null
  setContractBNB: (_value: string | null) => void
  currentChainSelected: string | null
  setCurrentChainConnected: (_value: string) => void
  currentTokenSelected: ITokenContract | null
  setCurrentTokenSelected: (_value: ITokenContract | null) => void
  onResetChainStore: () => void
  isCorrectWallet: boolean
  setIsCorrectWallet: (_value: boolean) => void
}

const useChainSupportStore = create<IChainSupport>()(
  devtools(
    persist(
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
        },
        currentChainSelected: null,
        setCurrentChainConnected: (_value: string) => {
          set(
            () => ({ currentChainSelected: _value }),
            false,
            "ChainSupport/setChainConnected"
          )
        },
        currentTokenSelected: null,
        setCurrentTokenSelected: (_value: ITokenContract | null) => {
          set(
            () => ({ currentTokenSelected: _value }),
            false,
            "ChainSupport/setCurrentTokenSelected"
          )
        },
        onResetChainStore: () => {
          set(
            () => ({
              chainSupport: [],
              contractBNB: null,
              currentChainSelected: null,
              currentTokenSelected: null
            }),
            false,
            "ChainSupport/onResetChainStore"
          )
        },
        isCorrectWallet: false,
        setIsCorrectWallet: (_value: boolean) => {
          set(
            () => ({ isCorrectWallet: _value }),
            false,
            "ChainSupport/setIsCorrectWallet"
          )
        }
      }),
      configZustandDevTools("ChainSupport-Store")
    ),
    configZustandDevTools("ChainSupport-Store")
  )
)

export default useChainSupportStore
