import { MESSAGES } from "@constants/messages"
import useMarketGameItem from "@feature/gameItem/marketplace/containers/hooks/useMarketGameItem"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import useMarketMaterial from "@feature/material/marketplace/containers/hooks/useMarketMaterial"
import useLoadingStore from "@stores/loading"
import Helper from "@utils/helper"
import useMarketNFT from "./useMarketNFT"
import useMarketNFTInstall from "./useMarketNFTInstall"
import useMarketNFTRent from "./useMarketNFTRent"
import useMutateMarketplace from "./useMutateMarketplace"

const useMarket = () => {
  const { setOpen, setClose } = useLoadingStore()
  const { mutateMintNFT, mutateMarketPurcPunkOrder } = useMutateMarketplace()
  const {
    onCreateGameItemOrder,
    onCancelGameItemOrder,
    onExecuteGameItemOrder
  } = useMarketGameItem()
  const {
    onCreateMaterialOrder,
    onCancelMaterialOrder,
    onExecuteMaterialOrder
  } = useMarketMaterial()
  const { onCreateNFTOrder, onCancelNFTOrder, onExecuteNFTOrder } =
    useMarketNFT()
  const {
    onCreateNFTInstallOrder,
    onCancelNFTInstallOrder,
    onExecuteNFTInstallOrder
  } = useMarketNFTInstall()
  const { onCreateNFTRentOrder, onCancelNFTRentOrder, onExecuteNFTRentOrder } =
    useMarketNFTRent()
  const { convertNFTTypeToUrl } = Helper

  const onCreateBySelling = async (
    _type: TNFTType,
    _selling: TSellingType,
    _itemId: string,
    _tokenId: string,
    _price: number,
    _amount: number,
    _period: number
  ) => {
    let _status: boolean = false
    switch (_selling) {
      case "fullpayment":
        _status = await onCreateNFTOrder(
          _type,
          _itemId,
          _tokenId,
          _price,
          _amount
        )
        break
      case "installment":
        _status = await onCreateNFTInstallOrder(
          _type,
          _itemId,
          _tokenId,
          _price,
          _amount
        )
        break
      case "rental":
        _status = await onCreateNFTRentOrder(
          _type,
          _itemId,
          _tokenId,
          _price,
          _amount,
          _period
        )
        break
      default:
        break
    }
    return _status
  }

  const onCreateOrder = async (
    _type: TNFTType,
    _selling: TSellingType,
    _itemId: string,
    _tokenId: string,
    _amount: number,
    _price: number,
    _period?: number
  ) => {
    let _status: boolean = false
    const periodValue = _period || 0
    switch (_type) {
      case "game_item":
        _status = await onCreateGameItemOrder(
          _itemId,
          _tokenId,
          _amount,
          _price
        )
        break
      case "nft_material":
        _status = await onCreateMaterialOrder(
          _itemId,
          _tokenId,
          _amount,
          _price
        )
        break
      case "nft_land":
        _status = await onCreateBySelling(
          _type,
          _selling,
          _itemId,
          _tokenId,
          _price,
          _amount,
          periodValue
        )
        break
      case "nft_building":
        _status = await onCreateBySelling(
          _type,
          _selling,
          _itemId,
          _tokenId,
          _price,
          _amount,
          periodValue
        )
        break
      case "nft_naka_punk":
        _status = await onCreateBySelling(
          _type,
          _selling,
          _itemId,
          _tokenId,
          _price,
          _amount,
          periodValue
        )
        break
      case "nft_game":
        _status = await onCreateBySelling(
          _type,
          _selling,
          _itemId,
          _tokenId,
          _price,
          _amount,
          periodValue
        )
        break
      default:
        break
    }
    return _status
  }

  const onCancelBySelling = async (
    _type: TNFTType,
    _selling: TSellingType,
    _orderId: string,
    _sellerID: string
  ) => {
    let _status: boolean = false
    switch (_selling) {
      case "fullpayment":
        _status = await onCancelNFTOrder(_type, _sellerID, _orderId)
        break
      case "installment":
        _status = await onCancelNFTInstallOrder(_type, _sellerID, _orderId)
        break
      case "rental":
        _status = await onCancelNFTRentOrder(_type, _sellerID, _orderId)
        break
      default:
        break
    }
    return _status
  }

  const onCancelOrder = async (
    _type: TNFTType,
    _selling: TSellingType,
    _orderId: string,
    _sellerId: string
  ) => {
    let _status: boolean = false
    switch (_type) {
      case "game_item":
        _status = await onCancelGameItemOrder(_sellerId, _orderId)
        break
      case "nft_material":
        _status = await onCancelMaterialOrder(_sellerId, _orderId)
        break
      case "nft_land":
        _status = await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_building":
        _status = await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_naka_punk":
        _status = await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_game":
        _status = await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      default:
        break
    }
    return _status
  }

  const onExeBySelling = async (
    _selling: TSellingType,
    _marketId: string,
    _itemId: string,
    _sellerId: string,
    _orderId: string,
    _amount: number,
    _period: number
  ) => {
    let _status: boolean = false
    switch (_selling) {
      case "fullpayment":
        _status = await onExecuteNFTOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "installment":
        _status = await onExecuteNFTInstallOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _period,
          _amount
        )
        break
      case "rental":
        _status = await onExecuteNFTRentOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _period,
          _amount
        )
        break
      default:
        break
    }
    return _status
  }

  const onMintOrder = async (
    _type: TNFTType,
    _marketId: string,
    _itemID: string,
    _amount: number
  ) => {
    let _status: boolean = false
    setOpen(MESSAGES.transaction_processing_order)
    if (_type === "nft_naka_punk") {
      await mutateMarketPurcPunkOrder({ _qty: _amount })
      _status = true
    } else {
      await mutateMintNFT({
        _urlNFT: convertNFTTypeToUrl(_type),
        _marketplaceId: _marketId,
        _itemAmount: _amount
      })
      _status = true
    }
    setClose()
    return _status
  }

  const onExecuteOrder = async (
    _type: TNFTType,
    _selling: TSellingType,
    _marketId: string,
    _itemId: string,
    _sellerId: string,
    _orderId: string,
    _amount: number,
    _period?: number
  ) => {
    let _status: boolean = false
    const periodValue = _period || 0
    switch (_type) {
      case "game_item":
        _status = await onExecuteGameItemOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "nft_material":
        _status = await onExecuteMaterialOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "nft_land":
        _status = await onExeBySelling(
          _selling,
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount,
          periodValue
        )
        break
      case "nft_building":
        _status = await onExeBySelling(
          _selling,
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount,
          periodValue
        )
        break
      case "nft_naka_punk":
        _status = await onExeBySelling(
          _selling,
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount,
          periodValue
        )
        break
      case "nft_game":
        _status = await onExeBySelling(
          _selling,
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount,
          periodValue
        )
        break
      default:
        break
    }
    return _status
  }
  return {
    onCreateOrder,
    onCancelOrder,
    onMintOrder,
    onExecuteOrder
  }
}

export default useMarket
