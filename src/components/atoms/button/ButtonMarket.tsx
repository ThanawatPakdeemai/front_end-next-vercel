import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormLogin from "@feature/authentication/components/FormLogin"
import useMarketGameItem from "@feature/gameItem/marketplace/containers/hooks/useMarketGameItem"
import useMutateMarketplace from "@feature/marketplace/containers/hooks/useMutateMarketplace"
import {
  IMarketData,
  TNFTType,
  TSellerType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button, Stack, TextField } from "@mui/material"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import Helper from "@utils/helper"
import React, { memo, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface IMarketButton {
  _nftType: TNFTType
  _marketId?: string
  _itemID?: string
  _orderId?: string
  _sellerType?: TSellerType
  _sellerId?: string
  _marketplaces_data?: IMarketData[] | null
}

type IForm = {
  tokenId?: string
  amount?: number
  price?: string
}

type TAction =
  | "cancel"
  | "mint"
  | "buy"
  | "sell"
  | "login"
  | "connect_wallet"
  | undefined

const ButtonMarket = ({
  _nftType,
  _marketId,
  _itemID,
  _orderId,
  _sellerType, // p2p
  _sellerId, // p2p
  _marketplaces_data // inventory
}: IMarketButton) => {
  const { profile } = useProfileStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { address: account, handleConnectWithMetamask } = useWeb3Provider()
  const { register, handleSubmit, reset } = useForm<IForm>()
  const {
    onCreateGameItemOrder,
    onCancelGameItemOrder,
    onPurchaseGameItemOrder
  } = useMarketGameItem()
  const { mutateMarketPurcOrder } = useMutateMarketplace()
  const { t } = useTranslation()
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const actionValue = useMemo(() => {
    let _action: TAction
    if (!profile.data) {
      _action = "login"
    } else if (!account) {
      _action = "connect_wallet"
    } else if (_sellerType) {
      if (_sellerType === "user" && _sellerId) {
        if (profile.data.address === _sellerId) {
          _action = "cancel"
        } else {
          _action = "buy"
        }
      } else if (_sellerType === "system") {
        _action = "mint"
      }
    } else if (_marketplaces_data) {
      _action = "cancel"
    } else {
      _action = "sell"
    }
    return _action
  }, [profile.data, account, _sellerType, _sellerId, _marketplaces_data])

  const textBtn = useMemo(() => {
    let _text: string = "loading"
    switch (actionValue) {
      case "login":
        _text = "please login"
        break
      case "connect_wallet":
        _text = "connect wallet action"
        break
      case "mint":
        _text = "mint action"
        break
      case "buy":
        _text = "buy action"
        break
      case "cancel":
        _text = "cancel action"
        break
      case "sell":
        _text = "sell action"
        break
      default:
        _text = "loading"
        break
    }
    return _text
  }, [actionValue])

  const onSubmit = handleSubmit(async (data) => {
    console.error(data)
    switch (actionValue) {
      case "cancel":
        if (_orderId && _sellerId) {
          await onCancelGameItemOrder(_orderId, _sellerId)
        } else {
          console.error(`order: ${_orderId}, sellerAcc: ${_sellerId}`)
        }
        break
      case "sell":
        if (data.tokenId && data.amount && data.price) {
          await onCreateGameItemOrder(
            data.tokenId,
            data.amount,
            Helper.toWei(data.price.toString())
          )
        } else
          console.error(
            `token: ${data.tokenId}, amount: ${data.amount}, price: ${data.price}`
          )
        break
      case "buy":
        if (_marketId && _itemID && _sellerId && _orderId && data.amount) {
          await onPurchaseGameItemOrder(
            _marketId,
            _itemID,
            _sellerId,
            _orderId,
            data.amount
          )
        } else
          console.error(
            `id: ${_marketId}, idItem: ${_itemID}, selllerAcc: ${_sellerId}, order: ${_orderId}, amount: ${data.amount}`
          )
        break
      case "mint":
        if (_marketId && _itemID && data.amount) {
          await mutateMarketPurcOrder({
            _marketplaceId: _marketId,
            _itemId: _itemID,
            _itemAmount: data.amount
          })
        } else
          console.error(
            `id: ${_marketId}, idItem: ${_itemID}, amount: ${data.amount}`
          )
        break
      default:
        console.error(`Action not found!`)
        break
    }
  })

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className="h-10 w-20"
        onClick={handleOpen}
      >
        {textBtn}
      </Button>
      <ModalCustom
        open={isOpen}
        onClose={handleClose}
        title={textBtn}
        className="w-auto gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <>
          {actionValue === "login" ? (
            <Stack
              spacing={3}
              className="md:p-5"
            >
              <ModalHeader
                handleClose={handleClose}
                title="Login"
              />

              <FormLogin />
            </Stack>
          ) : null}
          {actionValue === "connect_wallet" ? (
            <div className="flex h-96 w-96 flex-col items-center bg-secondary-main">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleConnectWithMetamask}
              >
                {t("Connect Wallet")}
              </Button>
            </div>
          ) : null}
          {actionValue !== "login" && actionValue !== "connect_wallet" ? (
            <div className="flex h-96 w-96 flex-col items-center bg-secondary-main">
              <form onSubmit={onSubmit}>
                <TextField
                  type="string"
                  placeholder="enter your price"
                  autoComplete="off"
                  sx={{
                    "& input[type=number]": {
                      MozAppearance: "textfield"
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    }
                  }}
                  {...register("tokenId")}
                />
                <TextField
                  type="number"
                  placeholder="enter your amount"
                  autoComplete="off"
                  sx={{
                    "& input[type=number]": {
                      MozAppearance: "textfield"
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    }
                  }}
                  {...register("amount")}
                />
                {/* <TextField
              type="number"
              placeholder="enter your price"
              sx={{
                "& input[type=number]": {
                  "-moz-appearance": "textfield"
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0
                }
              }}
              {...register("price")}
            /> */}
                {/* <Controller
              rules={{ pattern: /^[0-9]+(\.[0-9]{1,4})?$/g }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  placeholder="enter your price"
                  sx={{
                    "& input[type=number]": {
                      MozAppearance: "textfield"
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    }
                  }}
                />
              )}
              control={control}
              name="price"
              defaultValue={1}
            /> */}
                <TextField
                  type="string"
                  placeholder="enter your amount"
                  autoComplete="off"
                  sx={{
                    "& input[type=number]": {
                      MozAppearance: "textfield"
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0
                    }
                  }}
                  {...register("price", {
                    pattern: {
                      value: /^[0-9]+(\.[0-9]{1,4})?$/,
                      message: "Entered value does not match email format"
                    }
                  })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {textBtn}
                </Button>
              </form>
            </div>
          ) : null}
        </>
      </ModalCustom>
    </>
  )
}
export default memo(ButtonMarket)
