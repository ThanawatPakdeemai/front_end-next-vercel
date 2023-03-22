import { useMemo } from "react"
import {
  getAllGameItemContract,
  getAllLandContract,
  getBalanceVaultBinanceContract,
  getBalanceVaultContract,
  getBEP20Contract,
  getERC20Contract,
  getFlexibleStakingContract,
  getInventoryVaultContract,
  getItemVaultContract,
  getMarketGameItemContract,
  getMarketMaterialContract,
  getMarketNFTContract,
  getMarketNFTInstallContract,
  getMarketNFTRentContract,
  getMaterialVaultContract,
  getNFTArcGameContract,
  getNFTBuildingContract,
  getNFTLandContract,
  getNFTPunkContract,
  getP2PBinanceContract,
  getP2PBinanceMumbaiContract,
  getP2PPolygonContract,
  getP2PPolygonMumbaiContract,
  getShopContract,
  getStakingContract,
  getUserGameItemsContract
} from "@feature/contract/containers/contractHelpers"
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import web3NoAccount from "@utils/web3"

export const useBalanceVault = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getBalanceVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useBalanceVaultBinance = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getBalanceVaultBinanceContract(_address, _provider),
    [_address, _provider]
  )

export const useBEP20 = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) => useMemo(() => getBEP20Contract(_address, _provider), [_address, _provider])

export const useERC20 = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) => useMemo(() => getERC20Contract(_address, _provider), [_address, _provider])

export const useERC20NoAcc = (_address: string) =>
  useMemo(() => getERC20Contract(_address, web3NoAccount), [_address])

export const useFlexibleStaking = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getFlexibleStakingContract(_address, _provider),
    [_address, _provider]
  )

export const useFlexibleStakingNoAccount = (_address: string) =>
  useMemo(() => getFlexibleStakingContract(_address, web3NoAccount), [_address])

export const useInventoryVault = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getInventoryVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useItemVault = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getItemVaultContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PBinance = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PBinanceContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PBinanceMumbai = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PBinanceMumbaiContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PPolygon = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PPolygonContract(_address, _provider),
    [_address, _provider]
  )

export const useP2PPolygonMumbai = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getP2PPolygonMumbaiContract(_address, _provider),
    [_address, _provider]
  )

export const useShop = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) => useMemo(() => getShopContract(_address, _provider), [_address, _provider])

export const useStaking = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(() => getStakingContract(_address, _provider), [_address, _provider])

export const useStakingNoAccount = (_address: string) =>
  useMemo(() => getStakingContract(_address, web3NoAccount), [_address])

export const useUserGameItems = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getUserGameItemsContract(_address, _provider),
    [_address, _provider]
  )

export const useMaterialVault = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMaterialVaultContract(_address, _provider),
    [_address, _provider]
  )
export const useMaterialVaultNoAccount = (_address: string) =>
  useMemo(() => getMaterialVaultContract(_address, web3NoAccount), [_address])

// marketplace
export const useMarketplaceGameItems = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMarketGameItemContract(_address, _provider),
    [_address, _provider]
  )
export const useMarketplaceGameItemsNoAccount = (_address: string) =>
  useMemo(() => getMarketGameItemContract(_address, web3NoAccount), [_address])

export const useMarketplaceMaterial = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMarketMaterialContract(_address, _provider),
    [_address, _provider]
  )
export const useMarketplaceMaterialNoAccount = (_address: string) =>
  useMemo(() => getMarketMaterialContract(_address, web3NoAccount), [_address])

export const useMarketplaceNFT = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMarketNFTContract(_address, _provider),
    [_address, _provider]
  )
export const useMarketplaceNFTNoAccount = (_address: string) =>
  useMemo(() => getMarketNFTContract(_address, web3NoAccount), [_address])

export const useMarketplaceNFTInstall = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMarketNFTInstallContract(_address, _provider),
    [_address, _provider]
  )
export const useMarketplaceNFTInstallNoAccount = (_address: string) =>
  useMemo(
    () => getMarketNFTInstallContract(_address, web3NoAccount),
    [_address]
  )

export const useMarketplaceNFTRent = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getMarketNFTRentContract(_address, _provider),
    [_address, _provider]
  )
export const useMarketplaceNFTRentNoAccount = (_address: string) =>
  useMemo(() => getMarketNFTRentContract(_address, web3NoAccount), [_address])

// nft
export const useArcGameNFT = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getNFTArcGameContract(_address, _provider),
    [_address, _provider]
  )
export const useArcGameNFTNoAccount = (_address: string) =>
  useMemo(() => getNFTArcGameContract(_address, web3NoAccount), [_address])

export const useBuildingNFT = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(
    () => getNFTBuildingContract(_address, _provider),
    [_address, _provider]
  )
export const useBuildingNFTNoAccount = (_address: string) =>
  useMemo(() => getNFTBuildingContract(_address, web3NoAccount), [_address])

export const useLandNFT = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(() => getNFTLandContract(_address, _provider), [_address, _provider])
export const useLandNFTNoAccount = (_address: string) =>
  useMemo(() => getNFTLandContract(_address, web3NoAccount), [_address])

export const usePunkNFT = (
  _provider: Web3Provider | JsonRpcSigner | undefined,
  _address: string
) =>
  useMemo(() => getNFTPunkContract(_address, _provider), [_address, _provider])
export const usePunkNFTNoAccount = (_address: string) =>
  useMemo(() => getNFTPunkContract(_address, web3NoAccount), [_address])

export const useGetAllGameItemofAddrs = (_address: string) =>
  useMemo(() => getAllGameItemContract(_address, web3NoAccount), [_address])
export const useGetAllLandofAddrs = (_address: string) =>
  useMemo(() => getAllLandContract(_address, web3NoAccount), [_address])
