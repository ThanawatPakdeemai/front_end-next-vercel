import LogoIcon from "@components/icons/LogoIcon"
import NumpadIcon from "@components/icons/NumpadIcon"
import PinnedMapIcon from "@components/icons/PinnedMapIcon"
import { TType } from "@feature/marketplace/interfaces/IMarketService"
import { InputAdornment, TextField } from "@mui/material"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  type: TType
  position?: {
    x: string
    y: string
  }
  itemAmount?: number
  price?: number
}

const TextfieldDetailContent = ({
  type,
  position,
  itemAmount,
  price
}: IProp) => {
  const { price: nakaPrice } = useNakaPriceProvider()
  const calcNakaPrice = price
    ? ((price / (nakaPrice ? parseFloat(nakaPrice.last) : 0)) as number)
    : 0
  return (
    <div className="flex w-full items-start justify-between">
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
        />
      )}
      {(type === "game-item" || type === "material") && itemAmount && (
        <TextField
          value={itemAmount}
          label="SUPPLY IN MARKET"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#010101"
            },
            "input": {
              color: "#E1E2E2 !important"
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NumpadIcon />
              </InputAdornment>
            )
          }}
          helperText={`TOTAL SUPPLY : ${itemAmount}`}
        />
      )}
      {price && (
        <TextField
          value={price}
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
