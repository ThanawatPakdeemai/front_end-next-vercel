import { useMemo } from "react"
import {
  getBalanceVaultContract,
  getBEP20Contract,
  getERC20Contract,
  getFlexibleStakingContract,
  getInventoryVaultContract,
  getItemVaultContract,
  getP2PBinanceContract,
  getP2PBinanceMumbaiContract,
  getP2PPolygonContract,
  getP2PPolygonMumbaiContract,
  getShopContract,
  getStakingContract,
  getUserGameItemsContract
} from "@feature/contract/containers/contractHelpers"
import { Web3Provider } from "@ethersproject/providers"
import web3NoAccount from "@utils/web3"

export const useBalanceVault = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getBalanceVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useBEP20 = (
  _provider: Web3Provider | undefined,
  _address: string
) => useMemo(() => getBEP20Contract(_address, _provider), [_address, _provider])

export const useERC20 = (
  _provider: Web3Provider | undefined,
  _address: string
) => useMemo(() => getERC20Contract(_address, _provider), [_address, _provider])

export const useFlexibleStaking = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getFlexibleStakingContract(_address, _provider),
    [_address, _provider]
  )

export const useFlexibleStakingNoAccount = (_address: string) =>
  useMemo(() => getFlexibleStakingContract(_address, web3NoAccount), [_address])

export const useInventoryVault = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getInventoryVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useItemVault = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getItemVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PBinance = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PBinanceContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PBinanceMumbai = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PBinanceMumbaiContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PPolygon = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PPolygonContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PPolygonMumbai = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PPolygonMumbaiContract(_address, _provider),
    [_address, _provider]
  )

export const useShop = (
  _provider: Web3Provider | undefined,
  _address: string
) => useMemo(() => getShopContract(_address, _provider), [_address, _provider])

export const useStaking = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(() => getStakingContract(_address, _provider), [_address, _provider])

export const useStakingNoAccount = (_address: string) =>
  useMemo(() => getStakingContract(_address, web3NoAccount), [_address])

export const useUserGameItems = (
  _provider: Web3Provider | undefined,
  _address: string
) =>
  useMemo(
    () => getUserGameItemsContract(_address, _provider),
    [_address, _provider]
  )
