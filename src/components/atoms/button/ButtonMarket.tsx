import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import FormLogin from "@feature/authentication/components/FormLogin"
import useMarket from "@feature/marketplace/containers/hooks/useMarket"
import {
  IMarketData,
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import {
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material"
import { useWeb3Provider } from "@providers/Web3Provider"
import useProfileStore from "@stores/profileStore"
import React, { memo, ReactNode, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import LoginIcon from "@mui/icons-material/Login"
import LogoIcon from "@components/icons/LogoIcon"
import { v4 as uuidv4 } from "uuid"
import Helper from "@utils/helper"
import CountItem from "@components/molecules/CountItem"
import NumpadIcon from "@components/icons/NumpadIcon"

interface IMarketButton {
  nftType: TNFTType
  name?: string
  tokenId?: string
  marketId?: string
  itemId?: string
  orderId?: string
  price?: number
  period?: number
  amount?: number
  sellerType?: TSellerType
  sellingType?: TSellingType
  sellerId?: string
  marketplaces_data?: IMarketData[] | null
}

type TAction =
  | "cancel"
  | "mint"
  | "buy"
  | "sell"
  | "login"
  | "connect_wallet"
  | undefined

type TMarketSelling = { label: string; value: TSellingType }

const MARKET_SELLING: TMarketSelling[] = [
  {
    label: "full payment",
    value: "fullpayment"
  },
  {
    label: "installment",
    value: "installment"
  }
]

const MARKET_INSTALL_PERIOD = [6, 9, 12, 15]

const ButtonMarket = ({
  nftType,
  name,
  tokenId,
  marketId,
  itemId,
  orderId,
  price,
  // period = 1,
  amount = 1,
  sellerType, // p2p
  sellingType = "fullpayment",
  sellerId, // p2p
  marketplaces_data // inventory
}: IMarketButton) => {
  const { profile } = useProfileStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    address: account,
    handleConnectWithMetamask,
    handleDisconnectWallet
  } = useWeb3Provider()
  const { handleSubmit } = useForm()
  const [selling, setSelling] = useState<TSellingType>(sellingType)
  const [periodValue, setPeriodValue] = useState<number | undefined>(undefined)
  const [priceValue, setPriceValue] = useState<number>(0)
  const { formatNumber } = Helper
  const currency = 0.25558
  const { onCreateOrder, onCancelOrder, onMintOrder, onExecuteOrder } =
    useMarket()
  const onSellingChange = (event: SelectChangeEvent) => {
    setSelling(event.target.value as TSellingType)
  }

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    setPriceValue(_value)
  }

  const actionValue = useMemo(() => {
    let _action: TAction
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

  const titleModal = useMemo(() => {
    let _title: string | undefined
    switch (actionValue) {
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
    if (_title) return `${actionValue} ${_title}`
    return undefined
  }, [actionValue, name])

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

  const onSubmit = handleSubmit(async () => {
    switch (actionValue) {
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
          periodValue
        ) {
          await onExecuteOrder(
            nftType,
            sellingType,
            marketId,
            itemId,
            sellerId,
            orderId,
            amount,
            periodValue
          )
        } else
          console.error(
            `id: ${marketId}, idItem: ${itemId}, selllerAcc: ${sellerId}, order: ${orderId}, orderPeriod: ${periodValue}`
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

  const BuyComponent = (_selling: TSellingType) => {
    let _component: ReactNode | null = null
    switch (_selling) {
      case "fullpayment": // ! here use this to action sell together
        _component = (
          <div className="flex w-full flex-col">
            <span>full payment</span>
            <Select
              className="mx-[6px] mt-[6px] mb-[6px] rounded-[13px] bg-neutral-800 px-[6px] py-[3px] capitalize text-white-primary"
              value={selling}
              onChange={onSellingChange}
              disabled={actionValue === "buy"}
            >
              {MARKET_SELLING.map((m) => (
                <MenuItem
                  key={uuidv4()}
                  value={m.value}
                  className="capitalize"
                >
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )
        break
      case "installment":
        _component = (
          <>
            <span className="text-xs uppercase">
              installment by smartcontract
            </span>
            <Stack
              spacing={1}
              direction="column"
            >
              {MARKET_INSTALL_PERIOD.map((p) => (
                <button
                  key={uuidv4()}
                  type="button"
                  className={`flex h-11 w-full flex-row items-center justify-between rounded-sm border bg-neutral-800 px-4 text-sm uppercase text-white-primary ${
                    periodValue === p
                      ? "border-secondary-main"
                      : "border-neutral-700"
                  }`}
                  onClick={() => setPeriodValue(p)}
                >
                  <span>{p} months</span>
                  <span className="text-xs text-secondary-main">
                    {periodValue === p ? "selected" : null}
                  </span>
                </button>
              ))}
            </Stack>
          </>
        )
        break
      case "rental": // ! here
        _component = (
          <div className="flex h-fit w-full flex-col gap-1">
            <div className="relative flex w-full flex-col uppercase">
              <CountItem
                endIcon={<NumpadIcon />}
                label="step 2: select the rental period(days)"
              />
              <span className="text-xs">period(days) must be more than 0</span>
            </div>
          </div>
        )
        break
      default:
        break
    }
    return _component
  }

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
      <ModalCustom
        open={isOpen}
        onClose={handleClose}
        title={titleModal}
        className="rounded-[34px]"
        width={actionValue === "login" ? 400 : 680}
      >
        <>
          {actionValue === "login" ? (
            <Stack
              spacing={3}
              className="md:p-5"
            >
              <ModalHeader
                handleClose={handleClose}
                title="Login"
              />
              <FormLogin />
            </Stack>
          ) : null}
          {actionValue !== "login" ? (
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
              <div className="flex h-full w-full flex-col gap-2 bg-error-main px-4 py-2">
                <div className="flex h-fit w-full flex-col gap-1">
                  <span className="w-full text-xs uppercase">
                    {actionValue === "sell"
                      ? "step 1: set sell price"
                      : "price"}
                  </span>
                  <TextField
                    hiddenLabel
                    value={actionValue === "buy" && price ? price : undefined}
                    onChange={(e) => onPriceChange(e.target.value)}
                    disabled={actionValue !== "sell"}
                    placeholder="E.G. 1,000"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#010101",
                        paddingLeft: "10px"
                      },
                      "input": {
                        color: "#E1E2E2 !important"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LogoIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  {sellingType === "rental" && price ? (
                    <span className="text-xs uppercase">
                      = {formatNumber(price * currency)} naka per day
                    </span>
                  ) : null}
                </div>
                {sellingType === "rental" ? (
                  <div className="flex h-fit w-full flex-col gap-1">
                    <TextField
                      hiddenLabel
                      value={
                        actionValue === "buy" && price ? price * 120 : undefined
                      }
                      onChange={(e) => onPriceChange(e.target.value)}
                      disabled={actionValue !== "sell"}
                      placeholder="E.G. 1,000"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#010101",
                          paddingLeft: "10px"
                        },
                        "input": {
                          color: "#E1E2E2 !important"
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <LogoIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                    {sellingType === "rental" && price ? (
                      <span className="text-xs uppercase">
                        = {formatNumber(price * currency * 120)} naka
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {BuyComponent(sellingType)}
                <form
                  onSubmit={onSubmit}
                  className="flex flex-grow items-center justify-center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
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
    </>
  )
}
export default memo(ButtonMarket)
