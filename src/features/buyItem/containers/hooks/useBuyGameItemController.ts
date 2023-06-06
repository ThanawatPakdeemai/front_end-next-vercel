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
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import useGameStore from "@stores/game"
import useLoadingStore from "@stores/loading"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { JsonRpcSigner } from "@ethersproject/providers"
import useSupportedChain from "@hooks/useSupportedChain"
import { useWeb3Provider } from "@providers/Web3Provider"
import useChainSupportStore from "@stores/chainSupport"
import { useRouter } from "next/router"
import useGetBalanceOf from "@feature/inventory/containers/hooks/useGetBalanceOf"
import { ELocalKey } from "@interfaces/ILocal"
import { MESSAGES } from "@constants/messages"
import useGlobal from "@hooks/useGlobal"
import useShareToEarnTracking from "@feature/game/containers/hooks/useShareToEarnTracking"
import useBuyGameItems from "./useBuyGameItems"

const useBuyGameItemController = () => {
  const profile = useProfileStore((state) => state.profile.data)
  const { mutateShareToEarnTracking } = useShareToEarnTracking()
  const { stateProfile } = useGlobal()
  const { mutateBuyItems, mutateBuyItemsBSC, isLoading } = useBuyGameItems()
  const { setOpen, setClose } = useLoadingStore()
  const { errorToast, successToast } = useToast()
  const { data, onSetGameItemSelectd, itemSelected } = useGameStore()
  const { chainId, accounts, signer, address } = useWeb3Provider()
  const { chainSupport } = useChainSupportStore()
  const { fetchNAKAToken, fetchAllTokenSupported } = useSupportedChain()
  const { price } = useNakaPriceProvider()
  const router = useRouter()
  const { id: itemSizeId } = router.query

  const game = useGameStore((state) => state.data)
  const { gameItemList, refetch } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })

  // const { gameItemList } = useGamesByGameId({
  //   _playerId: profile ? profile.id : "",
  //   _gameId: gameObject ? gameObject._id : ""
  // })

  // State
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)

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

  const { balanceofItem, refetch: refetchBalanceofItem } = useGetBalanceOf({
    _address: profile?.address ?? "",
    _item_id: itemSelected?.item_id_smartcontract ?? 0
  })

  const updatePricePerItem = useCallback(async () => {
    Helper.calculateItemPerPrice(
      (watch("item") as IGameItemListData)?.price,
      (price as ICurrentNakaData)?.last
    ).then((res) => {
      if (res) {
        setValue("nakaPerItem", Number(res))
      } else {
        setValue("nakaPerItem", 0)
      }
    })
    // TODO: Open after launch V2
    /* if (chainId === CONFIGS.CHAIN.CHAIN_ID_HEX) {
      Helper.calculateItemPerPrice(
        (watch("item") as IGameItemListData)?.price,
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
        (watch("item") as IGameItemListData)?.price,
        (watch("currency") as ITokenContract)?.symbol
      ).then((res) => {
        if (res) {
          setValue("nakaPerItem", Number(res))
        } else {
          setValue("nakaPerItem", 0)
        }
      })
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chainId,
    setValue,
    watch,
    price,
    address,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch("item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    watch("currency")
  ])

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
    // resetForm()
  }

  const refetchItemSelected = useCallback(() => {
    refetch().then((_item: any) => {
      const _value = itemSizeId ? (itemSizeId as string) : watch("item_id")
      if (_item) {
        const item = _item?.data?.find((ele) => ele.id === _value)

        if (item) {
          onSetGameItemSelectd(item)
          handleClose()
        }
        refetchBalanceofItem()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSetGameItemSelectd, refetch, watch, itemSizeId, router])

  /**
   * Get code from local storage
   */
  const getCodeFromLocalStorage = (): string => {
    // Check has share to earn code in local storage
    const shareToEarnCodeLocal = Helper.getLocalStorage(
      ELocalKey.shareToEarnCode
    )
    if (shareToEarnCodeLocal) {
      return shareToEarnCodeLocal
    }
    return ""
  }

  const onSubmit = (_data: IFormData) => {
    setOpen("Blockchain transaction in progress...")

    // console.log("code", code)
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
            _data.currency.symbol === "BNBT" ? "BNB" : _data.currency.symbol, // coinName()
          _code: getCodeFromLocalStorage()
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
          _qty: Number(_data.qty),
          _code: getCodeFromLocalStorage()
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

  const getCodeShareToEarn = useCallback(() => {
    const gameId = data?.id
    const codeId = router.asPath.substring(
      router.asPath.indexOf("?af") + 3,
      router.asPath.lastIndexOf("")
    )

    if (
      gameId &&
      stateProfile &&
      stateProfile.id &&
      codeId &&
      router.asPath.includes("?af")
    ) {
      mutateShareToEarnTracking({
        player_id: stateProfile.id,
        game_id: gameId,
        code: codeId
      })
        .then((_res) => {
          if (_res) {
            const expireTime = _res.data.time_expires
            Helper.setLocalStorage({
              key: ELocalKey.shareToEarn,
              value: expireTime
            })
            Helper.setLocalStorage({
              key: ELocalKey.shareToEarnCode,
              value: codeId
            })
            // Hide toast share success
            // successToast(MESSAGES.get_link_share_success)
          }
        })
        .catch(() => {
          const str = router.asPath
          const index = str.indexOf("?af")
          const href = index !== -1 ? str.substring(0, index) : str
          Helper.removeLocalStorage(ELocalKey.shareToEarn)
          router.push(href)
          errorToast(MESSAGES.get_link_share_not_success)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, data, router, stateProfile])

  const handleTimeExpire = () => {
    const expireTimeShare = Helper.getLocalStorage(ELocalKey.shareToEarn)
    if (expireTimeShare && expireTimeShare !== "") {
      const timeStampNow = Date.now()
      const timeStampExp = Number(expireTimeShare)
      if (timeStampExp) {
        if (timeStampExp <= timeStampNow) {
          const str = router.asPath
          const index = str.indexOf("?af")
          const href = index !== -1 ? str.substring(0, index) : str
          Helper.removeLocalStorage(ELocalKey.shareToEarn)
          Helper.removeLocalStorage(ELocalKey.shareToEarnCode)
          router.push(href)

          errorToast(MESSAGES.commission_expired)
        }
        // Hide toast commission not expired
        /* else {
          successToast(MESSAGES.commission_not_expired)
        } */
      }
    }
  }

  const isDisabled = useMemo(() => {
    updatePricePerItem()
    const _totalPrice = watch("nakaPerItem") * watch("qty")

    if (
      Object.keys(watch("currency") ?? [])?.length !== 0 &&
      Object.keys(watch("item") ?? [])?.length !== 0 &&
      watch("qty") > 0 &&
      _totalPrice <= watch("currency")?.balanceVault?.digit &&
      _totalPrice > 0 &&
      Object.keys((accounts as string[]) ?? [])?.length > 0 &&
      Object.keys((signer as JsonRpcSigner) ?? [])?.length > 0
    ) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, signer, watch, watch("currency"), watch("nakaPerItem")])

  const isHideOnWaitingRoom =
    router.pathname !== "/[typeGame]/[GameHome]/roomlist/[id]"
  const isWaitingRoom =
    router.pathname === "/[typeGame]/[GameHome]/roomlist/[id]"

  const getListItemDefalut = useMemo(() => {
    if (profile && gameItemList) {
      gameItemList?.sort((a, b) => a.price - b.price)
      return gameItemList[0]
    }
  }, [gameItemList, profile])

  const itemSelect = useMemo(() => {
    if (itemSelected) {
      if (gameItemList) {
        const item = gameItemList.find((ele) => ele._id === itemSelected._id)
        return item
      }
      return itemSelected
    }
  }, [gameItemList, itemSelected])

  const qtyItemSelected = useMemo(() => {
    if (profile) {
      if (itemSelect) {
        return itemSelect.qty
      }
      if (itemSelected) {
        return itemSelected.qty
      }
      if (getListItemDefalut) {
        const dataItem = getListItemDefalut as IGameItemListData
        setTotalPrice(
          Number(
            Helper.formatNumber((dataItem?.qty ?? 0) * (dataItem?.price ?? 0), {
              maximumFractionDigits: 4
            })
          )
        )
        onSetGameItemSelectd(dataItem)
        return dataItem?.qty ?? 0
      }
    }
    return 0
  }, [
    getListItemDefalut,
    itemSelect,
    itemSelected,
    onSetGameItemSelectd,
    profile
  ])

  const priceItemSelected = useMemo(() => {
    if (profile) {
      if (itemSelect) {
        return itemSelect.price
      }
      if (itemSelected) {
        return itemSelected.price
      }
    }
    return 0
  }, [itemSelect, itemSelected, profile])

  const getTotalPriceItemSelectProfile = useCallback(async () => {
    if (profile) {
      if (itemSelected) {
        if (price && qtyItemSelected) {
          setTotalPrice(
            Number(
              Helper.formatNumber(qtyItemSelected * priceItemSelected, {
                maximumFractionDigits: 4
              })
            )
          )
        } else {
          setTotalPrice(
            Number(
              Helper.formatNumber(qtyItemSelected * priceItemSelected, {
                maximumFractionDigits: 4
              })
            )
          )
        }
      }
    }
  }, [profile, itemSelected, price, qtyItemSelected, priceItemSelected])

  useEffect(() => {
    let load = false

    if (!load) {
      if (itemSelected) getTotalPriceItemSelectProfile()
    }

    return () => {
      load = true
    }
  }, [getTotalPriceItemSelectProfile, itemSelected])

  const onChangeSelectItem = (_item: IGameItemListData) => {
    onSetGameItemSelectd(_item as IGameItemListData)
    if (_item.qty < 1) {
      errorToast(MESSAGES["you-don't-have-item"])
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (game) {
        const item_name = game.item && 0 in game.item ? game.item[0].name : 0
        const item_selected = itemSelect ? itemSelect?.name : 1
        if (item_name !== item_selected) {
          onSetGameItemSelectd(null)
        }
      }
    }

    return () => {
      load = true
    }
  }, [game, itemSelect, onSetGameItemSelectd])

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
    signer,
    refetchItemSelected,
    balanceofItem,
    handleTimeExpire,
    getCodeShareToEarn,
    qtyItemSelected,
    isHideOnWaitingRoom,
    onChangeSelectItem,
    totalPrice,
    isWaitingRoom
  }
}

export default useBuyGameItemController
