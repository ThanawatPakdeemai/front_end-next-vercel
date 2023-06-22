import FormLogin from "@feature/authentication/components/FormLogin"
import useMarket from "@feature/marketplace/containers/hooks/useMarket"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import {
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button, Divider, Stack, Typography } from "@mui/material"
import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { IPosition } from "@feature/land/interfaces/ILandService"
import Video from "@components/atoms/Video"
import { NextRouter, useRouter } from "next/router"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import { useInventoryProvider } from "@providers/InventoryProvider"
import MagicIcon from "@components/icons/MagicIcon"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import { ModalCustom } from "./ModalCustom"

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
  img: string
  vdo?: string
  orderPrice?: number
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
  plot?: IPosition
}

const ModalMarket = ({
  nftType,
  open,
  onClose,
  action,
  name,
  img,
  vdo,
  orderPrice,
  maxPeriod = 1,
  maxAmount = 0,
  tokenId,
  marketId,
  itemId,
  orderId,
  sellerId,
  sellerType = "user",
  sellingType = "fullpayment",
  plot
}: IProps) => {
  const currencyRef = useRef<boolean>(false)
  const { getPriceNakaCurrent, convertNFTTypeToTType } = Helper
  const [selling, setSelling] = useState<TSellingType>(sellingType)
  const [currency, setCurrency] = useState<number>(0)

  const router: NextRouter = useRouter()

  const { handleSubmit } = useForm()
  const { onCreateOrder, onCancelOrder, onMintOrder, onExecuteOrder } =
    useMarket()
  const { calcNakaPrice } = useGlobalMarket()

  const [sellNFTPrice, setSellNFTPrice] = useState<string>("")

  const {
    invenItemData,
    invPrice,
    invPeriod,
    invAmount,
    setInvPeriod,
    updateInvenNFTMarketData
  } = useInventoryProvider()

  const { marketPeriod, marketAmount, setMarketPeriod } =
    useMarketplaceProvider()

  const onPriceChange = (value: string) => {
    setSellNFTPrice(value)
  }

  const onPeriodChange = (value: number) => {
    if (setInvPeriod) setInvPeriod(value)
    if (setMarketPeriod) setMarketPeriod(value)
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
        if (sellingType === "rental") _text = "rent now"
        else _text = "buy now"
        break
      case "cancel":
        _text = "cancel now"
        break
      case "sell":
        _text = "sell now"
        break
      case "rent_out":
        _text = "rentout now"
        break
      default:
        _text = "loading"
        break
    }
    return _text
  }, [action, sellingType])

  const handleStyle = useMemo(() => {
    let _color: string
    let _textColor: string
    let _icon: React.ReactNode
    switch (action) {
      case "login":
        _color = "#7B5BE6"
        _textColor = "#E1E2E2"
        break
      case "connect_wallet":
        _color = "#7B5BE6"
        _textColor = "#E1E2E2"
        break
      case "buy":
        _color = "#A0ED61"
        _textColor = "#010101"
        break
      case "cancel":
        _color = "#F42728"
        _textColor = "#010101"
        break
      case "mint":
        _color = nftType === "nft_naka_punk" ? "#A0ED61" : "#27F1EC"
        _textColor = "#010101"
        _icon = <MagicIcon />
        break
      case "sell":
        _color = "#F42728"
        _textColor = "#010101"
        break
      default:
        _color = "#27F1EC"
        _textColor = "#010101"
        break
    }
    return { bgColor: _color, txtColor: _textColor, icon: _icon }
  }, [action, nftType])

  const onSubmit = handleSubmit(async () => {
    switch (action) {
      case "cancel":
        if (orderId && sellerId && selling && sellerType === "user") {
          // this function allow sellerType = user only
          await onCancelOrder(nftType, selling, orderId, sellerId)
            .then((_res) => {
              // if _res is true mean cancel success
              if (_res) {
                let _path: string | undefined
                // inventory || forsale || ...
                if (router.asPath.includes("/inventory")) {
                  // refetch data or replace data
                  if (nftType === "game_item" || nftType === "nft_material") {
                    _path = `/marketplace/inventory/${convertNFTTypeToTType(
                      nftType
                    )}`
                  } else if (invenItemData && updateInvenNFTMarketData) {
                    // update data from response
                    updateInvenNFTMarketData(undefined, nftType)
                  }
                } else {
                  // p2p
                  _path = `/marketplace/p2p/${convertNFTTypeToTType(nftType)}`
                }
                if (_path) {
                  return router.replace(_path, undefined, { shallow: true })
                }
              }
            })
            .catch(async (_err) => console.error(_err))
            .finally(() => {
              setTimeout(() => onClose(), 3000)
            })
        } else {
          console.error(
            `selling:${selling}, order: ${orderId}, sellerAcc: ${sellerId}, sellerType:${sellerType}`
          )
        }
        break
      case "buy":
        if (
          marketId &&
          itemId &&
          sellerId &&
          sellerType &&
          orderId &&
          marketAmount &&
          marketPeriod &&
          orderPrice
        ) {
          await onExecuteOrder(
            nftType,
            selling,
            marketId,
            itemId,
            sellerId,
            orderId,
            orderPrice,
            marketAmount,
            marketPeriod
          ).then((_res) => {
            if (_res)
              return router.replace(
                `/marketplace/${
                  sellerType === "system" ? "" : "p2p"
                }/${convertNFTTypeToTType(nftType)}`,
                undefined,
                { shallow: true }
              )
          })
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, selllerAcc: ${sellerId}, order: ${orderId}, orderPeriod: ${marketPeriod}`
          )
        break
      case "mint":
        if (orderPrice && marketAmount) {
          await onMintOrder({
            _type: nftType,
            _marketId: marketId,
            _price: calcNakaPrice(orderPrice, marketAmount, true),
            _amount: marketAmount
          }).then((_res) => {
            if (_res)
              return router.replace(
                `/marketplace/${convertNFTTypeToTType(nftType)}`,
                undefined,
                { shallow: true }
              )
          })
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, price: ${orderPrice}, amount:${marketAmount}`
          )
        break
      default: {
        // sell & rentout
        if (
          (action === "sell" || action === "rent_out") &&
          tokenId &&
          itemId &&
          invAmount &&
          (Number(sellNFTPrice) > 0 || invPrice)
        ) {
          const _price =
            Number(sellNFTPrice) > 0 ? Number(sellNFTPrice) : invPrice || 0
          const _selling = action === "rent_out" ? "rental" : selling
          await onCreateOrder(
            nftType,
            _selling,
            itemId,
            tokenId,
            invAmount,
            _price,
            invPeriod
          ).then((_res) => {
            if (router.asPath.includes("/inventory")) {
              return
            }
            // no effect because redirect when cancel on page != inventory
            const _path = `/marketplace/inventory/${convertNFTTypeToTType(
              nftType
            )}/${itemId}`
            if (_path) {
              return router.replace(_path, undefined, { shallow: true })
            }
          })
        } else
          console.error(
            `action:${action}, tokenId:${tokenId}, itemId:${itemId}, marketAmount: ${invAmount}, marketPrice: ${
              Number(sellNFTPrice) > 0 || invPrice
            }`
          )
        break
      }
    }
    onClose()
  })

  return (
    <ModalCustom
      className="max-w-full sm:min-w-[280px]"
      open={open}
      onClose={onClose}
      titleNode={
        <>
          <Typography
            className="uppercase"
            sx={{ color: handleStyle.bgColor }}
          >
            {`${action} :`}
          </Typography>
          <Typography className="ml-1 uppercase text-neutral-300">{`${name}`}</Typography>
        </>
      }
      width={action === "login" ? 400 : 680}
      hideNakaIcon
    >
      <div className="rounded-lg">
        <Stack
          spacing={3}
          className="md:py-5"
        >
          {action === "login" ? <FormLogin /> : null}
          {action !== "login" ? (
            <div className="grid w-full grid-cols-1 items-center gap-11 md:grid-cols-2">
              <div className="flex h-full min-h-[320px] w-full flex-col gap-2">
                <div className="relative flex h-full max-h-full w-full flex-col items-center justify-center">
                  <Video
                    poster={img}
                    src={vdo || ""}
                    autoPlay
                    disableOnClick
                    className="rounded-xl object-cover"
                  />
                </div>
                <div
                  className={`${
                    tokenId || plot ? "flex" : "hidden"
                  } w-full flex-col gap-2 rounded-xl border border-neutral-800/75 p-6 uppercase text-neutral-500`}
                >
                  {tokenId ? (
                    <div className="flex w-full flex-row items-center justify-between text-sm font-bold">
                      <span>token id :</span>
                      <span className="text-neutral-300">{tokenId}</span>
                    </div>
                  ) : null}
                  {plot ? (
                    <>
                      <Divider className="!block border-b-[1px] border-neutral-800/75" />
                      <div className="flex w-full flex-row items-center justify-between text-sm font-bold">
                        <span>plot :</span>
                        <span className="text-neutral-300">
                          {plot.x}, {plot.y}
                        </span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="flex h-full w-full flex-col gap-2 px-4 py-2">
                {(action === "sell" || action === "rent_out") &&
                nftType !== "game_item" &&
                nftType !== "nft_material" &&
                nftType !== "nft_naka_punk" &&
                nftType !== "nft_avatar" &&
                nftType !== "nft_game" ? (
                  <SellActionComp
                    nftType={nftType}
                    selling={selling}
                    setSelling={setSelling}
                    currency={currency}
                    // price={invPrice || undefined}
                    // onPriceChange={onPriceChange}
                    price={sellNFTPrice}
                    onPriceChange={onPriceChange}
                    period={invPeriod || 1}
                    setPeriod={onPeriodChange}
                    maxPeriod={365}
                    isRentout={action === "rent_out"}
                  />
                ) : null}
                {action === "buy" &&
                orderPrice &&
                nftType !== "game_item" &&
                nftType !== "nft_material" &&
                nftType !== "nft_naka_punk" &&
                nftType !== "nft_avatar" ? (
                  <BuyActionComponent
                    nftType={nftType}
                    seller={sellerType}
                    selling={selling}
                    currency={currency}
                    price={orderPrice}
                    period={marketPeriod || 0}
                    setPeriod={onPeriodChange}
                    maxPeriod={maxPeriod}
                    displayPrice={calcNakaPrice(orderPrice, marketAmount)}
                  />
                ) : null}
                {action === "cancel" ||
                action === "mint" ||
                nftType === "game_item" ||
                nftType === "nft_material" ||
                nftType === "nft_naka_punk" ||
                nftType === "nft_avatar" ||
                (nftType === "nft_game" && sellingType !== "installment") ? (
                  <ReceiptComp
                    nftType={nftType}
                    seller={sellerType}
                    name={name}
                    tokenId={tokenId}
                    orderId={orderId}
                    amount={
                      action === "cancel" && maxAmount
                        ? maxAmount
                        : invAmount || marketAmount || 0
                    }
                    price={
                      action !== "sell" && orderPrice
                        ? orderPrice
                        : invPrice || 0
                    }
                    selling={
                      nftType === "game_item" ||
                      nftType === "nft_material" ||
                      nftType === "nft_naka_punk" ||
                      nftType === "nft_avatar"
                        ? undefined
                        : selling
                    }
                    period={
                      nftType === "game_item" ||
                      nftType === "nft_material" ||
                      nftType === "nft_naka_punk" ||
                      nftType === "nft_avatar"
                        ? undefined
                        : invPeriod || marketPeriod
                    }
                    action={action}
                    displayPrice={calcNakaPrice(
                      action !== "sell" && orderPrice
                        ? orderPrice
                        : invPrice || 0,
                      marketAmount,
                      action === "mint"
                    )}
                  />
                ) : null}
                <form
                  onSubmit={onSubmit}
                  className="flex flex-grow items-center justify-center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="h-10 w-full capitalize"
                    sx={{
                      backgroundColor: `${handleStyle.bgColor} !important`,
                      color: handleStyle.txtColor
                    }}
                    startIcon={
                      handleStyle.icon ? (
                        <div className="button-icon animation-arrow">
                          {handleStyle.icon}
                        </div>
                      ) : null
                    }
                  >
                    {textBtn}
                  </Button>
                </form>
              </div>
            </div>
          ) : null}
        </Stack>
      </div>
    </ModalCustom>
  )
}

export default memo(ModalMarket)
