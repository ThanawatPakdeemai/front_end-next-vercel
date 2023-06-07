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
import useGlobal from "@hooks/useGlobal"

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
  const { invPrice, setInvPrice, invenItemData, invAmount, setInvAmount } =
    useInventoryProvider()
  const { marketAmount, setMarketAmount, marketOrder } =
    useMarketplaceProvider()
  const { marketType } = useGlobal()
  const _priceValue = invPrice || price

  const onPriceChange = (value: string) => {
    const _value = Number(value)
    if (setInvPrice) setInvPrice(_value)
  }

  const calcNakaPrice = useMemo(() => {
    if (nakaPrice && countItemSelected && _priceValue) {
      return marketOrder?.seller_type === "user" ||
        invenItemData?.marketplaces_data?.seller_type === "user"
        ? countItemSelected * (parseFloat(nakaPrice.last) * _priceValue)
        : countItemSelected * (_priceValue / parseFloat(nakaPrice.last))
    }
    return 0
  }, [
    nakaPrice,
    countItemSelected,
    _priceValue,
    marketOrder?.seller_type,
    invenItemData?.marketplaces_data?.seller_type
  ])

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
      {_priceValue && (
        <TextField
          value={
            marketOrder?.seller_type === "user" ||
            invenItemData?.marketplaces_data?.seller_type === "user"
              ? _priceValue && countItemSelected * _priceValue
              : Helper.formatNumber(calcNakaPrice, {
                  maximumFractionDigits: 4
                })
          }
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
          helperText={`= ${
            marketOrder?.seller_type === "user" ||
            invenItemData?.marketplaces_data?.seller_type === "user"
              ? Helper.formatNumber(calcNakaPrice, {
                  maximumFractionDigits: 4
                })
              : _priceValue
          } USD`}
        />
      )}
    </div>
  )
}

export default TextfieldDetailContent
