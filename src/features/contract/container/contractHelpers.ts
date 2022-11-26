import simpleRpcProvider from "@src/utils/web3"
import { ethers, ContractInterface } from "ethers"
// ABI
import BalanceVaultAbi from "@src/configs/abi/BalanceVault.json"
import BEP20Abi from "@src/configs/abi/BEP20.json"
import ERC20Abi from "@src/configs/abi/ERC20.json"
import FlexibleStakingAbi from "@src/configs/abi/FlexibleStaking.json"
import InventoryVaultAbi from "@src/configs/abi/InventoryVault.json"
import ItemVaultAbi from "@src/configs/abi/ItemVault.json"
import P2PBinanceAbi from "@src/configs/abi/P2PBinance.json"
import P2PBinanceMumbaiAbi from "@src/configs/abi/P2PBinanceMumbai.json"
import P2PPolygonAbi from "@src/configs/abi/P2PPolygon.json"
import P2PPolygonMumbaiAbi from "@src/configs/abi/P2PPolygonMumbai.json"
import ShopAbi from "@src/configs/abi/Shop.json"
import StakingAbi from "@src/configs/abi/Staking.json"
import UserGameItemsAbi from "@src/configs/abi/UserGameItems.json"
import { Web3Provider } from "@ethersproject/providers"

export const getContract = (
  abi: ContractInterface,
  address: string,
  _provider?: Web3Provider | ethers.providers.JsonRpcProvider
) => {
  const _web3 = _provider ?? simpleRpcProvider

  return new ethers.Contract(address, abi, _web3)
}

export const getBalanceVaultContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(BalanceVaultAbi.abi, address, web3)

export const getBEP20Contract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(BEP20Abi.abi, address, web3)

export const getERC20Contract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(ERC20Abi, address, web3)

export const getFlexibleStakingContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(FlexibleStakingAbi.abi, address, web3)

export const getInventoryVaultContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(InventoryVaultAbi.abi, address, web3)

export const getItemVaultContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(ItemVaultAbi.abi, address, web3)

export const getP2PBinanceContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(P2PBinanceAbi.abi, address, web3)

export const getP2PBinanceMumbaiContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(P2PBinanceMumbaiAbi.abi, address, web3)

export const getP2PPolygonContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(P2PPolygonAbi.abi, address, web3)

export const getP2PPolygonMumbaiContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(P2PPolygonMumbaiAbi.abi, address, web3)

export const getShopContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(ShopAbi.abi, address, web3)

export const getStakingContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(StakingAbi.abi, address, web3)

export const getUserGameItemsContract = (
  address: string,
  web3?: Web3Provider | ethers.providers.JsonRpcProvider
) => getContract(UserGameItemsAbi.abi, address, web3)
