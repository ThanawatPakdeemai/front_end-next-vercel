import { create } from "zustand"
import { devtools } from "zustand/middleware"
import configZustandDevTools from "@utils/configDevtools"

interface IIpAddr {
  ipAddress: string | null
  getIpAddress: () => string | null
  setIp: (_ip: string) => void
  clearIp: () => void
}

const useIpAddressStore = create<IIpAddr>()(
  devtools(
    (set, get) => ({
      ipAddress: null,
      getIpAddress: () => get().ipAddress,
      setIp: (_ip) => {
        set(() => ({ ipAddress: _ip }), false, "IpAddressStore/setIp")
      },
      clearIp: () => {
        set(() => ({ ipAddress: null }), false, "IpAddressStore/clearIp")
      }
    }),
    configZustandDevTools("IpAddress-Store")
  )
)

export default useIpAddressStore
