import { IPosition } from "@feature/land/interfaces/ILandService"
import {
  IMarketData,
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button } from "@mui/material"
import React, { memo, useState } from "react"
import dynamic from "next/dynamic"

const ModalMarketplace = dynamic(
  () => import("@components/molecules/Modal/ModalMarket"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProps {
  nftType: TNFTType
  name: string
  img: string
  vdo?: string
  tokenId?: string
  marketId?: string
  itemId?: string
  orderId?: string
  price?: number
  period?: number
  amount?: number
  maxPeriod?: number
  maxAmount?: number
  sellerType?: TSellerType
  sellingType?: TSellingType
  sellerId?: string
  marketplaces_data?: IMarketData | null
  plot?: IPosition
}

const ButtonRentOut = ({
  nftType,
  name,
  img,
  vdo,
  tokenId,
  itemId,
  plot
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    // if (actionValue !== "connect_wallet") return
    setIsOpen(true)
    // if (handleConnectWithMetamask) return handleConnectWithMetamask()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="warning"
        className="!h-10 rounded-[20px] text-sm capitalize"
        onClick={handleOpen}
      >
        rent out
      </Button>
      <ModalMarketplace
        nftType={nftType}
        open={isOpen}
        onClose={handleClose}
        action="sell"
        name={name}
        img={img}
        vdo={vdo}
        tokenId={tokenId}
        itemId={itemId}
        sellerType="user"
        sellingType="rental"
        plot={plot}
      />
    </>
  )
}
export default memo(ButtonRentOut)
