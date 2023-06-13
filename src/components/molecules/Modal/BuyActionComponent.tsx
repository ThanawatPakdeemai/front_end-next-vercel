import ButtonIcon from "@components/atoms/button/ButtonIcon"
import MinusIcon from "@components/icons/CountIcon/MinusIcon"
import LogoIcon from "@components/icons/LogoIcon"
import {
  TNFTType,
  TSellerType,
  TSellingType
} from "@feature/marketplace/interfaces/IMarketService"
import {
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material"
import Helper from "@utils/helper"
import React, { memo, useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { iconmotion } from "@components/organisms/Footer"
import PlusIcon from "@components/icons/CountIcon/PlusIcon"
import useGlobalMarket from "@feature/marketplace/containers/hooks/useGlobalMarket"
import TextTip from "@components/atoms/TextTip"
import { MARKET_INSTALL_PERIOD, MARKET_SELLING } from "@constants/market"

interface IProps {
  nftType: TNFTType
  selling: TSellingType
  seller: TSellerType
  currency: number
  price: number
  period: number
  setPeriod: (_period: number) => void
  maxPeriod: number
}

// mint || buy
const BuyActionComponent = ({
  nftType,
  selling,
  seller,
  currency,
  price,
  period,
  setPeriod,
  maxPeriod
}: IProps) => {
  const { formatNumber } = Helper
  const { checkAllowanceNaka, calcUSDPrice, calcNAKAPrice } = useGlobalMarket()
  const [isAllowance, setAllowance] = useState<boolean | undefined>(undefined)

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
    if (nftType && checkAllowanceNaka && price && seller) {
      await checkAllowanceNaka(nftType, seller, price, selling)
        .then((response) => {
          setAllowance(response)
        })
        .catch((error) => console.error(error))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftType, price, seller, selling])

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
      <span className="w-full text-xs uppercase">price</span>
      <TextField
        hiddenLabel
        value={formatNumber(calcNAKAPrice(price), {
          maximumFractionDigits: 4
        })}
        disabled
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
            <InputAdornment position="start">
              <LogoIcon />
            </InputAdornment>
          )
        }}
      />
      <span className="text-xs uppercase">
        ={" "}
        {formatNumber(calcUSDPrice(price), {
          maximumFractionDigits: 4
        })}{" "}
        USD
      </span>
      {selling === "fullpayment" ? (
        <>
          <span className="text-xs uppercase">Payment Type</span>
          <Select
            className="mx-[6px] mb-2 mt-2 rounded-sm bg-neutral-800 !px-2 py-1 text-sm font-bold capitalize text-neutral-300"
            value={selling}
            disabled
            sx={{
              maxHeight: 40,
              minHeight: 40
            }}
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
        </>
      ) : null}
      {selling === "installment" ? (
        <>
          <span className="text-xs uppercase">
            installment by smartcontract
          </span>
          {MARKET_INSTALL_PERIOD.map((p) => (
            <button
              key={uuidv4()}
              type="button"
              className={`flex h-[50px] w-full flex-row items-center justify-between rounded-sm border bg-neutral-800 px-4 text-sm font-bold uppercase text-neutral-300 ${
                period === p ? "border-secondary-main" : "border-neutral-700"
              }`}
              onClick={() => setPeriod(p)}
            >
              <span>{p} months</span>
              <span className="text-xs text-secondary-main">
                {period === p ? "selected" : null}
              </span>
            </button>
          ))}
        </>
      ) : null}
      {selling === "rental" ? (
        <>
          <span className="w-full text-xs uppercase">total price</span>
          <TextField
            hiddenLabel
            value={price * period}
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
                  <LogoIcon />
                </InputAdornment>
              )
            }}
          />
          <span className="text-xs uppercase">
            = {formatNumber(price * currency * period)} naka
          </span>
          <span className="w-full py-2">
            <Divider className="!block border-b-[1px] border-neutral-800/75" />
          </span>
          <span className="text-xs uppercase">
            select the rental period(days)
          </span>
          <div className="flex items-center">
            <ButtonIcon
              onClick={() => onDecreasePeriod()}
              variants={iconmotion}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 400, damping: 4 }}
              icon={<MinusIcon />}
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
              icon={<PlusIcon />}
              className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-secondary-main"
            />
          </div>
          <span className="text-xs uppercase">
            period(days) must be more than 0
          </span>
        </>
      ) : null}
      {isAllowance || isAllowance === undefined ? null : (
        <TextTip
          text="Please allow the contract to access your NFTS first."
          textColor="text-warning-dark !font-normal"
          bgColor="bg-[#1F1703]"
          borderColor="border-warning-dark"
          className="!mt-6"
        />
      )}
    </Stack>
  )
}

export default memo(BuyActionComponent)
