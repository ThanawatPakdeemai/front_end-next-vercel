import LogoIcon from "@components/icons/LogoIcon"
import NumpadIcon from "@components/icons/NumpadIcon"
import PinnedMapIcon from "@components/icons/PinnedMapIcon"
import CountItem from "@components/molecules/CountItem"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import { InputAdornment, TextField } from "@mui/material"
import Helper from "@utils/helper"
import React, { useEffect, useMemo, useState } from "react"
import { useInventoryProvider } from "@providers/InventoryProvider"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import FormattedInputs from "./CurrencyTextField"

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
}

const TextfieldDetailContent = ({
  type,
  position,
  // itemAmount,
  price,
  count
}: IProp) => {
  const { calcNAKAPrice, calcUSDPrice } = useGlobalMarket()
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

  const onDecreaseAmount = () => {
    if (count)
      if (setInvAmount) {
        if (invAmount && invAmount <= count.min) setInvAmount(count.min)
        else setInvAmount((prev: number) => prev - 1)
      } else if (setMarketAmount) {
        if (marketAmount && marketAmount >= count.min)
          setMarketAmount(count.min)
        else setMarketAmount((prev: number) => prev - 1)
      }
  }

  const onIncreaseAmount = () => {
    if (count) {
      if (setInvAmount) {
        if (invAmount && invAmount >= count.max) setInvAmount(count.max)
        else setInvAmount((prev: number) => prev + 1)
      } else if (setMarketAmount) {
        if (marketAmount && marketAmount >= count.max)
          setMarketAmount(count.max)
        else setMarketAmount((prev: number) => prev + 1)
      }
    }
  }

  const _count = useMemo(() => {
    if (setInvAmount) return invAmount
    if (setMarketAmount) return marketAmount
    0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invAmount, marketAmount])

  useEffect(() => {
    let load = false
    if (!load) {
      const _priceValue = invPrice || price || 0
      const _valueNaka = formatNumber(calcNAKAPrice(_priceValue), {
        maximumFractionDigits: 4
      })
      setSellPriceNaKa(_valueNaka)
      const _valueUSD = formatNumber(calcUSDPrice(_priceValue), {
        maximumFractionDigits: 4
      })
      setSellPriceUSD(_valueUSD)
    }
    return () => {
      load = true
    }
  }, [calcNAKAPrice, price, invPrice, formatNumber, calcUSDPrice])

  return (
    <div
      className={`flex w-full flex-wrap items-center justify-between ${
        marketType === "nft_avatar" || marketType === "nft_naka_punk"
          ? "flex-col sm:flex-row"
          : null
      }`}
      data-testid={type}
    >
      {count && type !== "nft_land" && type !== "nft_building" ? (
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
                <PinnedMapIcon />
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
      type === "nft_avatar" ? (
        <FormattedInputs
          label="PRICE (NAKA)"
          className="!w-[131px] sm:!w-[232px]"
          values={sellPriceNaKa}
          onSetValues={onPriceChange}
          disabled={!!price}
          propsInput={{
            startAdornment: (
              <InputAdornment
                position="start"
                className="ml-[15px] mr-3"
              >
                <LogoIcon fill="#70727B" />
              </InputAdornment>
            )
          }}
          helperText={`= ${sellPriceUSD} USD`}
        />
      ) : null}
    </div>
  )
}

export default TextfieldDetailContent
