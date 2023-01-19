import Web3 from "web3"
import { AbiItem } from "web3-utils"
import web3NoAccount from "@utils/web3"

// ABI
import erc20Abi from "@configs/abi/ERC20.json"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContract = (abi: any, address: string, web3?: Web3) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _web3: any | Web3 = web3 ?? web3NoAccount

  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}

export const getErc20Contract = (address: string, web3?: Web3) =>
  getContract(erc20Abi, address, web3)
