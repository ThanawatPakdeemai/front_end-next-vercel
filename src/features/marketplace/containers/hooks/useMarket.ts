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
    switch (_selling) {
      case "fullpayment":
        await onCreateNFTOrder(_type, _itemId, _tokenId, _price, _amount)
        break
      case "installment":
        await onCreateNFTInstallOrder(_type, _itemId, _tokenId, _price, _amount)
        break
      case "rental":
        await onCreateNFTRentOrder(
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
    const periodValue = _period || 0
    switch (_type) {
      case "game_item":
        await onCreateGameItemOrder(_itemId, _tokenId, _amount, _price)
        break
      case "nft_material":
        await onCreateMaterialOrder(_itemId, _tokenId, _amount, _price)
        break
      case "nft_land":
        await onCreateBySelling(
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
        await onCreateBySelling(
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
        await onCreateBySelling(
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
        await onCreateBySelling(
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
  }

  const onCancelBySelling = async (
    _type: TNFTType,
    _selling: TSellingType,
    _orderId: string,
    _sellerID: string
  ) => {
    switch (_selling) {
      case "fullpayment":
        await onCancelNFTOrder(_type, _sellerID, _orderId)
        break
      case "installment":
        await onCancelNFTInstallOrder(_type, _orderId)
        break
      case "rental":
        await onCancelNFTRentOrder(_type, _orderId)
        break
      default:
        break
    }
  }

  const onCancelOrder = async (
    _type: TNFTType,
    _selling: TSellingType,
    _orderId: string,
    _sellerId: string
  ) => {
    switch (_type) {
      case "game_item":
        await onCancelGameItemOrder(_sellerId, _orderId)
        break
      case "nft_material":
        await onCancelMaterialOrder(_sellerId, _orderId)
        break
      case "nft_land":
        await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_building":
        await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_naka_punk":
        await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      case "nft_game":
        await onCancelBySelling(_type, _selling, _orderId, _sellerId)
        break
      default:
        break
    }
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
    switch (_selling) {
      case "fullpayment":
        await onExecuteNFTOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "installment":
        await onExecuteNFTInstallOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _period,
          _amount
        )
        break
      case "rental":
        await onExecuteNFTRentOrder(
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
  }

  const onMintOrder = async (
    _type: TNFTType,
    _marketId: string,
    _itemID: string,
    _amount: number
  ) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (_type === "nft_naka_punk") {
      await mutateMarketPurcPunkOrder({ _qty: _amount }).finally(() =>
        setClose()
      )
    } else {
      await mutateMintNFT({
        _urlNFT: convertNFTTypeToUrl(_type),
        _marketplaceId: _marketId,
        _itemAmount: _amount
      }).finally(() => setClose())
    }
    // setClose()
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
    const periodValue = _period || 0
    switch (_type) {
      case "game_item":
        await onExecuteGameItemOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "nft_material":
        await onExecuteMaterialOrder(
          _marketId,
          _itemId,
          _sellerId,
          _orderId,
          _amount
        )
        break
      case "nft_land":
        await onExeBySelling(
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
        await onExeBySelling(
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
        await onExeBySelling(
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
        await onExeBySelling(
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
  }
  return {
    onCreateOrder,
    onCancelOrder,
    onMintOrder,
    onExecuteOrder
  }
}

export default useMarket
