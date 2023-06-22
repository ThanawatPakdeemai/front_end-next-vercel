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
import { useToast } from "@feature/toast/containers"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { BigNumberish, ethers, providers } from "ethers"
import { useCallback } from "react"

const useGlobalMarket = () => {
  const { signer, address } = useWeb3Provider()
  const { WeiToNumber, toWei } = Helper
  const { utils } = ethers
  const profile = useProfileStore()
  const { errorToast } = useToast()
  const erc20Contract = useERC20(signer, CONFIGS.CONTRACT_ADDRESS.ERC20)
  const erc20ContractNoAcc = useERC20NoAcc(CONFIGS.CONTRACT_ADDRESS.ERC20)
  const { onCheckApprovalLandForAll, isLandApprovedForAll, isLandOwner } =
    useNFTLand()
  const {
    onCheckApprovalBuildingForAll,
    isBuildingApprovedForAll,
    isBuildingOwner
  } = useNFTBuilding()
  const { onCheckApprovalPunkForAll, isPunkApprovedForAll, isPunkOwner } =
    useNFTPunk()
  const {
    onCheckApprovalArcGameForAll,
    isArcGameApprovedForAll,
    isArcGameOwner
  } = useNFTArcGame()

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

  const getContractByNFTType = (
    _type: TNFTType,
    _seller: TSellerType,
    _selling?: TSellingType
  ) => {
    let _contractAddrs: string = ""
    let _allowStatus: boolean = false
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
        else if (_selling) _contractAddrs = getMarketContractBySelling(_selling)
        break
      case "nft_building":
        if (_seller === "system")
          _contractAddrs = CONFIGS.CONTRACT_ADDRESS.BUILDING_NFT
        else if (_selling) _contractAddrs = getMarketContractBySelling(_selling)
        break
      case "nft_naka_punk":
        if (_seller === "system")
          _contractAddrs = CONFIGS.CONTRACT_ADDRESS.NAKAPUNK_NFT
        else if (_selling) _contractAddrs = getMarketContractBySelling(_selling)
        break
      case "nft_game":
        if (_seller === "system")
          _contractAddrs = CONFIGS.CONTRACT_ADDRESS.ARCADEGAME_NFT
        else if (_selling) _contractAddrs = getMarketContractBySelling(_selling)
        break
      case "nft_avatar":
        _contractAddrs = CONFIGS.CONTRACT_ADDRESS.REEF_CONTRACT
        break
      default:
        break
    }
    return { _allowStatus, _contractAddrs }
  }

  const checkAllowanceNaka = async (
    _type: TNFTType,
    _seller: TSellerType,
    _price: number,
    _selling?: TSellingType
  ) => {
    const _contract = await getContractByNFTType(_type, _seller, _selling)
    let _allowance: number = 0
    let _checkAllowance: boolean = false
    let _allowanceStatus: boolean = _contract._allowStatus
    const _priceValue = _price || 0
    if (
      signer &&
      address &&
      _contract._contractAddrs &&
      !_contract._allowStatus
    ) {
      await checkAllowance(address, _contract._contractAddrs)
        .then((response) => {
          _allowance = WeiToNumber(response as BigNumberish)
          _checkAllowance = true
        })
        .catch((error) => console.error(error))
      if (_checkAllowance && _allowance >= _priceValue) {
        _allowanceStatus = true
      } else {
        _allowanceStatus = false
      }
    }
    return _allowanceStatus
  }

  const onCheckAllowance = async ({
    _type,
    _seller,
    _selling,
    _price
  }: {
    _type: TNFTType
    _seller: TSellerType
    _selling?: TSellingType
    _price: number
  }) => {
    let _contractAddrs: string | undefined
    let _allowance: number = 0
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
        case "nft_avatar":
          _contractAddrs = CONFIGS.CONTRACT_ADDRESS.REEF_CONTRACT
          break
        default:
          break
      }
      if (_allowStatus) {
        return { allowStatus: _allowStatus, allowance: WeiToNumber(_allowance) }
      }
      if (_contractAddrs) {
        await checkAllowance(address, _contractAddrs)
          .then((response) => {
            _allowance = WeiToNumber(response as BigNumberish)
          })
          .catch((error) => console.error(error))
        if (_allowance >= _price) _allowStatus = true
        else
          await allowContract(_contractAddrs, toWei(_price.toString()))
            .then(async (response) => {
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
                _allowance = WeiToNumber(_resultEvent[0] as BigNumberish)
                if (_allowance >= _price) {
                  _allowStatus = true
                }
              }
            })
            .catch((error) => console.error(error))
      }
    }
    if (!_allowStatus) {
      errorToast("allowance less than price")
    }
    return { allowStatus: _allowStatus, allowance: _allowance }
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

  const { price: nakaPrice } = useNakaPriceProvider()

  const calcNakaPrice = useCallback(
    (price: number, amount?: number, isUSD?: boolean) => {
      const _amount = amount || 1
      let _result: number = 0
      if (nakaPrice && nakaPrice.last) {
        _result = price * _amount
        if (isUSD) _result /= parseFloat(nakaPrice.last)
      }
      return _result
    },
    [nakaPrice]
  )

  const calcUSDPrice = useCallback(
    (price: number, amount?: number) => {
      const _amount = amount || 1
      let _result: number = 0
      if (nakaPrice && nakaPrice.last) {
        _result = price * _amount * parseFloat(nakaPrice.last)
      }
      return _result
    },
    [nakaPrice]
  )

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

  const onCheckOwnerNFT = useCallback(
    async (_type: TNFTType, _token: string) => {
      let _status: boolean = false
      switch (_type) {
        case "nft_land":
          await isLandOwner(_token)
            .then((_res) => {
              _status = _res.toLowerCase() === profile.address?.toLowerCase()
            })
            .catch(() => {})
          break
        case "nft_building":
          await isBuildingOwner(_token)
            .then((_res) => {
              _status = _res.toLowerCase() === profile.address?.toLowerCase()
            })
            .catch(() => {})
          break
        case "nft_game":
          await isArcGameOwner(_token)
            .then((_res) => {
              _status = _res.toLowerCase() === profile.address?.toLowerCase()
            })
            .catch(() => {})
          break
        case "nft_naka_punk":
          await isPunkOwner(_token)
            .then((_res) => {
              _status = _res.toLowerCase() === profile.address?.toLowerCase()
            })
            .catch(() => {})
          break
        default:
          break
      }
      return _status
    },
    [isArcGameOwner, isBuildingOwner, isLandOwner, isPunkOwner, profile.address]
  )

  return {
    checkAllowanceNaka,
    onCheckOwnerNFT,
    onCheckPolygonChain,
    getContractAddrsByNFTType,
    onCheckNFTIsApproveForAll,
    onCheckAllowance,
    onCheckApprovalForAllNFT,
    // calcNAKAPrice,
    calcUSDPrice,
    calcNakaPrice
  }
}

export default useGlobalMarket
