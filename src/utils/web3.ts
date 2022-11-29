import { ethers, providers } from "ethers"
import CONFIGS from "@configs/index"

export const ethHttpRpcProvider = new ethers.providers.JsonRpcProvider(
  CONFIGS.CHAIN.POLYGON_RPC_URL
)

const simpleRpcProvider = new providers.JsonRpcProvider(
  CONFIGS.CHAIN.POLYGON_RPC_URL
)

export default simpleRpcProvider
