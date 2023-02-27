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
    getNetwork
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

  // useEffect(() => {
  //   console.log("signer", signer, address, chainId, isWrongNetwork)
  //   if (chainId === undefined) return
  //   handleSwitchNetwork(chainId)
  // }, [chainId])

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
    getNetwork
  }
}

export default useSwitchNetwork
