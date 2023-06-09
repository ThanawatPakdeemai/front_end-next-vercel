import {
  IMarketData,
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import { Button, Typography } from "@mui/material"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import React, { memo, useMemo, useState } from "react"
import LoginIcon from "@mui/icons-material/Login"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import dynamic from "next/dynamic"
import { IPosition } from "@feature/land/interfaces/ILandService"
import MagicIcon from "@components/icons/MagicIcon"

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
  marketplaces_data?: IMarketData | null
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
    handleConnectWithMetamask
    // handleDisconnectWallet
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

  const handleStyle = useMemo(() => {
    let _color: string
    let _textColor: string
    let _icon: React.ReactNode
    switch (actionValue) {
      case "login":
        _color = "#7B5BE6"
        _textColor = "#E1E2E2"
        break
      case "connect_wallet":
        _color = "#7B5BE6"
        _textColor = "#E1E2E2"
        break
      case "mint":
        _color = nftType === "nft_naka_punk" ? "#A0ED61" : "#27F1EC"
        _textColor = "#010101"
        _icon = <MagicIcon />
        break
      case "buy":
        _color = "#A0ED61"
        _textColor = "#010101"
        break
      case "cancel":
        _color = "#F42728"
        _textColor = "#010101"
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
  }, [actionValue, nftType])

  return (
    <div className="flex h-10 flex-col items-start justify-between sm:flex-row sm:items-center">
      <Typography className="mb-[10px] mt-[-10px] text-xs font-bold text-neutral-500 sm:mb-0 sm:mt-0">
        Acquire unique digital ownership
        <br /> asset token.
      </Typography>
      <Button
        type="button"
        variant="contained"
        color="primary"
        startIcon={
          // eslint-disable-next-line no-nested-ternary
          actionValue === "login" || actionValue === "mint" ? (
            actionValue === "login" ? (
              <div className="button-icon animation-arrow">
                <LoginIcon />
              </div>
            ) : (
              handleStyle.icon
            )
          ) : null
        }
        className="!h-10 rounded-[20px] text-sm capitalize"
        sx={{
          width: 232,
          "&.MuiButton-contained": {
            backgroundColor: `${handleStyle.bgColor}`,
            color: `${handleStyle.txtColor}`
          }
        }}
        onClick={handleOpen}
      >
        {textBtn}
      </Button>
      {/* <Button
        type="button"
        variant="contained"
        color="error"
        className="h-10 w-20 text-[12px]"
        onClick={handleDisconnectWallet}
      >
        disconnect wallet
      </Button> */}
      <ModalMarketplace
        nftType={nftType}
        open={isOpen}
        onClose={handleClose}
        action={actionValue}
        name={name}
        img={img}
        vdo={vdo}
        priceValue={marketplaces_data ? marketplaces_data.price : price}
        periodValue={period}
        amount={amount}
        maxPeriod={maxPeriod}
        maxAmount={maxAmount}
        tokenId={tokenId}
        marketId={marketId}
        itemId={itemId}
        orderId={marketplaces_data ? marketplaces_data.order_id : orderId}
        sellerId={marketplaces_data ? marketplaces_data.seller_id : sellerId}
        sellerType={sellerType}
        sellingType={
          marketplaces_data ? marketplaces_data.selling_type : sellingType
        }
        plot={plot}
      />
    </div>
  )
}
export default memo(ButtonMarket)
