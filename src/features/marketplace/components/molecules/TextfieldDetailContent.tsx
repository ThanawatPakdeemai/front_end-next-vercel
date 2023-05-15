import LogoIcon from "@components/icons/LogoIcon"
import NumpadIcon from "@components/icons/NumpadIcon"
import PinnedMapIcon from "@components/icons/PinnedMapIcon"
import CountItem from "@components/molecules/CountItem"
import { TNFTType } from "@feature/marketplace/interfaces/IMarketService"
import { InputAdornment, TextField } from "@mui/material"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import Helper from "@utils/helper"
import React, { useMemo } from "react"
import useCountStore from "@stores/countComponant"
import { useInventoryProvider } from "@providers/InventoryProvider"
import { useMarketplaceProvider } from "@providers/MarketplaceProvider"

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
  const { price: nakaPrice } = useNakaPriceProvider()
  const { count: countItemSelected } = useCountStore()
  const { invPrice, setInvPrice } = useInventoryProvider()
  const { marketAmount, setMarketAmount } = useMarketplaceProvider()
  const _priceValue = invPrice || price

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    if (setInvPrice) setInvPrice(_value)
  }
  const calcNakaPrice = useMemo(() => {
    if (nakaPrice && countItemSelected && _priceValue) {
      return countItemSelected * (parseFloat(nakaPrice.last) * _priceValue)
    }
    return 0
  }, [nakaPrice, countItemSelected, _priceValue])

  const onDecreaseAmount = () => {
    if (count && setMarketAmount) {
      if (marketAmount && marketAmount <= count.min) {
        setMarketAmount(count.min)
      } else {
        setMarketAmount((prev: number) => prev - 1)
      }
    }
  }

  const onIncreaseAmount = () => {
    if (count && setMarketAmount) {
      if (marketAmount && marketAmount >= count.max) {
        setMarketAmount(count.max)
      } else {
        setMarketAmount((prev: number) => prev + 1)
      }
    }
  }

  return (
    <div
      className="flex w-full items-center justify-between"
      data-testid={type}
    >
      {count && type !== "nft_land" && type !== "nft_building" && (
        <CountItem
          endIcon={<NumpadIcon />}
          helperText={count.helperText}
          label={count.label}
          min={count.min}
          max={count.max}
          count={marketAmount}
          _minusItem={onDecreaseAmount}
          _addItem={onIncreaseAmount}
        />
      )}
      {position && (
        <TextField
          value={`${position.x}, ${position.y}`}
          label="BLOCK IN MAP"
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
              <InputAdornment position="start">
                <PinnedMapIcon />
              </InputAdornment>
            )
          }}
          helperText="Land position on map"
        />
      )}
      <TextField
        value={price ? countItemSelected * price : invPrice}
        label="PRICE (NAKA)"
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
            <InputAdornment position="start">
              <LogoIcon />
            </InputAdornment>
          )
        }}
        helperText={`= ${Helper.formatNumber(calcNakaPrice, {
          maximumFractionDigits: 4
        })} USD`}
      />
    </div>
  )
}

export default TextfieldDetailContent
