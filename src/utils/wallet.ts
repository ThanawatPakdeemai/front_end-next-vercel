/* eslint-disable max-len */
import toast from "react-hot-toast"
import { CHAIN_ID, MATIC_ICON, CHAIN_NAME } from "@constants/wallets"

/**
 * Prompt the user to add default a network on Metamask, or switch to default a network if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any

export const setupNetwork = async () => {
  const provider = window.ethereum
  const polygon_scan = process.env.NEXT_PUBLIC_POLYGON_SCAN
  const polygon_rpc = process.env.NEXT_PUBLIC_POLYGON_RPC_URL

  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${CHAIN_ID.toString(16)}`,
            chainName: CHAIN_NAME,
            rpcUrls: [`${polygon_rpc}/`],
            iconUrls: [MATIC_ICON],
            blockExplorerUrls: [`${polygon_scan}/`],
            nativeCurrency: {
              name: "NAKA",
              symbol: "MATIC",
              decimals: 18
            }
          }
        ]
      })
    } catch (error) {
      return false
    }
    return true
  }
  toast.error(
    "Can't setup the MATIC network on metamask because window.ethereum is undefined"
  )
  return false
}
