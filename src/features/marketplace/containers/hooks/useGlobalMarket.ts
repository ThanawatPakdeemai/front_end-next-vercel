import CONFIGS from "@configs/index"
import { TransactionResponse } from "@ethersproject/providers"
import useNFTBuilding from "@feature/building/containers/hooks/useNFTBuilding"
import {
  useERC20,
  useERC20NoAcc
} from "@feature/contract/containers/hooks/useContract"
import useNFTArcGame from "@feature/game/marketplace/containers/hooks/useNFTArcGame"
import useNFTLand from "@feature/land/containers/services/hooks/useNFTLand"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import useNFTPunk from "@feature/nakapunk/containers/hooks/useNFTPunk"
import { useWeb3Provider } from "@providers/Web3Provider"
import Helper from "@utils/helper"
import { BigNumberish, ethers } from "ethers"

const useGlobalMarket = () => {
  const { signer, address } = useWeb3Provider()
  const { WeiToNumber, toWei } = Helper
  const { utils } = ethers
  const erc20Contract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)
  const erc20ContractNoAcc = useERC20NoAcc(CONFIGS.CONTRACT_ADDRESS.ERC20)
  const { onCheckApprovalLandForAll } = useNFTLand()
  const { onCheckApprovalBuildingForAll } = useNFTBuilding()
  const { onCheckApprovalPunkForAll } = useNFTPunk()
  const { onCheckApprovalArcGameForAll } = useNFTArcGame()

  const checkAllowance = (_address: string, _tokenAddress: string) =>
    new Promise((resolve, reject) => {
      erc20ContractNoAcc
        .allowance(_address, _tokenAddress)
        .then((_response: string) => {
          resolve(_response)
        })
        .catch((_error: Error) => {
          reject(_error)
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

  return {
    checkAllowanceNaka,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll
  }
}

export default useGlobalMarket
