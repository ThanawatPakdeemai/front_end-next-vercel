import { DEFAULT_CURRENCY_BNB, DEFAULT_CURRENCY_NAKA } from "@configs/currency"
import CONFIGS from "@configs/index"
import { IFormData } from "@feature/buyItem/interfaces/IBuyItemService"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import useGetBalanceVault from "@feature/inventory/containers/hooks/useGetBalanceVault"
import { useToast } from "@feature/toast/containers"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import useAllBalances from "@hooks/useAllBalances"
import { ICurrencyResponse } from "@interfaces/ICurrency"
import useGameStore from "@stores/game"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import useWalletStore from "@stores/wallet"
import Helper from "@utils/helper"
import { useState } from "react"
import { useForm } from "react-hook-form"
import useBuyGameItems from "./useBuyGameItems"
import useCurrencyCheck from "./useCurrencyCheck"

interface IGameItemControllerProps {
  chainId: string
  handleClose?: () => void
}

const useBuyGameItemController = ({
  chainId,
  handleClose
}: IGameItemControllerProps) => {
  const [targetCoinPrice, setTargetCoinPrice] = useState<ICurrencyResponse>(
    {} as ICurrencyResponse
  )

  const profile = useProfileStore((state) => state.profile.data)
  const { mutateBuyItems, mutateBuyItemsBSC, isLoading } = useBuyGameItems()
  const { onResetBalance } = useWalletContoller()
  const { setOpen, setClose } = useLoadingStore()
  const { busdVaultBalance } = useAllBalances()
  const { setVaultBalance } = useWalletStore()
  const { errorToast, successToast } = useToast()
  const { dataBNBPrice } = useCurrencyCheck()
  const { balanceVaultNaka } = useGetBalanceVault(
    profile?.address ?? "",
    !!profile
  )

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      player_id: profile ? profile?.id : "",
      currency_id: "",
      qty: 1,
      item: {} as IGameItemListData,
      item_id: "",
      currency: {} as ITokenContract,
      nakaPerItem: 0
    }
  })

  const game = useGameStore((state) => state.data)
  const { gameItemList, refetch } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })

  /**
   * @description Message alert when user switch network
   * @returns {string}
   */
  const MessageAlert = (): string => {
    if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      return "You can switch your Metamask to Polygon network \n  to using your NAKA token to buy items"
    }
    return "You can switch your Metamask to BSC network \n to using another token to buy items"
  }

  const onSubmit = (_data: IFormData) => {
    setOpen("Blockchain transaction in progress...")
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        mutateBuyItemsBSC({
          _player_id: _data.player_id,
          _item_id: _data.item_id,
          _qty: Number(_data.qty),
          _tokenAddress: _data.currency.address,
          _symbol: _data.currency.symbol.toLocaleUpperCase()
        })
          .then((res) => {
            // TODO: check balance vault dynamic
            if (res && busdVaultBalance && busdVaultBalance.digit) {
              refetch()
              onResetBalance()
              successToast("Buy Items Success")
              setClose()
              if (handleClose) handleClose()
            }
          })
          .catch((error) => {
            errorToast(error.message)
            setClose()
          })
        break

      default:
        mutateBuyItems({
          _player_id: _data.player_id,
          _item_id: _data.item_id,
          _qty: Number(_data.qty)
        })
          .then((res) => {
            if (res && balanceVaultNaka && balanceVaultNaka.data) {
              refetch()
              setVaultBalance(Number(balanceVaultNaka.data))
              successToast("Buy Items Success")
              setClose()
              if (handleClose) handleClose()
            }
          })
          .catch((error) => {
            errorToast(error.message)
            setClose()
          })
        break
    }
  }

  const onError = () => {
    errorToast("Please fill in the required fields")
    setClose()
  }

  const targetCoin = (_tokenName: string): string => {
    switch (_tokenName) {
      case "BNB":
        return "BNBBUSD"
      case "BUSD":
        return "BUSDUSDT"
      default:
        return "BUSDUSDT"
    }
  }

  /**
   * @description Get target coin price
   * @param _targetCoin - "BNB" | "NAKA" | "BUSD | etc.
   */
  const fetchTargetCoin = (_targetCoin: string) => {
    // item.symbol
    const bnbPrice = dataBNBPrice
      ? dataBNBPrice.find((item) => item.symbol === targetCoin(_targetCoin))
      : null
    if (bnbPrice) {
      setTargetCoinPrice(bnbPrice)
    }
  }

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

  const getPriceByChainSelected = () =>
    // TODO: Check price by chain selected
    `${watch("nakaPerItem")} ${watch("currency").symbol}`
  // switch (chainId) {
  //   case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
  //     return `${targetCoinPrice.price} ${
  //       watch("currency").symbol ? watch("currency").symbol : "BNB"
  //     }`
  //   default:
  //     return `${watch("nakaPerItem")} NAKA`
  // }

  const updatePricePerItem = () => {
    // TODO: Check price per item by coin selected
    Helper.calculateItemPerPrice(
      (watch("item") as IGameItemListData).price
    ).then((res) => {
      if (res) {
        setValue("nakaPerItem", Number(res))
      } else {
        setValue("nakaPerItem", 0)
      }
    })
  }

  const onQtyUp = () => {
    setValue("qty", watch("qty") >= 99 ? 99 : Number(watch("qty")) + 1)
    updatePricePerItem()
  }

  const onQtyDown = () => {
    setValue("qty", watch("qty") <= 1 ? 1 : Number(watch("qty")) - 1)
    updatePricePerItem()
  }

  return {
    MessageAlert,
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    gameItemList,
    refetch,
    onSubmit,
    errors,
    onError,
    fetchTargetCoin,
    dataBNBPrice,
    game,
    isLoading,
    getPriceByChainSelected,
    getDefaultCoin,
    updatePricePerItem,
    onQtyUp,
    onQtyDown,
    targetCoinPrice
  }
}

export default useBuyGameItemController
