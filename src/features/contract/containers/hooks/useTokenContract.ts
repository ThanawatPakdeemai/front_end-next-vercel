import { Contract } from "ethers"

export interface ITokenContract {
  symbol: string
  name: string
  totolSupply: number
}

export const DEFAULT_TOKEN_INFO: ITokenContract = {
  symbol: "",
  name: "",
  totolSupply: 0
}

/**
 * @description - Get token info by contract address
 * @param tokenContract - Token contract Ex. ERC20, BEP20
 */
const useTokenContract = (tokenContract: Contract) => {
  /**
   * @description - Get all token info by contract address
   */
  const getAllTokenInfoByContractAddress = async () => {
    try {
      const symbolPromise = await tokenContract.symbol()
      const totalSupplyPromise = await tokenContract.getTotalSupply()
      const namePromise = await tokenContract.name()

      const [tokenSymbol, totalSupply, tokenName] = await Promise.all([
        symbolPromise,
        totalSupplyPromise,
        namePromise
      ])

      return {
        symbol: tokenSymbol.toString(),
        name: tokenName.toString(),
        totolSupply: totalSupply
      }
    } catch (err) {
      return DEFAULT_TOKEN_INFO
    }
  }

  return {
    getAllTokenInfoByContractAddress
  }
}

export default useTokenContract
