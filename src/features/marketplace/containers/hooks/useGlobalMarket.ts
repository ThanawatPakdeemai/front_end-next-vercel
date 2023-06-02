import CONFIGS from "@configs/index"
import { TransactionResponse } from "@ethersproject/providers"
import useNFTBuilding from "@feature/building/containers/hooks/useNFTBuilding"
import {
  useERC20,
  useERC20NoAcc
} from "@feature/contract/containers/hooks/useContract"
import useNFTArcGame from "@feature/game/marketplace/containers/hooks/useNFTArcGame"
import useNFTLand from "@feature/land/containers/hooks/useNFTLand"
import {
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import useNFTPunk from "@feature/nakapunk/containers/hooks/useNFTPunk"
import { useWeb3Provider } from "@providers/Web3Provider"
import Helper from "@utils/helper"
import { BigNumberish, ethers, providers } from "ethers"
import { useCallback } from "react"

const useGlobalMarket = () => {
  const { signer, address } = useWeb3Provider()
  const { WeiToNumber, toWei } = Helper
  const { utils } = ethers
  const erc20Contract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)
  const erc20ContractNoAcc = useERC20NoAcc(CONFIGS.CONTRACT_ADDRESS.ERC20)
  const { onCheckApprovalLandForAll, isLandApprovedForAll } = useNFTLand()
  const { onCheckApprovalBuildingForAll, isBuildingApprovedForAll } =
    useNFTBuilding()
  const { onCheckApprovalPunkForAll, isPunkApprovedForAll } = useNFTPunk()
  const { onCheckApprovalArcGameForAll, isArcGameApprovedForAll } =
    useNFTArcGame()

  const checkAllowance = (_address: string, _tokenAddress: string) =>
    new Promise<BigNumberish>((resolve, reject) => {
      erc20ContractNoAcc
        .allowance(_address, _tokenAddress)
        .then((response: BigNumberish) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })

  // allow
  const allowContract = (_contract: string, _amount: BigNumberish) =>
    new Promise<TransactionResponse>((resolve, reject) => {
      erc20Contract
        .approve(_contract, _amount)
        .then((_response: TransactionResponse) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
        })
    })

  const checkAllowanceNaka = async (_contract: string, _price?: number) => {
    let _allowance: BigNumberish = "0"
    let _checkAllowance: boolean = false
    let _allowanceStatus: boolean = false
    const _priceValue = _price || 0
    if (signer && address) {
      await checkAllowance(address, _contract)
        .then(async (response) => {
          _allowance = (await response) as BigNumberish
          _checkAllowance = true
        })
        .catch((error) => console.error(error))
      if (_checkAllowance && WeiToNumber(_allowance) <= _priceValue) {
        await allowContract(_contract, toWei("180000000"))
          .then(async (response) => {
            _allowanceStatus = true
            const _res = await response.wait()
            const _enTopic = await utils.keccak256(
              utils.toUtf8Bytes("Approval(address,address,uint256)")
            )
            const _log = _res.logs.find((f) =>
              f.topics.find((l) => l === _enTopic)
            )
            if (_log) {
              const _resultEvent = utils.defaultAbiCoder.decode(
                ["uint256"],
                _log.data
              )
              _allowance = _resultEvent[0] as BigNumberish
            }
          })
          .catch((error) => console.error(error))
      } else {
        _allowanceStatus = true
      }
    }
    return { allowStatus: _allowanceStatus, allowance: _allowance }
  }

  const getContractAddrsByNFTType = (_type: TNFTType) => {
    let _contractAddrs: string = ""
    switch (_type) {
      case "nft_land":
        _contractAddrs = CONFIGS.CONTRACT_ADDRESS.LAND_NFT
        break
      case "nft_building":
        _contractAddrs = CONFIGS.CONTRACT_ADDRESS.BUILDING_NFT
        break
      case "nft_naka_punk":
        _contractAddrs = CONFIGS.CONTRACT_ADDRESS.NAKAPUNK_NFT
        break
      case "nft_game":
        _contractAddrs = CONFIGS.CONTRACT_ADDRESS.ARCADEGAME_NFT
        break
      default:
        break
    }
    return _contractAddrs
  }

  // check approve
  const onCheckNFTIsApproveForAll = async (
    _address: string,
    _contract: string,
    _type: TNFTType
  ) => {
    let _isApproved: boolean = false
    switch (_type) {
      case "nft_land":
        await onCheckApprovalLandForAll(_address, _contract, true).then(
          (response) => {
            _isApproved = response.isApproved
          }
        )
        break
      case "nft_building":
        await onCheckApprovalBuildingForAll(_address, _contract, true).then(
          (response) => {
            _isApproved = response.isApproved
          }
        )
        break
      case "nft_naka_punk":
        await onCheckApprovalPunkForAll(_address, _contract, true).then(
          (response) => {
            _isApproved = response.isApproved
          }
        )
        break
      case "nft_game":
        await onCheckApprovalArcGameForAll(_address, _contract, true).then(
          (response) => {
            _isApproved = response.isApproved
          }
        )
        break
      default:
        break
    }
    return { isApproved: _isApproved }
  }

  const getMarketContractBySelling = (_selling: TSellingType) => {
    let _contract: string | undefined
    switch (_selling) {
      case "fullpayment":
        _contract = CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT
        break
      case "installment":
        _contract = CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_INSTALL
        break
      case "rental":
        _contract = CONFIGS.CONTRACT_ADDRESS.MARKETPLACE_NFT_RENTAL
        break
      default:
        break
    }
    return _contract || ""
  }

  const onCheckAllowance = async (
    _type: TNFTType,
    _seller: TSellerType,
    _selling?: TSellingType
  ) => {
    let _contractAddrs: string | undefined
    let _allowance: BigNumberish = "0"
    let _allowStatus: boolean = false
    if (address) {
      switch (_type) {
        case "game_item": // no need to approve
          _allowStatus = true
          break
        case "nft_material": // no need to approve
          _allowStatus = true
          break
        case "nft_land":
          if (_seller === "system")
            _contractAddrs = CONFIGS.CONTRACT_ADDRESS.LAND_NFT
          else if (_selling)
            _contractAddrs = getMarketContractBySelling(_selling)
          break
        case "nft_building":
          if (_seller === "system")
            _contractAddrs = CONFIGS.CONTRACT_ADDRESS.BUILDING_NFT
          else if (_selling)
            _contractAddrs = getMarketContractBySelling(_selling)
          break
        case "nft_naka_punk":
          if (_seller === "system")
            _contractAddrs = CONFIGS.CONTRACT_ADDRESS.NAKAPUNK_NFT
          else if (_selling)
            _contractAddrs = getMarketContractBySelling(_selling)
          break
        case "nft_game":
          if (_seller === "system")
            _contractAddrs = CONFIGS.CONTRACT_ADDRESS.ARCADEGAME_NFT
          else if (_selling)
            _contractAddrs = getMarketContractBySelling(_selling)
          break
        default:
          break
      }
      if (_contractAddrs)
        await checkAllowance(address, _contractAddrs)
          .then((response) => {
            _allowance = response
          })
          .catch((error) => console.error(error))
      if (WeiToNumber(_allowance) > 0) _allowStatus = true
    }
    return { allowStatus: _allowStatus, allowance: WeiToNumber(_allowance) }
  }

  const onCheckApprovalForAllNFT = async (
    _NFTType: TNFTType,
    _selling: TSellingType
  ) => {
    let _contract = ""
    let _approve: boolean = false
    _contract = getMarketContractBySelling(_selling)
    if (address) {
      switch (_NFTType) {
        case "nft_land":
          await isLandApprovedForAll(address, _contract)
            .then((response) => {
              _approve = response
            })
            .catch((error) => console.error(error))
          break
        case "nft_building":
          await isBuildingApprovedForAll(address, _contract)
            .then((response) => {
              _approve = response
            })
            .catch((error) => console.error(error))

          break
        case "nft_naka_punk":
          await isPunkApprovedForAll(address, _contract)
            .then((response) => {
              _approve = response
            })
            .catch((error) => console.error(error))

          break
        case "nft_game":
          await isArcGameApprovedForAll(address, _contract)
            .then((response) => {
              _approve = response
            })
            .catch((error) => console.error(error))
          break
        default:
          break
      }
    }
    return _approve
  }

  const onCheckPolygonChain = useCallback(
    async (_contract: ethers.Contract) => {
      let contract: ethers.Contract = _contract
      let pass: boolean = false
      if (signer) {
        let new_signer: ethers.providers.JsonRpcSigner = signer
        const _provider = window.ethereum
        if (_provider && _provider.request) {
          try {
            await _provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: CONFIGS.CHAIN.CHAIN_ID_HEX }]
            })
            const _resetProvider = new providers.Web3Provider(_provider)
            new_signer = _resetProvider.getSigner()
            pass = true
          } catch (error: Error | any) {
            //
          }
        }
        contract = await _contract.connect(new_signer)
      }
      return { _contract: contract, _pass: pass }
    },
    [signer]
  )

  return {
    onCheckPolygonChain,
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll,
    onCheckAllowance,
    onCheckApprovalForAllNFT
  }
}

export default useGlobalMarket
