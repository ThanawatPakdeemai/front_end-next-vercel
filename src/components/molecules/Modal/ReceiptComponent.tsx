import TextTip from "@components/atoms/TextTip"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import {
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Divider, Stack } from "@mui/material"
import Helper from "@utils/helper"
import React, { memo, useEffect, useCallback, useState } from "react"

interface IProps {
  nftType: TNFTType
  seller: TSellerType
  name: string
  amount: number
  price: number
  tokenId?: string
  orderId?: string
  selling?: TSellingType
  period?: number
  action: TMarketAction
}

const ReceiptComponent = ({
  nftType,
  seller,
  name,
  amount,
  price,
  tokenId,
  orderId,
  selling,
  period,
  action
}: IProps) => {
  const { shortenString, formatNumber } = Helper
  const { checkAllowanceNaka, calcNAKAPrice } = useGlobalMarket()
  const [receiptPrice, setReceiptPrice] = useState<string>("0")
  const [isAllowance, setAllowance] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let load = false
    if (price && !load) {
      const _value = formatNumber(calcNAKAPrice(price), {
        maximumFractionDigits: 4
      })
      setReceiptPrice(_value)
    }
    return () => {
      load = true
    }
  }, [calcNAKAPrice, formatNumber, price])

  const onGetApproval = useCallback(async () => {
    if (nftType && checkAllowanceNaka && price && seller) {
      await checkAllowanceNaka(nftType, seller, price, selling)
        .then((response) => {
          setAllowance(response)
        })
        .catch((error) => console.error(error))
    }
  }, [checkAllowanceNaka, nftType, price, seller, selling])

  useEffect(() => {
    let load = false
    if (!load) {
      onGetApproval()
    }
    return () => {
      load = true
    }
  }, [onGetApproval])

  return (
    <Stack
      spacing={1}
      direction="column"
      className="rounded-xl border border-neutral-800/75 p-6 text-sm font-bold uppercase text-neutral-500"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <span>name :</span>
        <span className="text-neutral-300">{name}</span>
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75" />

      {tokenId ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>TokenId :</span>
            <span className="text-neutral-300">{tokenId}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}

      {orderId && orderId !== "null" ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>orderId :</span>
            <span className="text-neutral-300">{shortenString(orderId)}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      <div className="flex w-full flex-row items-center justify-between">
        <span>amount :</span>
        <span className="text-neutral-300">{amount}</span>
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75" />

      {receiptPrice ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>Price :</span>
            <span className="text-neutral-300">{receiptPrice}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}

      {selling ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>Payment Type :</span>
            <span className="text-neutral-300">{selling}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      {period ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>period :</span>
            <span className="text-neutral-300">{period}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      {isAllowance ||
      isAllowance === undefined ||
      action === "cancel" ? null : (
        <TextTip
          text="Please allow the contract to access your NFTS first."
          textColor="text-warning-dark"
          bgColor="bg-warning-dark/20"
          borderColor="border-warning-dark"
        />
      )}
    </Stack>
  )
}

export default memo(ReceiptComponent)
