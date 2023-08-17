import React, { memo } from "react"
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { Trans } from "next-i18next"
import dynamic from "next/dynamic"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"
import useWalletContoller, {
  Method
} from "@feature/wallet/containers/hooks/useWalletContoller"

const ModalCustom = dynamic(
  () => import("@components/molecules/Modal/ModalCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonWallet = dynamic(() => import("./ButtonWallet"), {
  suspense: true,
  ssr: false
})
const ModalHeader = dynamic(() => import("../Modal/ModalHeader"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("../gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)

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
    <Box
      component="div"
      className="xs:flex-col items-center justify-between gap-1 lg:flex"
    >
      <ButtonWallet
        title={title}
        handleButton={() => handleOpen(tokenSelected)}
      />
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
                    <Icomoon className="icon-Naka text-[#70727B]" />
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
                    <Icomoon className="icon-All !text-[10px]" />
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
                startIcon={<Icomoon className="icon-Arrow-Up-with-Line" />}
                text={<Trans i18nKey={title} />}
                handleClick={() => onSubmit("withdraw")}
                className="flex h-[50px] w-full items-center justify-center rounded-md bg-red-default font-neue-machina text-sm font-bold capitalize leading-3 text-neutral-900 disabled:bg-neutral-800 disabled:text-neutral-600"
                type="button"
                disabled={disabled}
              />
            ) : (
              <ButtonToggleIcon
                startIcon={<Icomoon className="icon-Arrow-Down-with-Line" />}
                endIcon={
                  <Icomoon className="icon-Full-Arrow-Right text-[#010101]" />
                }
                text={<Trans i18nKey={title} />}
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
    </Box>
  )
}

export default memo(RightMenuWallet)
