import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface IDrawerStore {
  openProfileCreate: boolean
  setOpenProfileCreate: (_toggle: boolean) => void
  openProfileSetting: boolean
  setOpenProfileSetting: (_toggle: boolean) => void
  openSyncAccount: boolean
  setOpenSyncAccount: (_toggle: boolean) => void
  openSetting: boolean
  setOpenSetting: (_toggle: boolean) => void
}

const useDrawerControllerMobileStore = create<IDrawerStore>()(
  devtools(
    (set) => ({
      openProfileCreate: false,
      setOpenProfileCreate: (_toggle: boolean) => {
        set(() => ({ openProfileCreate: _toggle }))
      },
      openProfileSetting: false,
      setOpenProfileSetting: (_toggle: boolean) => {
        set(() => ({ openProfileSetting: _toggle }))
      },
      openSyncAccount: true,
      setOpenSyncAccount: (_toggle: boolean) => {
        set(() => ({ openSyncAccount: _toggle }))
      },
      openSetting: false,
      setOpenSetting: (_toggle: boolean) => {
        set(() => ({ openSetting: _toggle }))
      }
    }),
    configZustandDevTools("DrawerController-Store")
  )
)

export default useDrawerControllerMobileStore
