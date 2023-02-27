import { useWeb3Provider } from "@providers/Web3Provider"
import { useCallback, useEffect, useState } from "react"

const useSwitchNetwork = () => {
  const {
    address,
    chainId,
    handleDisconnectWallet,
    loading,
    switchNetwork,
    provider,
    signer,
    accounts,
    checkNetwork
  } = useWeb3Provider()

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
      } else {
        setIsWrongNetwork(true)
      }
    },
    [switchNetwork]
  )

  useEffect(() => {
    if (chainId === undefined) return
    handleSwitchNetwork(chainId)
  }, [chainId, handleSwitchNetwork])

  return {
    handleSwitchNetwork,
    address,
    chainId,
    handleDisconnectWallet,
    loading,
    setIsWrongNetwork,
    isWrongNetwork,
    provider,
    signer,
    accounts,
    checkNetwork
  }
}

export default useSwitchNetwork
