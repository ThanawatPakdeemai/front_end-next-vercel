import TextTip from "@components/atoms/TextTip"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Divider, Stack } from "@mui/material"
import Helper from "@utils/helper"
import React, { memo, useEffect, useState } from "react"

interface IProps {
  nftType: TNFTType
  name: string
  amount: number
  price: number
  tokenId?: string
  orderId?: string
  selling?: TSellingType
  period?: number
}

const ReceiptComponent = ({
  nftType,
  name,
  amount,
  price,
  tokenId,
  orderId,
  selling,
  period
}: IProps) => {
  const { shortenString } = Helper
  const { onCheckAllowance } = useGlobalMarket()
  const [isAllowance, setAllowance] = useState<number | undefined>(undefined)

  useEffect(() => {
    const onGetApproval = async () => {
      await onCheckAllowance(nftType)
        .then((response) => {
          setAllowance(response)
        })
        .catch((error) => console.error(error))
    }
    if (nftType) onGetApproval()
  }, [nftType, onCheckAllowance])

  return (
    <Stack
      spacing={1}
      direction="column"
      className="gap-2 rounded-xl border border-neutral-800/75 p-6 uppercase text-neutral-500"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <span>name :</span>
        <span>{name}</span>
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75" />

      {tokenId ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>TokenId :</span>
            <span>{tokenId}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}

      {orderId ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>orderId :</span>
            <span>{shortenString(orderId)}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      <div className="flex w-full flex-row items-center justify-between">
        <span>amount :</span>
        <span>{amount}</span>
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75" />

      <div className="flex w-full flex-row items-center justify-between">
        <span>Price :</span>
        <span>{price}</span>
      </div>
      <Divider className="!block border-b-[1px] border-neutral-800/75" />

      {selling ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>selling type :</span>
            <span>{selling}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      {period ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <span>period :</span>
            <span>{period}</span>
          </div>
          <Divider className="!block border-b-[1px] border-neutral-800/75" />
        </>
      ) : null}
      {isAllowance || isAllowance === undefined ? null : (
        <TextTip
          text="Please allow the contract to access your NFTS first."
          shade="dark"
          color="warning"
        />
      )}
    </Stack>
  )
}

export default memo(ReceiptComponent)
