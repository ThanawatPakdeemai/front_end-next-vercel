import { IErrorMessage } from "@interfaces/IErrorMessage"
import { useWeb3Provider } from "@providers/Web3Provider"
import { useCallback, useState } from "react"

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
    getNetwork,
    handleConnectWithMetamask,
    statusWalletConnected
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
      }
    },
    [switchNetwork]
  )

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
    getNetwork,
    handleConnectWithMetamask,
    statusWalletConnected: statusWalletConnected as IErrorMessage
  }
}

export default useSwitchNetwork
