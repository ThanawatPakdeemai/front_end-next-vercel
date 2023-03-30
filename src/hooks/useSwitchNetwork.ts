import { useWeb3Provider } from "@providers/Web3Provider"
import { useCallback, useState } from "react"

const useSwitchNetwork = () => {
  const { switchNetwork } = useWeb3Provider()

  // States
  const [isWrongNetwork, setIsWrongNetwork] = useState(false)

  /**
   * @description Handle switch network
   * @param network
   */
  const handleSwitchNetwork = useCallback(
    async (network: string) => {
      if (network === undefined) return
      const result = await switchNetwork?.(network)
      if (result) {
        setIsWrongNetwork(false)
      }
    },
    [switchNetwork]
  )

  return {
    handleSwitchNetwork,
    setIsWrongNetwork,
    isWrongNetwork
  }
}

export default useSwitchNetwork
