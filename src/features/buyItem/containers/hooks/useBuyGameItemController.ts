import CONFIGS from "@configs/index"
import {
  ErrorType,
  IFormData
} from "@feature/buyItem/interfaces/IBuyItemService"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import { IGameItemListData } from "@feature/gameItem/interfaces/IGameItemService"
import { ICurrentNakaData } from "@feature/inventory/interfaces/IInventoryService"
import { useToast } from "@feature/toast/containers"
import useGlobal from "@hooks/useGlobal"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import useChainSupport from "@stores/chainSupport"
import useGameStore from "@stores/game"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import useBuyGameItems from "./useBuyGameItems"

const useBuyGameItemController = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { mutateBuyItems, mutateBuyItemsBSC, isLoading } = useBuyGameItems()
  const { setOpen, setClose } = useLoadingStore()
  const { errorToast, successToast } = useToast()
  const { data, onSetGameItemSelectd, itemSelected } = useGameStore()
  const { chainId, accounts, signer } = useSwitchNetwork()
  const { chainSupport } = useChainSupport()
  const { fetchNAKAToken, fetchAllTokenSupported } = useGlobal()
  const { price } = useNakaPriceProvider()

  const game = useGameStore((state) => state.data)
  const { gameItemList, refetch } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })
  // State
  const [openForm, setOpenForm] = useState<boolean>(false)

  const DEFAULT_VALUES: IFormData = {
    player_id: profile ? profile?.id : "",
    currency: {} as ITokenContract,
    currency_id: "",
    qty: 1,
    item: itemSelected || ({} as IGameItemListData),
    item_id: itemSelected?._id ?? "",
    nakaPerItem: 0
  }

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    getFieldState,
    register,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: DEFAULT_VALUES
  })
  const isDisabled = (): boolean => {
    const totalPrice = watch("nakaPerItem") * watch("qty")
    if (
      Object.keys(watch("currency")).length !== 0 &&
      Object.keys(watch("item")).length !== 0 &&
      watch("qty") > 0 &&
      totalPrice <= watch("currency").balanceVault.digit &&
      totalPrice > 0 &&
      accounts &&
      signer
    ) {
      return false
    }
    return true
  }

  /**
   * @description Message alert when user switch network
   * @returns {string}
   */
  const MessageAlert = (): string => {
    const tokenSopport = chainSupport.map((item) => item.symbol)
    if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX_BNB) {
      return `You can switch your Metamask to Polygon network \n  to using your token for example, ${tokenSopport} to buy items`
    }
    return `You can switch your Metamask to BSC network \n to using another token for example, ${tokenSopport} to buy items`
  }

  const onError = () => {
    errorToast("Please fill in the required fields")
    setClose()
  }

  const updatePricePerItem = useCallback(async () => {
    if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
      Helper.calculateItemPerPrice(
        (watch("item") as IGameItemListData).price,
        (price as ICurrentNakaData)?.last
      ).then((res) => {
        if (res) {
          setValue("nakaPerItem", Number(res))
        } else {
          setValue("nakaPerItem", 0)
        }
      })
    } else {
      Helper.calPriceBinanceChain(
        (watch("item") as IGameItemListData).price,
        (watch("currency") as ITokenContract).symbol
      ).then((res) => {
        if (res) {
          setValue("nakaPerItem", Number(res))
        } else {
          setValue("nakaPerItem", 0)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, setValue, watch])

  const onQtyUp = useCallback(() => {
    setValue("qty", watch("qty") >= 99 ? 99 : Number(watch("qty")) + 1)
    updatePricePerItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onQtyDown = useCallback(() => {
    setValue("qty", watch("qty") <= 1 ? 1 : Number(watch("qty")) - 1)
    updatePricePerItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getErrorMessages = (name: ErrorType) => {
    const error = errors[name]
    if (error) {
      switch (error.type) {
        case "required":
          return `${name} is required`
        case "min":
          return `${name} must be greater than ${error.min}`
        case "max":
          return `${name} must be less than ${error.max}`
        case "pattern":
          return `${name} is invalid`
        default:
          return ""
      }
    }
    return ""
  }

  const resetForm = useCallback(() => {
    reset(DEFAULT_VALUES)
    const hasChainSupport = chainSupport && chainSupport.length > 0
    const hasGameItemList =
      (gameItemList as IGameItemListData[]) &&
      (gameItemList as IGameItemListData[]).length > 0
    if (hasChainSupport && hasGameItemList) {
      setValue("currency", chainSupport[0] as ITokenContract)

      setValue(
        "item",
        (gameItemList as IGameItemListData[])[0] as IGameItemListData
      )
      setValue("item_id", (gameItemList as IGameItemListData[])[0].id as string)
      updatePricePerItem()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainSupport])

  const handleClose = () => {
    setOpenForm(false)
  }

  const handleOpen = () => {
    setOpenForm(true)
    resetForm()
  }

  const refetchItemSelected = useCallback(() => {
    refetch().then((_item: any) => {
      if (_item) {
        const item = _item?.data?.find((ele) => ele.id === watch("item_id"))

        if (item) {
          onSetGameItemSelectd(item)
          handleClose()
        }
      }
    })
  }, [onSetGameItemSelectd, refetch, watch])

  const onSubmit = (_data: IFormData) => {
    setOpen("Blockchain transaction in progress...")
    // const coinName = (): string => {
    //   switch (
    //     _data.currency.symbol &&
    //     _data.currency.symbol.toLocaleUpperCase()
    //   ) {
    //     case "BNB":
    //     case "BNBT":
    //       return "BNBBUSD"
    //     default:
    //       return `BNB${_data.currency.symbol.toLocaleUpperCase()}`
    //   }
    // }
    switch (chainId) {
      case CONFIGS.CHAIN.CHAIN_ID_HEX_BNB:
        mutateBuyItemsBSC({
          _player_id: _data.player_id,
          _item_id: _data.item_id,
          _qty: Number(_data.qty),
          _tokenAddress: _data.currency.address,
          _symbol:
            _data.currency.symbol === "BNBT" ? "BNB" : _data.currency.symbol // coinName()
        })
          .then(async (res) => {
            // res && _data.currency.balanceVault.digit
            fetchAllTokenSupported()
            if (res && _data.currency.balanceVault.digit) {
              await refetch()
              await refetchItemSelected()
              successToast("Buy Items Success")
              setClose()
              handleClose()
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
          .then(async (res) => {
            // res && balanceVaultNaka && balanceVaultNaka.data
            fetchNAKAToken()
            if (res && _data.currency.balanceVault.digit) {
              await refetch()
              await refetchItemSelected()
              // setVaultBalance(Number(balanceVaultNaka.data))
              successToast("Buy Items Success")
              setClose()
              handleClose()
            }
          })
          .catch((error) => {
            errorToast(error.message)
            setClose()
          })
        break
    }
  }

  // useEffect(() => {
  // resetForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chainSupport, gameItemList, resetForm, fetchNAKAToken])

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
    // fetchTargetCoin,
    game,
    isLoading,
    updatePricePerItem,
    onQtyUp,
    onQtyDown,
    itemSelected,
    onSetGameItemSelectd,
    gameStore: data,
    setOpenForm,
    openForm,
    handleClose,
    handleOpen,
    getValues,
    getFieldState,
    getErrorMessages,
    resetForm,
    chainSupport,
    isDisabled,
    chainId,
    accounts,
    signer
  }
}

export default useBuyGameItemController
