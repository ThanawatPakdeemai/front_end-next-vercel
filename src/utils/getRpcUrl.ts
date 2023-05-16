import CONFIGS from "@configs/index"
import { random } from "lodash"

export const nodesRPCPolygon: string[] =
  CONFIGS.MODE === "development"
    ? [
        "https://rpc-mumbai.maticvigil.com",
        "https://rpc.ankr.com/polygon_mumbai"
      ]
    : [
        "https://rpc.ankr.com/polygon",
        "https://polygon-rpc.com",
        "https://matic-mainnet.chainstacklabs.com",
        "https://polygon.llamarpc.com",
        "https://polygon.rpc.blxrbdn.com",
        "https://polygon.blockpi.network/v1/rpc/public",
        "https://rpc-mainnet.maticvigil.com",
        "https://poly-rpc.gateway.pokt.network",
        "https://polygon-mainnet.public.blastapi.io",
        "https://polygon-bor.publicnode.com"
      ]

export const nodesRPCBinance: string[] =
  CONFIGS.MODE === "development"
    ? [
        "https://data-seed-prebsc-1-s2.binance.org:8545",
        "https://endpoints.omniatech.io/v1/bsc/testnet/public",
        "https://data-seed-prebsc-2-s2.binance.org:8545",
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545"
      ]
    : [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io"
      ]

export const nodes = [
  "https://matic-mumbai.chainstacklabs.com"
  // "https://rpc-mumbai.maticvigil.com"
  // "http://35.247.164.60:23678"
]
const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1)
  return nodes[randomIndex]
}

export default getNodeUrl
