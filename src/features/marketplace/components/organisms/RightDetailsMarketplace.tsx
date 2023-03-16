import ButtonClose from "@components/atoms/button/ButtonClose"
import CopyButton from "@components/atoms/CopyButton"
import PinnedMapIcon from "@components/icons/PinnedMapIcon"
import {
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import { useNakaPriceProvider } from "@providers/NakaPriceProvider"
import LogoIcon from "@components/icons/LogoIcon"
import Helper from "@utils/helper"

interface IProp {
  token?: string | number
  title?: string
  method: "buy" | "mint"
  position?: {
    x: string
    y: string
  }
  price?: number
}

const RightDetailsMarketplace = ({
  token,
  title,
  method,
  position,
  price
}: IProp) => {
  const router = useRouter()
  const { price: nakaPrice } = useNakaPriceProvider()
  const calcNakaPrice = price
    ? ((price / (nakaPrice ? parseFloat(nakaPrice.last) : 0)) as number)
    : 0
  const { formatNumber, shortenString } = Helper
  const getPathnameType = router.pathname.split("/")[2]
  const handleType = () => {
    const pathMap = {
      building: "building",
      game: "game assets",
      material: "material",
      "naka-punk": "nft",
      default: "land"
    }

    return pathMap[getPathnameType] || pathMap["default"]
  }

  return (
    <div className="w-1/2">
      {token && (
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-[6px]">
            <Chip
              label={`TOKEN ID : ${shortenString(String(token))}`}
              size="small"
              variant="outlined"
            />
            <CopyButton
              text={token as string}
              className="!bg-neutral-780"
            />
          </div>
          <ButtonClose
            onClick={() => router.back()}
            insideClassName="!bg-error-main hover:bg-error-main"
          />
        </div>
      )}
      <Typography className="text-[46px] font-bold uppercase text-neutral-300">
        {title}
      </Typography>
      <div className="w-ful flex flex-col gap-y-6 rounded-3xl border-neutral-800 bg-neutral-780 py-7 px-[42px] uppercase">
        <div className="flex items-center gap-5">
          <Typography className="text-neutral-300">{method}</Typography>
          <Chip
            label={handleType()}
            size="small"
            color="info"
          />
        </div>
        <Divider className="!block border-[1px] border-neutral-800" />
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
              helperText={`= ${formatNumber(calcNakaPrice, {
                maximumFractionDigits: 4
              })} USD`}
            />
          )}
        </div>
        <Divider className="!block border-[1px] border-neutral-800" />
      </div>
    </div>
  )
}

export default RightDetailsMarketplace
