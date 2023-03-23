import {
  IMarketData,
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button } from "@mui/material"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import React, { memo, useMemo, useState } from "react"
import LoginIcon from "@mui/icons-material/Login"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import dynamic from "next/dynamic"
import { IPosition } from "@feature/land/interfaces/ILandService"

const ModalMarketplace = dynamic(
  () => import("@components/molecules/Modal/ModalMarket"),
  {
    suspense: true,
    ssr: false
  }
)

interface IMarketButton {
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

const ButtonMarket = ({
  nftType,
  name,
  img,
  vdo,
  tokenId,
  marketId,
  itemId,
  orderId,
  price = 0,
  period = 1,
  amount = 1,
  maxPeriod = 1,
  maxAmount = 1,
  sellerType, // p2p
  sellingType = "fullpayment",
  sellerId, // p2p
  marketplaces_data, // inventory
  plot
}: IMarketButton) => {
  const { profile } = useProfileStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    address: account,
    handleConnectWithMetamask,
    handleDisconnectWallet
  } = useWeb3Provider()

  const actionValue = useMemo(() => {
    let _action: TMarketAction
    if (!profile.data) {
      _action = "login"
    } else if (!account) {
      _action = "connect_wallet"
    } else if (sellerType) {
      if (sellerType === "user" && sellerId) {
        if (profile.data.address === sellerId) {
          _action = "cancel"
        } else {
          _action = "buy"
        }
      } else if (sellerType === "system") {
        _action = "mint"
      }
    } else if (marketplaces_data) {
      _action = "cancel"
    } else {
      _action = "sell"
    }
    setIsOpen(false)
    return _action
  }, [profile.data, account, sellerType, sellerId, marketplaces_data])

  const handleOpen = () => {
    if (actionValue !== "connect_wallet") return setIsOpen(true)
    if (handleConnectWithMetamask) return handleConnectWithMetamask()
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const textBtn = useMemo(() => {
    let _text: string = "loading"
    switch (actionValue) {
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
  }, [actionValue])

  return (
    <>
      <div className="w-fit rounded-xl bg-neutral-400 p-1">
        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={
            actionValue === "login" || actionValue === "mint" ? (
              <div className="button-icon animation-arrow">
                {actionValue === "login" ? <LoginIcon /> : null}
              </div>
            ) : null
          }
          className="button-global h-10 w-20 rounded-xl"
          onClick={handleOpen}
        >
          <span className="animation-button-text flex items-center">
            {textBtn}
          </span>
        </Button>
      </div>
      <Button
        type="button"
        variant="contained"
        color="error"
        className="h-10 w-20"
        onClick={handleDisconnectWallet}
      >
        disconnect wallet
      </Button>
      <ModalMarketplace
        nftType={nftType}
        open={isOpen}
        onClose={handleClose}
        action={actionValue}
        name={name}
        img={img}
        vdo={vdo}
        priceValue={price}
        periodValue={period}
        amount={amount}
        maxPeriod={maxPeriod}
        maxAmount={maxAmount}
        tokenId={tokenId}
        marketId={marketId}
        itemId={itemId}
        orderId={orderId}
        sellerId={sellerId}
        sellerType={sellerType}
        sellingType={sellingType}
        plot={plot}
      />
    </>
  )
}
export default memo(ButtonMarket)
