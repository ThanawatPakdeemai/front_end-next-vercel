import configZustandDevTools from "@utils/configDevtools"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface IWalletStore {
  vaultBalance: number
  nakaBalance: number
  busdBalance: number
  getVaultBalance: () => number
  getNakaBalance: () => number
  getBusdBalance: () => number
  setVaultBalance: (_value: number) => void
  setNakaBalance: (_value: number) => void
  setBusdBalance: (_value: number) => void
}

const useWalletStore = create<IWalletStore>()(
  devtools(
    (set, get) => ({
      vaultBalance: 0,
      nakaBalance: 0,
      busdBalance: 0,
      getVaultBalance: () => get().vaultBalance,
      getNakaBalance: () => get().nakaBalance,
      getBusdBalance: () => get().busdBalance,
      setVaultBalance: (_value) => {
        set(() => ({ vaultBalance: _value }), false, "Wallets/setVaultBalance")
      },
      setNakaBalance: (_value) => {
        set(() => ({ nakaBalance: _value }), false, "Wallets/setNakaBalance")
      },
      setBusdBalance: (_value) => {
        set(() => ({ busdBalance: _value }), false, "Wallets/setBusdBalance")
      }
    }),
    configZustandDevTools("Wallets-Store")
  )
)

export default useWalletStore
