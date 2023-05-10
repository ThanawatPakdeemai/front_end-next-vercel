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

  const calcNakaPrice = useMemo(() => {
    if (nakaPrice && countItemSelected && price) {
      return countItemSelected * (price / parseFloat(nakaPrice.last))
    }
    return 0
  }, [nakaPrice, countItemSelected, price])

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
          count={count.count}
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
      {price && (
        <TextField
          value={countItemSelected * price}
          label="PRICE (NAKA)"
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
                <LogoIcon />
              </InputAdornment>
            )
          }}
          helperText={`= ${Helper.formatNumber(calcNakaPrice, {
            maximumFractionDigits: 4
          })} USD`}
        />
      )}
    </div>
  )
}

export default TextfieldDetailContent
