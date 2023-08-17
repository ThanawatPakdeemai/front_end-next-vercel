import { InputAdornment, TextField } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import Helper from "@utils/helper"
import { useInventoryProvider } from "@providers/InventoryProvider"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"

const AmountItem = dynamic(() => import("@components/molecules/AmountItem"), {
  suspense: true,
  ssr: false
})
const FormattedInputs = dynamic(() => import("./CurrencyTextField"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  type: TNFTType
  position?: {
    x: string
    y: string
  }
  itemAmount?: number
  price?: number
  count?: {
    helperText?: string
    label?: string
    min: number
    max: number
    count: number
  }
  isUSD?: boolean
}

const TextfieldDetailContent = ({
  type,
  position,
  // itemAmount,
  price,
  count,
  isUSD
}: IProp) => {
  const { calcUSDPrice, calcNakaPrice } = useGlobalMarket()
  const { invPrice, setInvPrice, invAmount, setInvAmount } =
    useInventoryProvider()
  const { marketAmount, setMarketAmount } = useMarketplaceProvider()
  const { marketType } = useGlobal()

  const { formatNumber } = Helper

  const [sellPriceNaKa, setSellPriceNaKa] = useState<string>("0")
  const [sellPriceUSD, setSellPriceUSD] = useState<string>("0")

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    if (setInvPrice) setInvPrice(_value)
  }

  const _count = useMemo(() => {
    if (setInvAmount) return invAmount
    if (setMarketAmount) return marketAmount
    return 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invAmount, marketAmount])

  const onCountChange = (_value: number) => {
    if (setInvAmount) return setInvAmount(_value)
    if (setMarketAmount) return setMarketAmount(_value)
  }

  useEffect(() => {
    let load = false
    if (!load) {
      const _priceValue = invPrice || price || 0
      const _amount = invAmount || marketAmount || 1
      const _valueNaka = formatNumber(
        calcNakaPrice(_priceValue, _amount, isUSD),
        {
          maximumFractionDigits: 4
        }
      )
      setSellPriceNaKa(_valueNaka)
      const _valueUSD = formatNumber(calcUSDPrice(_priceValue, _amount), {
        maximumFractionDigits: 4
      })
      setSellPriceUSD(_valueUSD)
    }
    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invAmount, invPrice, isUSD, marketAmount, price])

  return (
    <div
      className={`flex w-full flex-wrap items-center justify-between ${
        marketType === "nft_avatar" || marketType === "nft_naka_punk"
          ? "flex-col sm:flex-row"
          : null
      }`}
      data-testid={type}
    >
      {/* {count &&
      type !== "nft_land" &&
      type !== "nft_building" &&
      type !== "nft_game" ? (
        <CountItem
          endIcon={<NumpadIcon />}
          helperText={count.helperText}
          label={count.label}
          min={count.min}
          max={count.max}
          _item={_count}
          _minusItem={onDecreaseAmount}
          _addItem={onIncreaseAmount}
        />
      ) : null} */}
      {count &&
      type !== "nft_land" &&
      type !== "nft_building" &&
      type !== "nft_game" ? (
        <AmountItem
          setValue={onCountChange}
          helperText={count.helperText}
          label={count.label}
          min={count.min}
          max={count.max}
        />
      ) : null}
      {position ? (
        <TextField
          value={`${position.x}, ${position.y}`}
          label="BLOCK IN MAP"
          className="!w-[131px] !max-w-[231px] sm:!w-[232px]"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#010101"
            },
            "input": {
              color: "#E1E2E2 !important"
            }
          }}
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className="ml-[15px]"
              >
                <Icomoon className="icon-Pin" />
              </InputAdornment>
            )
          }}
          helperText="Land position on map"
        />
      ) : null}
      {/* (countItemSelected * _priceValue) */}
      {(price && price > 0) ||
      type === "game_item" ||
      type === "nft_material" ||
      type === "nft_naka_punk" ||
      type === "nft_avatar" ||
      type === "nft_game" ? (
        <FormattedInputs
          label={count && invPrice ? "PRICE (NAKA) : 1 item" : "PRICE (NAKA)"}
          className="!w-[131px] sm:!w-[232px]"
          values={count && invPrice ? String(invPrice) : sellPriceNaKa}
          onSetValues={onPriceChange}
          disabled={!!price}
          propsInput={{
            startAdornment: (
              <InputAdornment
                position="start"
                className="ml-[15px] mr-3"
              >
                <Icomoon className="icon-Naka text-[#70727B]" />
              </InputAdornment>
            )
          }}
          helperText={
            count && invPrice
              ? `Total ${sellPriceNaKa} NAKA = ${sellPriceUSD} USD`
              : `= ${sellPriceUSD} USD`
          }
        />
      ) : null}
    </div>
  )
}

export default TextfieldDetailContent
