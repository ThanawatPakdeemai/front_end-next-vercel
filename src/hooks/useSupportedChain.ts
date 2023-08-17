import React, { useCallback, useEffect, useMemo } from "react"
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
import useChainSupportStore from "@stores/chainSupport"
import useProfileStore from "@stores/profileStore"
import { useWeb3Provider } from "@providers/Web3Provider"

const useSupportedChain = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { getBNBContract, getAllTokenAddressInContract } =
    useContractVaultBinance()
  const { getAllTokenInfoByContractAddress } = useContractVaultBinance()
  const {
    currentChainSelected,
    setChainSupport,
    setContractBNB,
    setCurrentTokenSelected
  } = useChainSupportStore()
  const { chainId, provider, address, signer } = useWeb3Provider()
  const { getNAKATokenInfo } = useContractVault()

  // ! NEED IMPLEMENT
  const memoChainId = React.useMemo(() => chainId, [chainId])
  const memoProvider = React.useMemo(() => provider, [provider])
  const memoAddress = React.useMemo(() => address, [address])
  const memoSigner = React.useMemo(() => signer, [signer])

  /**
   * @description Get default currency
   * @returns {ITokenContract[]}
   */
  const getDefaultCoin = (): ITokenContract[] => {
    switch (memoChainId) {
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
    if (memoSigner === undefined || memoAddress === undefined) return
    fetchContractBNB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * @description Get all token supported BSC only
   */
  const fetchAllTokenSupported = useCallback(async () => {
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []

    // TODO: Open after binance smart chain is ready
    // const tokens = await getAllTokenAddressInContract()
    // TODO: Delete this after binance smart chain is ready

    const tokens =
      currentChainSelected === "0x61"
        ? await getAllTokenAddressInContract()
        : [CONFIGS.CONTRACT_ADDRESS.BEP20]

    for (let index = 0; index < tokens.length; index += 1) {
      const contract = new ethers.Contract(
        tokens[index],
        BEP20Abi.abi,
        memoProvider
      )
      allContract.push(contract)
    }
    if (
      memoAddress &&
      memoAddress.toLocaleLowerCase() === profile?.address.toLocaleLowerCase()
    )
      await Promise.all(
        allContract.map(async (contract) => {
          const result = await getAllTokenInfoByContractAddress(
            contract,
            contract.address,
            memoAddress
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
    if (!(memoProvider && memoSigner && memoAddress)) return
    const allContract: Contract[] = []
    const allTokenSupported: ITokenContract[] = []
    const tokens = [CONFIGS.CONTRACT_ADDRESS.ERC20]
    for (let index = 0; index < tokens.length; index += 1) {
      const contract = new ethers.Contract(
        tokens[index],
        ERC20Abi,
        memoProvider
      )
      allContract.push(contract)
    }
    if (memoSigner === undefined || memoAddress === undefined) return
    await Promise.all(
      allContract.map(async (contract) => {
        const result = await getNAKATokenInfo(
          contract,
          contract.address,
          memoAddress
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
    setCurrentTokenSelected(allTokenSupportedSorted[0])
    // if (currentTokenSelected && currentTokenSelected?.address !== "") return
    // if (currentTokenSelected !== chainSupport[0]) return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoAddress, memoProvider, memoSigner])

  useEffect(() => {
    let load = false
    if (!load) {
      fetchNAKAToken()
    }
    return () => {
      load = true
    }
  }, [fetchNAKAToken])

  return {
    getTokenSupply,
    getDefaultCoin,
    getTokenAddress,
    fetchAllTokenSupported,
    fetchNAKAToken
  }
}

export default useSupportedChain
