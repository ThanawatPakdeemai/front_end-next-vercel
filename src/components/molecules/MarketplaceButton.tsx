import { Button, Typography } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import React, { ReactNode, useCallback, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { IPosition } from "@feature/land/interfaces/ILandService"
import { TMarketAction } from "@feature/marketplace/interfaces/IMarket"
import {
  IMarketData,
  TNFTType
} from "@feature/marketplace/interfaces/IMarketService"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

const ModalMarketplace = dynamic(
  () => import("@components/molecules/Modal/ModalMarket"),
  {
    suspense: true,
    ssr: false
  }
)

/**
 * @description MarketButton
 * @param nftType use for match between function and type (eg. land -> <createNFTOrder,...> )
 * @param name show name on the top-left side of the modal
 * @param itemId send to backend when mint, buy and sell nft
 * @param img use for poster on the left side of the modal
 * @param vdo  use for play video on the left side of the modal
 * @param tokenId send to call contract function and show tokenId on modal
 * @param position  show position of land when @nftType is `nft_land` on the left side of the modal
 * @param period send to call contract function and show total period the right side of the modal
 * @param maxPeriod set max of period you can count
 * @param amount send to contract and show on right side when @nftType are game_item || nft_material
 * @param maxPeriod set max of amount you can count
 * @param marketplaces_data use to decide action and send to contract <"cancel", "buy" or "sell">
 * @param showRentBtn show rent out button
 */

interface IProps {
  nftType: TNFTType
  name: string
  itemId: string
  img: string
  vdo?: string
  tokenId?: string
  position?: IPosition
  period?: number
  maxPeriod?: number
  setPeriod?: (_value: number) => void
  amount?: number
  maxAmount?: number
  marketplaces_data?: IMarketData | null
  showRentBtn?: boolean
  isRenting?: boolean
}

const MarketplaceButton = ({
  nftType,
  name,
  itemId,
  img,
  vdo,
  tokenId,
  position,
  period,
  maxPeriod,
  setPeriod,
  amount,
  maxAmount,
  marketplaces_data,
  showRentBtn = false,
  isRenting
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [curAction, setCurAction] = useState<TMarketAction | undefined>(
    undefined
  )

  const { profile } = useProfileStore()
  const { address: curAccount, handleConnectWithMetamask } = useWeb3Provider()

  const actionValue = useMemo(() => {
    let _action: TMarketAction
    if (!profile.data) {
      _action = "login"
    } else if (
      !curAccount ||
      (profile.data &&
        profile.data.address &&
        profile.data.address.toLowerCase() !== curAccount?.toLowerCase())
    ) {
      _action = "connect_wallet"
    } else if (marketplaces_data) {
      if (marketplaces_data.seller_type === "user") {
        if (profile.data.address === marketplaces_data.seller_id) {
          _action = "cancel"
        } else {
          _action = "buy"
        }
      } else if (marketplaces_data.seller_type === "system") {
        _action = "mint"
      }
    } else {
      _action = "sell"
    }
    return _action
  }, [profile.data, curAccount, marketplaces_data])

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
        _icon = <Icomoon className="icon-Magic-Stick" />
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

  const textBtn = useMemo(() => {
    let _text: string = "loading"
    switch (actionValue) {
      case "login":
        _text = "login"
        break
      case "connect_wallet":
        _text = "connect wallet"
        break
      case "mint":
        _text = "mint now"
        break
      case "buy":
        if (
          marketplaces_data &&
          marketplaces_data.seller_id &&
          marketplaces_data.selling_type === "rental" &&
          marketplaces_data.seller_id.toLowerCase() !==
            profile.data?.address.toLowerCase()
        )
          _text = "rent now"
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
  }, [actionValue, marketplaces_data, profile.data?.address])

  const _startIcon = useCallback(() => {
    let _icon: ReactNode = <></>
    if (actionValue === "login")
      _icon = (
        <div className="button-icon animation-arrow">
          <LoginIcon />
        </div>
      )
    else if (actionValue === "mint") _icon = handleStyle.icon
    else return _icon
  }, [actionValue, handleStyle.icon])

  const handleOpen = useCallback(() => {
    if (actionValue === "connect_wallet" && handleConnectWithMetamask) {
      return handleConnectWithMetamask()
    }
    setCurAction(actionValue)
    setIsOpen(true)
  }, [actionValue, handleConnectWithMetamask])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setCurAction(undefined)
  }, [])

  const handleRentOut = useCallback(() => {
    setCurAction("rent_out")
    setIsOpen(true)
  }, [])

  return (
    <div className="flex h-auto w-full flex-col items-start justify-between sm:flex-row sm:items-center">
      <Typography className="mb-[10px] mt-[-10px] text-xs font-bold text-neutral-500 sm:mb-0 sm:mt-0">
        Acquire unique digital ownership
        <br /> asset token.
      </Typography>
      <div className="mt-0 flex w-full flex-col items-center gap-y-2 sm:mt-4">
        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={_startIcon()}
          className="!h-10 rounded-[20px] text-sm capitalize"
          aria-label="button"
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
        {showRentBtn &&
        actionValue !== "login" &&
        actionValue !== "connect_wallet" ? (
          <Button
            type="button"
            variant="contained"
            color="warning"
            className="!h-10 rounded-[20px] text-sm capitalize"
            aria-label="rent out"
            sx={{
              width: 232
            }}
            onClick={handleRentOut}
          >
            rent out
          </Button>
        ) : undefined}
      </div>
      <ModalMarketplace
        nftType={nftType}
        open={isOpen}
        onClose={handleClose}
        action={curAction || "login"}
        name={name}
        img={img}
        vdo={vdo}
        periodValue={period}
        maxPeriod={marketplaces_data?.period_amount || maxPeriod}
        setPeriod={setPeriod}
        amount={amount}
        maxAmount={maxAmount}
        itemId={itemId}
        tokenId={tokenId}
        plot={position}
        marketId={marketplaces_data?._id}
        orderId={marketplaces_data?.order_id}
        sellerId={marketplaces_data?.seller_id}
        sellerType={marketplaces_data?.seller_type}
        sellingType={
          curAction === "rent_out" ? "rental" : marketplaces_data?.selling_type
        }
        isRenting={isRenting}
        orderPrice={marketplaces_data?.price}
      />
    </div>
  )
}

export default MarketplaceButton
