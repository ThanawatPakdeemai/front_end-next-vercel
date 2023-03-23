import FormLogin from "@feature/authentication/components/FormLogin"
import useMarket from "@feature/marketplace/containers/hooks/useMarket"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import {
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button, Divider, Stack } from "@mui/material"
import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { ModalCustom } from "./ModalCustom"
import ModalHeader from "./ModalHeader"

const SellActionComp = dynamic(
  () => import("@components/molecules/Modal/SellActionComponent"),
  {
    suspense: true,
    ssr: false
  }
)
const BuyActionComponent = dynamic(
  () => import("@components/molecules/Modal/BuyActionComponent"),
  {
    suspense: true,
    ssr: false
  }
)
const ReceiptComp = dynamic(
  () => import("@components/molecules/Modal/ReceiptComponent"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProps {
  nftType: TNFTType
  open: boolean
  onClose: () => void
  action: TMarketAction
  name: string
  priceValue?: number
  periodValue?: number
  amount?: number
  maxPeriod?: number
  maxAmount?: number
  tokenId?: string
  marketId?: string
  itemId?: string
  orderId?: string
  sellerId?: string
  sellerType?: TSellerType
  sellingType?: TSellingType
}

const ModalMarket = ({
  nftType,
  open,
  onClose,
  action,
  name,
  priceValue = 0,
  periodValue = 0,
  amount = 0,
  maxPeriod = 1,
  // maxAmount = 0,
  tokenId,
  marketId,
  itemId,
  orderId,
  sellerId,
  sellerType,
  sellingType = "fullpayment"
}: IProps) => {
  const currencyRef = useRef<boolean>(false)
  const { getPriceNakaCurrent } = Helper
  const [price, setPrice] = useState<number>(priceValue)
  const [period, setPeriod] = useState<number>(periodValue)
  const [selling, setSelling] = useState<TSellingType>(sellingType)
  const [currency, setCurrency] = useState<number>(0)

  const { handleSubmit } = useForm()
  const { onCreateOrder, onCancelOrder, onMintOrder, onExecuteOrder } =
    useMarket()

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    setPrice(_value)
  }

  useEffect(() => {
    const onSetCurrency = async () => {
      await getPriceNakaCurrent().then((response) => {
        setCurrency(Number(response.last))
      })
    }
    if (!currencyRef.current) onSetCurrency()
    return () => {
      currencyRef.current = true
    }
  }, [getPriceNakaCurrent])

  const titleModal = useMemo(() => {
    let _title: string | undefined
    switch (action) {
      case "buy":
        _title = `: ${name}`
        break
      case "cancel":
        _title = `: ${name}`
        break
      case "sell":
        _title = `: ${name}`
        break
      default:
        break
    }
    if (_title) return `${action} ${_title}`
    return undefined
  }, [action, name])

  const textBtn = useMemo(() => {
    let _text: string = "loading"
    switch (action) {
      case "login":
        _text = "login"
        break
      case "connect_wallet":
        _text = "connect wallet action"
        break
      case "mint":
        _text = "mint now"
        break
      case "buy":
        _text = "buy now"
        break
      case "cancel":
        _text = "cancel now"
        break
      case "sell":
        _text = "sell now"
        break
      default:
        _text = "loading"
        break
    }
    return _text
  }, [action])

  const onSubmit = handleSubmit(async () => {
    switch (action) {
      case "cancel":
        if (orderId && sellerId && sellingType) {
          await onCancelOrder(nftType, sellingType, orderId, sellerId)
        } else {
          console.error(
            `sellingType:${sellingType}, order: ${orderId}, sellerAcc: ${sellerId}`
          )
        }
        break
      case "sell":
        if (tokenId && itemId && amount && priceValue) {
          await onCreateOrder(
            nftType,
            sellingType,
            itemId,
            tokenId,
            amount,
            priceValue
          )
        } else
          console.error(`marketAmount: ${amount}, marketPrice: ${priceValue}`)
        break
      case "buy":
        if (
          marketId &&
          itemId &&
          sellerId &&
          sellerType &&
          orderId &&
          amount &&
          period
        ) {
          await onExecuteOrder(
            nftType,
            sellingType,
            marketId,
            itemId,
            sellerId,
            orderId,
            amount,
            period
          )
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, selllerAcc: ${sellerId}, order: ${orderId}, orderPeriod: ${period}`
          )
        break
      case "mint":
        if (marketId && itemId && price) {
          await onMintOrder(nftType, marketId, itemId, price)
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, marketAmount: ${price}`
          )
        break
      default:
        console.error(`Action not found!`)
        break
    }
  })

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title={titleModal}
      className="rounded-[34px]"
      width={action === "login" ? 400 : 680}
    >
      <>
        {action === "login" ? (
          <Stack
            spacing={3}
            className="md:p-5"
          >
            <ModalHeader
              handleClose={onClose}
              title="Login"
            />
            <FormLogin />
          </Stack>
        ) : null}
        {action !== "login" ? (
          <div className="grid h-96 w-full grid-cols-1 items-center gap-2 md:grid-cols-2">
            <div className="flex h-full min-h-[320px] w-full flex-col gap-2">
              <div className="h-full w-full rounded-xl bg-secondary-main" />
              <div className="flex w-full flex-col gap-2 rounded-xl border border-neutral-800/75 p-6 uppercase text-neutral-500">
                <div className="flex w-full flex-row items-center justify-between">
                  <span>token id:</span>
                  <span>11100240</span>
                </div>
                <Divider className="!block border-b-[1px] border-neutral-800/75" />
                <div className="flex w-full flex-row items-center justify-between">
                  <span>plot:</span>
                  <span>205, 11</span>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-2 px-4 py-2">
              {action === "sell" &&
              nftType !== "game_item" &&
              nftType !== "nft_material" ? (
                <SellActionComp
                  nftType={nftType}
                  selling={selling}
                  setSelling={setSelling}
                  currency={currency}
                  price={price}
                  onPriceChange={onPriceChange}
                  period={period}
                  setPeriod={setPeriod}
                  maxPeriod={365}
                />
              ) : null}
              {action === "buy" &&
              nftType !== "game_item" &&
              nftType !== "nft_material" ? (
                <BuyActionComponent
                  nftType={nftType}
                  selling={selling}
                  currency={currency}
                  price={price}
                  period={period}
                  setPeriod={setPeriod}
                  maxPeriod={maxPeriod}
                />
              ) : null}
              {action === "cancel" ||
              nftType === "game_item" ||
              nftType === "nft_material" ? (
                <ReceiptComp
                  nftType={nftType}
                  name={name}
                  tokenId={tokenId}
                  orderId={orderId}
                  amount={amount}
                  price={periodValue}
                  selling={
                    nftType === "game_item" || nftType === "nft_material"
                      ? undefined
                      : sellingType
                  }
                  period={
                    nftType === "game_item" || nftType === "nft_material"
                      ? undefined
                      : maxPeriod
                  }
                />
              ) : null}
              <form
                onSubmit={onSubmit}
                className="flex flex-grow items-center justify-center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="h-10 w-full"
                >
                  {textBtn}
                </Button>
              </form>
            </div>
          </div>
        ) : null}
      </>
    </ModalCustom>
  )
}

export default memo(ModalMarket)
