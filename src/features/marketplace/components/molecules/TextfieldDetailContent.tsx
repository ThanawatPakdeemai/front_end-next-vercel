import LogoIcon from "@components/icons/LogoIcon"
import NumpadIcon from "@components/icons/NumpadIcon"
import PinnedMapIcon from "@components/icons/PinnedMapIcon"
import CountItem from "@components/molecules/CountItem"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import { InputAdornment, TextField } from "@mui/material"
import Helper from "@utils/helper"
import React, { useMemo } from "react"
import { useInventoryProvider } from "@providers/InventoryProvider"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"
import useGlobal from "@hooks/useGlobal"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"

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
  const _priceValue = invPrice || price

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

  return (
    <div
      className={`flex w-full items-center justify-between ${
        marketType === "nft_avatar" || marketType === "nft_naka_punk"
          ? "flex-col sm:flex-row"
          : null
      }`}
      data-testid={type}
    >
      {count && type !== "nft_land" && type !== "nft_building" && (
        <CountItem
          endIcon={<NumpadIcon />}
          helperText={count.helperText}
          label={count.label}
          min={count.min}
          max={count.max}
          count={_count}
          _minusItem={onDecreaseAmount}
          _addItem={onIncreaseAmount}
        />
      )}
      {position && (
        <TextField
          value={`${position.x}, ${position.y}`}
          label="BLOCK IN MAP"
          className="!w-[131px] sm:!w-[232px]"
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
      )}
      {/* (countItemSelected * _priceValue) */}
      {_priceValue && (
        <TextField
          value={Helper.formatNumber(calcNAKAPrice(_priceValue), {
            maximumFractionDigits: 4
          })}
          label="PRICE (NAKA)"
          className="!w-[131px] sm:!w-[232px]"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#010101"
            },
            "input": {
              color: "#E1E2E2 !important"
            }
          }}
          onChange={(e) => onPriceChange(e.target.value)}
          disabled={!!price}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className="ml-[15px] mr-3"
              >
                <LogoIcon fill="#70727B" />
              </InputAdornment>
            )
          }}
          helperText={`= ${Helper.formatNumber(calcUSDPrice(_priceValue), {
            maximumFractionDigits: 4
          })} USD`}
        />
      )}
    </div>
  )
}

export default TextfieldDetailContent
