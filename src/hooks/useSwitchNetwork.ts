import { useWeb3Provider } from "@providers/Web3Provider"
import { useState } from "react"

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
  const handleSwitchNetwork = (network: string) => {
    if (switchNetwork) {
      switchNetwork(network)
      setIsWrongNetwork(false)
    }
  }
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
