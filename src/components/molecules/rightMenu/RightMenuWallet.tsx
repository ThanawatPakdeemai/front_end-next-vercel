import React, { memo } from "react"
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import INaka from "@components/icons/Naka"
import AllIcon from "@components/icons/DepositWithdraw/AllIcon"
import Deposit from "@components/icons/DepositWithdraw/Deposit"
import IconArrowRight from "@components/icons/arrowRightIcon"
import Withdraw from "@components/icons/DepositWithdraw/WithDraw"
import Helper from "@utils/helper"
import { ModalCustom } from "../Modal/ModalCustom"
import ButtonWallet from "./ButtonWallet"
import ModalHeader from "../Modal/ModalHeader"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

interface IProp {
  title: string
  titleHeader: string
  subtTitle: string
  open: boolean
  value: number
  balance: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  handleOpen: () => void
  handleClose: () => void
  handleContract: (_method: "deposit" | "withdraw") => void
}

const RightMenuWallet = ({
  title,
  titleHeader,
  subtTitle,
  open,
  value,
  balance,
  setValue,
  handleOpen,
  handleClose,
  handleContract
}: IProp) => {
  const { formatNumber } = Helper
  const handleMaxValue = () => {
    setValue(balance - 0.00001)
  }

  return (
    <>
      <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
        <ButtonWallet
          title={title}
          handleButton={handleOpen}
        />
      </Box>
      <ModalCustom
        open={open}
        onClose={handleClose}
        className="min-w-[450px] gap-3 rounded-[34px] p-[10px]"
        width={400}
      >
        <Stack
          spacing={3}
          className="md:p-5"
        >
          <div className="rounded-2xl border-[1px] border-neutral-700 bg-neutral-800 p-4 uppercase">
            <ModalHeader
              handleClose={handleClose}
              title={titleHeader}
            />
          </div>
          <Typography className="text-xs uppercase text-black-default">
            I want to {title}
          </Typography>
          <TextField
            className="w-full"
            required
            type="number"
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "100%"
              }
            }}
            id="deposit-withdraw"
            placeholder="Enter amount"
            size="medium"
            value={value.toString().replace(/^0+/, "")}
            onChange={(e) => {
              const inputValue = e.target.value
              if (Number(inputValue) <= balance) {
                setValue(Number(inputValue))
              } else {
                handleMaxValue()
              }
            }}
            InputProps={{
              inputProps: { min: 0, max: balance },
              style: {
                fontSize: "14px",
                fontFamily: "neueMachina",
                color: "#70727B"
              },
              startAdornment: (
                <InputAdornment position="start">
                  <INaka color="#70727B" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className="cursor-pointer"
                  onClick={handleMaxValue}
                >
                  <AllIcon />
                </InputAdornment>
              )
            }}
          />
          <Typography className="text-xs uppercase text-neutral-600">
            {subtTitle} :
            <span className="text-secondary-main">
              {" "}
              {formatNumber(balance, { maximumFractionDigits: 2 })} naka
            </span>
          </Typography>
          {title === "withdraw" ? (
            <ButtonToggleIcon
              startIcon={<Withdraw />}
              text={title}
              handleClick={() => handleContract("withdraw")}
              className="btn-rainbow-theme flex h-[50px] w-full items-center justify-center rounded-md bg-error-main font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
              type="button"
            />
          ) : (
            <ButtonToggleIcon
              startIcon={<Deposit />}
              endIcon={<IconArrowRight stroke="#010101" />}
              text={title}
              handleClick={() => handleContract("deposit")}
              className="flex h-[50px] w-full items-center justify-center rounded-md bg-varidian-default font-neue-machina text-sm font-bold capitalize leading-3 text-neutral-900"
              type="button"
            />
          )}
        </Stack>
      </ModalCustom>
    </>
  )
}

export default memo(RightMenuWallet)
