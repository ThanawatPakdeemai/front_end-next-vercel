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
import { IPosition } from "@feature/land/interfaces/ILandService"
import Video from "@components/atoms/Video"
import { NextRouter, useRouter } from "next/router"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import { useInventoryProvider } from "@providers/InventoryProvider"
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
  priceValue = 1,
  // periodValue = 1,
  // amount = 1,
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

  const { fetchOrderById } = useMarketplaceProvider()
  const { handleSubmit } = useForm()
  const { onCreateOrder, onCancelOrder, onMintOrder, onExecuteOrder } =
    useMarket()

  const {
    invPrice,
    invPeriod,
    invAmount,
    setInvPrice,
    setInvPeriod,
    fetchInvenItemDataById
  } = useInventoryProvider()

  const { marketPeriod, marketAmount, setMarketPeriod } =
    useMarketplaceProvider()

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    if (setInvPrice) setInvPrice(_value)
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

  const titleModal = useMemo(() => {
    let _title: string | undefined
    switch (action) {
      case "login":
        _title = "login"
        break
      case "mint":
        _title = `: ${name}`
        break
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
        _title = "loading"
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
        if (orderId && sellerId && selling) {
          await onCancelOrder(nftType, selling, orderId, sellerId)
            .then(() => {
              // redirect
              // check if stay on inventory not redirect
              if (router.asPath.includes("/inventory")) {
                // refetch data from owner detail
                if (fetchInvenItemDataById) fetchInvenItemDataById()
              } else {
                setTimeout(
                  () =>
                    router.replace({
                      pathname: `/marketplace/inventory/${convertNFTTypeToTType(
                        nftType
                      )}`
                    }),
                  1000
                )
              }
            })
            .catch(async () => {
              // refetch data
              if (router.asPath.includes("/inventory")) {
                //
              } else if (fetchOrderById) {
                // await fetchOrderById().catch(() => {
                //   setTimeout(
                //     () =>
                //       router.replace({
                //         pathname: `/marketplace/${
                //           sellerType === "system" ? "" : "/p2p"
                //         }/${convertNFTTypeToTType(nftType, sellerType) || ""}`
                //       }),
                //     1000
                //   )
                // })
              }
            })
            .finally(() => {
              setTimeout(() => onClose(), 3000)
            })
        } else {
          console.error(
            `selling:${selling}, order: ${orderId}, sellerAcc: ${sellerId}`
          )
        }
        break
      case "sell":
        if (tokenId && itemId && invAmount && invPrice) {
          await onCreateOrder(
            nftType,
            selling,
            itemId,
            tokenId,
            invAmount,
            invPrice,
            invPeriod
          )
            .then(async () => {
              if (
                router.asPath.includes("/inventory") &&
                fetchInvenItemDataById
              ) {
                await fetchInvenItemDataById()
              }
            })
            .finally(() => {
              setTimeout(() => onClose(), 3000)
            })
        } else
          console.error(`marketAmount: ${invAmount}, marketPrice: ${invPrice}`)
        break
      case "buy":
        if (
          marketId &&
          itemId &&
          sellerId &&
          sellerType &&
          orderId &&
          marketAmount &&
          marketPeriod
        ) {
          await onExecuteOrder(
            nftType,
            selling,
            marketId,
            itemId,
            sellerId,
            orderId,
            marketAmount,
            marketPeriod
          ).finally(() => {
            setTimeout(() => onClose(), 3000)
          })
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, selllerAcc: ${sellerId}, order: ${orderId}, orderPeriod: ${marketPeriod}`
          )
        break
      case "mint":
        if (marketId && itemId && priceValue) {
          await onMintOrder(nftType, marketId, itemId, 1).finally(() => {
            setTimeout(() => onClose(), 3000)
            router.back()
          })
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, marketAmount: ${priceValue}`
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
      width={action === "login" ? 400 : 680}
    >
      <div className="rounded-lg">
        <Stack
          spacing={3}
          className="md:p-5"
        >
          {/* <ModalHeader
            handleClose={onClose}
            title={titleModal}
            bg="bg-neutral-800"
          /> */}
          {action === "login" ? <FormLogin /> : null}
          {action !== "login" ? (
            <div className="grid h-96 w-full grid-cols-1 items-center gap-2 md:grid-cols-2">
              <div className="flex h-full min-h-[320px] w-full flex-col gap-2">
                <div className="relative flex  h-full max-h-[240px] w-full flex-col items-center justify-center">
                  <Video
                    poster={img}
                    src={vdo || ""}
                    autoPlay
                    disableOnClick
                    className="rounded-xl object-cover"
                  />
                  {/* <Image
                    src={img}
                    alt=""
                    width={320}
                    height={360}
                    className="object-cover"
                  /> */}
                </div>
                <div className="flex w-full flex-col gap-2 rounded-xl border border-neutral-800/75 p-6 uppercase text-neutral-500">
                  <div className="flex w-full flex-row items-center justify-between">
                    <span>token id :</span>
                    <span>{tokenId}</span>
                  </div>
                  {plot ? (
                    <>
                      <Divider className="!block border-b-[1px] border-neutral-800/75" />
                      <div className="flex w-full flex-row items-center justify-between">
                        <span>plot :</span>
                        <span>
                          {plot.x}, {plot.y}
                        </span>
                      </div>
                    </>
                  ) : null}
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
                    price={invPrice || 1}
                    onPriceChange={onPriceChange}
                    period={invPeriod || 1}
                    setPeriod={onPeriodChange}
                    maxPeriod={365}
                  />
                ) : null}
                {(action === "buy" || action === "mint") &&
                nftType !== "game_item" &&
                nftType !== "nft_material" ? (
                  <BuyActionComponent
                    nftType={nftType}
                    seller={sellerType}
                    selling={selling}
                    currency={currency}
                    price={priceValue}
                    period={marketPeriod || 0}
                    setPeriod={onPeriodChange}
                    maxPeriod={maxPeriod}
                  />
                ) : null}
                {action === "cancel" ||
                nftType === "game_item" ||
                nftType === "nft_material" ? (
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
                      action === "sell" && invPrice ? invPrice : priceValue
                    }
                    selling={
                      nftType === "game_item" || nftType === "nft_material"
                        ? undefined
                        : selling
                    }
                    period={
                      nftType === "game_item" || nftType === "nft_material"
                        ? undefined
                        : invPeriod || marketPeriod
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
        </Stack>
      </div>
    </ModalCustom>
  )
}

export default memo(ModalMarket)
