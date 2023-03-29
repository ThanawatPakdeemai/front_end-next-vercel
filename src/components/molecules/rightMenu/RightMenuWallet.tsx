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
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useWalletContoller, {
  Method
} from "@feature/wallet/containers/hooks/useWalletContoller"
import { ModalCustom } from "../Modal/ModalCustom"
import ButtonWallet from "./ButtonWallet"
import ModalHeader from "../Modal/ModalHeader"
import ButtonToggleIcon from "../gameSlide/ButtonToggleIcon"

export interface IRightMenuWalletProps {
  method: Method
  title: string
  titleHeader: string
  open: boolean
  handleOpen: (_chain: ITokenContract) => void
  handleClose: () => void
  tokenSelected: ITokenContract
}

const RightMenuWallet = ({
  method,
  title,
  titleHeader,
  open,
  handleOpen,
  handleClose,
  tokenSelected
}: IRightMenuWalletProps) => {
  const { onChangeAmount, value, disabled, onClickMaxValue, onSubmit } =
    useWalletContoller()
  return (
    <>
      <Box className="xs:flex-col items-center justify-between gap-1 lg:flex">
        <ButtonWallet
          title={title}
          handleButton={() => handleOpen(tokenSelected)}
        />
      </Box>

      <ModalCustom
        open={open}
        onClose={handleClose}
        className="gap-3 rounded-[34px] p-[10px] md:min-w-[450px]"
        width={400}
      >
        {tokenSelected &&
        tokenSelected.balanceVault &&
        tokenSelected.balanceWallet ? (
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
              type="text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%"
                }
              }}
              id="deposit-withdraw"
              placeholder="Enter amount"
              size="medium"
              // .replace(/^0+/, "")
              value={value}
              onChange={(e) =>
                onChangeAmount(e.target.value, method, tokenSelected)
              }
              InputProps={{
                inputProps: { min: 0, max: tokenSelected.balanceWallet },
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
                    onClick={() =>
                      onClickMaxValue(
                        method === "deposit"
                          ? tokenSelected.balanceWallet.digit
                          : tokenSelected.balanceVault.digit,
                        method
                      )
                    }
                  >
                    <AllIcon />
                  </InputAdornment>
                )
              }}
            />
            <Typography className="text-xs uppercase text-neutral-600">
              {`your ${tokenSelected.symbol} storage`} :
              <span className="text-secondary-main">
                {" "}
                {method === "deposit"
                  ? tokenSelected.balanceWallet.digit
                  : tokenSelected.balanceVault.digit}{" "}
                {tokenSelected.symbol}
              </span>
            </Typography>
            {title === "withdraw" ? (
              <ButtonToggleIcon
                startIcon={<Withdraw />}
                text={title}
                handleClick={() => onSubmit("withdraw")}
                className="flex h-[50px] w-full items-center justify-center rounded-md bg-red-default font-neue-machina text-sm font-bold capitalize leading-3 text-neutral-900 disabled:bg-neutral-800 disabled:text-neutral-600"
                type="button"
                disabled={disabled}
              />
            ) : (
              <ButtonToggleIcon
                startIcon={<Deposit />}
                endIcon={<IconArrowRight stroke="#010101" />}
                text={title}
                handleClick={() => onSubmit("deposit")}
                className="flex h-[50px] w-full items-center justify-center rounded-md bg-varidian-default font-neue-machina text-sm font-bold capitalize leading-3 text-neutral-900 disabled:bg-neutral-800 disabled:text-neutral-600"
                type="button"
                disabled={disabled}
              />
            )}
          </Stack>
        ) : (
          <></>
        )}
      </ModalCustom>
    </>
  )
}

export default memo(RightMenuWallet)
