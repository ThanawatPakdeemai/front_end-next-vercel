import { useCallback, useMemo } from "react"
import CONFIGS from "@configs/index"
import useContractVaultBinance, {
  ITokenContract
} from "@feature/contract/containers/hooks/useContractVaultBinance"

import { Contract, ethers } from "ethers"
import BEP20Abi from "@configs/abi/BEP20.json"
import ERC20Abi from "@configs/abi/ERC20.json"
import useContractVault from "@feature/contract/containers/hooks/useContractVault"
import {
  DEFAULT_CURRENCY_BNB,
  DEFAULT_CURRENCY_NAKA
} from "@constants/currency"
import { useWeb3Provider } from "@providers/Web3Provider"
import useChainSupportStore from "@stores/chainSupport"
import useProfileStore from "@stores/profileStore"

const useSupportedChain = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { getBNBContract } = useContractVaultBinance()
  const { getAllTokenInfoByContractAddress, getAllTokenAddressInContract } =
    useContractVaultBinance()
  const {
    chainSupport,
    currentTokenSelected,
    currentChainSelected,
    setChainSupport,
    setContractBNB,
    setCurrentTokenSelected
  } = useChainSupportStore()
  const { getNAKATokenInfo } = useContractVault()
  const { chainId, signer, address } = useWeb3Provider()

  /**
   * @description Get default currency
   * @returns {ITokenContract[]}
   */
  const getDefaultCoin = (): ITokenContract[] => {
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return DEFAULT_CURRENCY_BNB
      default:
        return DEFAULT_CURRENCY_NAKA
    }
  }

  /**
   * @description Get tokens amount
   * @param _chainId
   * @returns {string}
   */
  const getTokenSupply = (_chainId: string): string => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return "31000000000000000000000000"

      default:
        return "179999996000000000000000008"
    }
  }

  const getTokenAddress = (_chainId: string) => {
    switch (_chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        return CONFIGS.CONTRACT_ADDRESS.BEP20

      default:
        return CONFIGS.CONTRACT_ADDRESS.ERC20
    }
  }

  /**
   * @description Fetch BNB token address from Smart Contract
   */
  const fetchContractBNB = useCallback(async () => {
    if (currentChainSelected !== CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) return
    const result = await getBNBContract()
    if (result) {
      setContractBNB(result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getBNBContract, currentChainSelected])
  /**
   * @description Fetch BNB token address
   */
  useMemo(() => {
    if (signer === undefined || address === undefined) return
    fetchContractBNB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Get all token supported
   */
  const fetchAllTokenSupported = useCallback(async () => {
    const { ethereum }: any = window
    const _provider = new ethers.providers.Web3Provider(ethereum)
    const _signer = _provider.getSigner()
    const _address = await _signer.getAddress()
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []
    // TODO: Open after launch V2
    const tokens = await getAllTokenAddressInContract()
    // ONLY FOR BUSD TOKEN
    // const tokens = [CONFIGS.CONTRACT_ADDRESS.BEP20]
    for (let index = 0; index < tokens.length; index += 1) {
      const contract = new ethers.Contract(
        tokens[index],
        BEP20Abi.abi,
        _provider
      )
      allContract.push(contract)
    }
    if (_address.toLocaleLowerCase() === profile?.address.toLocaleLowerCase())
      await Promise.all(
        allContract.map(async (contract) => {
          const result = await getAllTokenInfoByContractAddress(
            contract,
            contract.address,
            _address
          )
          allTokenSupported.push(result)
        })
      )
    const allTokenSupportedSorted = allTokenSupported.sort((a, b) => {
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.symbol > b.symbol) {
        return 1
      }
      return 0
    })
    setChainSupport(allTokenSupportedSorted)
    setCurrentTokenSelected(
      allTokenSupportedSorted.find(
        (item) => item.symbol === "BUSD"
      ) as ITokenContract
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChainSupport])

  const fetchNAKAToken = useCallback(async () => {
    const { ethereum }: any = window
    const _provider = new ethers.providers.Web3Provider(ethereum)
    const _signer = _provider.getSigner()
    const _address = await _signer.getAddress()
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []
    const tokens = [CONFIGS.CONTRACT_ADDRESS.ERC20]
    for (let index = 0; index < tokens.length; index += 1) {
      const contract = new ethers.Contract(tokens[index], ERC20Abi, _provider)
      allContract.push(contract)
    }
    if (_signer === undefined || _address === undefined) return
    await Promise.all(
      allContract.map(async (contract) => {
        const result = await getNAKATokenInfo(
          contract,
          contract.address,
          _address
        )
        allTokenSupported.push(result)
      })
    )
    const allTokenSupportedSorted = allTokenSupported.sort((a, b) => {
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.symbol > b.symbol) {
        return 1
      }
      return 0
    })
    setChainSupport(allTokenSupportedSorted)
    // if (currentTokenSelected && currentTokenSelected?.address !== "") return
    if (currentTokenSelected !== chainSupport[0]) return
    setCurrentTokenSelected(allTokenSupportedSorted[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChainSupport, setCurrentTokenSelected])

  return {
    getTokenSupply,
    getDefaultCoin,
    getTokenAddress,
    fetchAllTokenSupported,
    fetchNAKAToken
  }
}

export default useSupportedChain
