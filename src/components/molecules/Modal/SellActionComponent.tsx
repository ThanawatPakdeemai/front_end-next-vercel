import {
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField
} from "@mui/material"
import React, { memo, useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import dynamic from "next/dynamic"
import { MARKET_SELLING } from "@constants/market"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import {
  TNFTType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import Helper from "@utils/helper"
import { iconmotion } from "@styles/themes/partial/motion"

const FormattedInputs = dynamic(
  () => import("@feature/marketplace/components/molecules/CurrencyTextField"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonIcon = dynamic(
  () => import("@components/atoms/button/ButtonIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const TextTip = dynamic(() => import("@components/atoms/TextTip"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProps {
  nftType: TNFTType
  selling: TSellingType
  setSelling: (_selling: TSellingType) => void
  currency: number
  price: string
  onPriceChange: (_price: string) => void
  period: number
  setPeriod: (_period: number) => void
  maxPeriod: number
  isRentout?: boolean
  isRenting?: boolean
}

const SellActionComponent = ({
  nftType,
  selling,
  setSelling,
  currency,
  price,
  onPriceChange,
  period,
  setPeriod,
  maxPeriod,
  isRentout = false,
  isRenting
}: IProps) => {
  const { formatNumber } = Helper
  const { onCheckApprovalForAllNFT } = useGlobalMarket()
  const [isApproved, setIsApproved] = useState<boolean | undefined>(undefined)
  const sellPriceAsNumber = Number(price)

  const onSellingChange = (event: SelectChangeEvent) => {
    setIsApproved(undefined)
    setSelling(event.target.value as TSellingType)
  }

  const onIncreasePeriod = () => {
    const _value = period + 1
    if (_value >= maxPeriod) setPeriod(maxPeriod)
    else setPeriod(_value)
  }

  const onDecreasePeriod = () => {
    const _value = period - 1
    if (_value <= 1) setPeriod(1)
    else setPeriod(_value)
  }

  const onGetApproval = useCallback(async () => {
    if (nftType && onCheckApprovalForAllNFT && selling) {
      await onCheckApprovalForAllNFT(nftType, selling)
        .then((response) => {
          setIsApproved(response)
        })
        .catch((error) => console.error(error))
    }
  }, [nftType, onCheckApprovalForAllNFT, selling])

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
    >
      <span className="w-full text-xs uppercase">step 1 : set sell price</span>
      <FormattedInputs
        values={price}
        onSetValues={onPriceChange}
      />
      <span className="text-xs uppercase">
        ={" "}
        {sellPriceAsNumber &&
          formatNumber(sellPriceAsNumber * currency, {
            maximumFractionDigits: 4
          })}{" "}
        USD
      </span>
      {selling !== "rental" && !isRentout ? (
        <>
          <span className="text-xs uppercase">
            step 2: select type you would like to sell
          </span>
          <Select
            className="mx-[6px] mb-2 mt-2 rounded-sm bg-neutral-800 !px-2 py-1 text-sm font-bold capitalize text-neutral-300"
            value={selling}
            onChange={onSellingChange}
            sx={{
              maxHeight: 40,
              minHeight: 40
            }}
          >
            {MARKET_SELLING.filter(
              (m) => !isRenting || m.value === "fullpayment"
            ).map((m) => (
              <MenuItem
                key={uuidv4()}
                value={m.value}
                className="capitalize"
              >
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : null}
      {isRentout ? (
        <>
          <span className="w-full text-xs uppercase">total price</span>
          <TextField
            hiddenLabel
            value={sellPriceAsNumber * period}
            disabled
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
                <InputAdornment position="start">
                  <Icomoon className="icon-Naka text-error-main" />
                </InputAdornment>
              )
            }}
          />
          <span className="text-xs uppercase">
            = {formatNumber(sellPriceAsNumber * currency * period)} naka
          </span>
          <span className="w-full py-2">
            <Divider className="!block border-b-[1px] border-neutral-800/75" />
          </span>
          <span className="text-xs uppercase">
            step 2 : select the rental period(days)
          </span>
          <div className="flex items-center">
            <ButtonIcon
              onClick={() => onDecreasePeriod()}
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={<Icomoon className="icon-Minus" />}
              className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
            />
            <TextField
              className="mx-1"
              sx={{
                input: {
                  textAlign: "center"
                },
                "& label.Mui-focused": {
                  color: "white"
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                    border: "none"
                  }
                }
              }}
              value={period}
              InputProps={{
                readOnly: true,
                // endAdornment: endIcon || <SkullIcon />,
                style: {
                  width: "160px",
                  fontSize: 14,
                  paddingLeft: 30,
                  fontFamily: "neueMachina"
                }
              }}
              focused={false}
            />
            <ButtonIcon
              onClick={() => onIncreasePeriod()}
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={<Icomoon className="icon-Plus1" />}
              className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
            />
          </div>
          <span className="text-xs uppercase">
            period(days) must be more than 0
          </span>
        </>
      ) : null}

      {isApproved ||
      isApproved === undefined ||
      nftType === "game_item" ||
      nftType === "nft_material" ? null : (
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

export default memo(SellActionComponent)
