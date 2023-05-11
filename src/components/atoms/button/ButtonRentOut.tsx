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
  marketplaces_data?: IMarketData[] | null
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
        color="primary"
        // startIcon={
        //   actionValue === "login" || actionValue === "mint" ? (
        //     <div className="button-icon animation-arrow">
        //       {actionValue === "login" ? <LoginIcon /> : null}
        //     </div>
        //   ) : null
        // }
        className="button-global h-10 w-20 rounded-xl"
        onClick={handleOpen}
      >
        <span className="animation-button-text flex items-center">
          rent out
        </span>
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
