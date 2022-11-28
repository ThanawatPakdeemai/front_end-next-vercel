import { ethers, providers } from "ethers"
import Config from "@src/configs"

export const ethHttpRpcProvider = new ethers.providers.JsonRpcProvider(
  Config.POLYGON_RPC_URL
)

const simpleRpcProvider = new providers.JsonRpcProvider(Config.POLYGON_RPC_URL)

export default simpleRpcProvider
