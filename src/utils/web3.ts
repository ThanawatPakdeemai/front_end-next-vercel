/* eslint-disable import/no-extraneous-dependencies */
import Web3 from "web3"
import { HttpProviderOptions } from "web3-core-helpers"
import { ARCHIVED_NODE } from "@constants/endpoints"
import { ethers, providers } from "ethers"
import CONFIGS from "@configs/index"
import getRpcUrl from "@utils/getRpcUrl"

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000
} as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => web3NoAccount

const getWeb3WithArchivedNodeProvider = () => {
  const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, {
    timeout: 10000
  } as HttpProviderOptions)
  return new Web3(archivedHttpProvider)
}

export const ethHttpRpcProvider = new ethers.providers.JsonRpcProvider(
  (CONFIGS.CHAIN && CONFIGS.CHAIN.POLYGON_RPC_URL) ||
    process.env.NEXT_PUBLIC_POLYGON_RPC_URL
)

const simpleRpcProvider = new providers.JsonRpcProvider(
  (CONFIGS.CHAIN && CONFIGS.CHAIN.POLYGON_RPC_URL) ||
    process.env.NEXT_PUBLIC_POLYGON_RPC_URL
)

export const bnbRpcProvider = new providers.JsonRpcProvider(
  (CONFIGS.CHAIN && CONFIGS.CHAIN.BNB_RPC_URL) ||
    process.env.NEXT_PUBLIC_BNB_RPC_URL
)
export { getWeb3NoAccount, getWeb3WithArchivedNodeProvider, web3NoAccount }
export default simpleRpcProvider
