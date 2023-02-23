/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import HrLine from "@components/icons/HrLine"
import { Alert, Typography } from "@mui/material"
import { memo, useCallback, useMemo } from "react"
import INaka from "@components/icons/Naka"
import Helper from "@utils/helper"
import { MESSAGES } from "@constants/messages"
import { formatEther } from "ethers/lib/utils"
import useProfileStore from "@stores/profileStore"
import IBusd from "@components/icons/Busd"
import { useWeb3Provider } from "@providers/Web3Provider"
import useAllBalances from "@hooks/useAllBalances"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import CONFIGS from "@configs/index"
import { chainIdConfig } from "@configs/sites"
import Input from "../atoms/Input"

interface IProp {
  type: string
  onSubmit: (_data) => void
  edit?: boolean
}

const Form = ({ type = "buy", edit = false, onSubmit, ...dataForm }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { address, signer } = useWeb3Provider()
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { nakaCurrentPrice, fee } = useContractMultichain()
  const { formatNumber, removeComma } = Helper

  const chainRequired = signer?.provider?._network?.chainId ?? 0

  const balance = !edit
    ? type === "buy"
      ? busdVaultBalance.text
      : nakaVaultBalance.text
    : type === "buy"
    ? nakaVaultBalance.text
    : busdVaultBalance.text

  const disableButton = useMemo(() => {
    if (
      profile &&
      address &&
      balance &&
      balance !== "N/A" &&
      address?.toLowerCase() === profile.address.toLowerCase() &&
      Helper.removeComma(balance) >=
        Number(dataForm["watch"]("price")) *
          Number(dataForm["watch"]("amount")) &&
      Number(dataForm["watch"]("amount")) > 0 &&
      Number(dataForm["watch"]("price")) > 0
    ) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    balance,
    profile,
    dataForm["watch"]("price"),
    dataForm["watch"]("amount")
  ])

  const buttonSubmit = useCallback(
    () => (
      <ButtonToggleIcon
        startIcon=""
        endIcon=""
        disabled={disableButton}
        text={`${edit ? "edit" : "create"} ${type} NAKA`}
        handleClick={() => {}}
        className={`leading-2 mt-5 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${
          type === "buy" ? " bg-varidian-default " : " bg-error-main"
        } !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
        type="submit"
      />
    ),
    [type, disableButton]
  )

  const buttonSwitched = () => (
    <Typography className=" py-3 text-center uppercase">
      switch network
    </Typography>
  )

  const buttonData = useMemo(() => {
    if (edit) {
      if (type === "buy") {
        if (Number(chainRequired) === Number(CONFIGS.CHAIN.CHAIN_ID)) {
          return buttonSubmit()
        }
        return buttonSwitched()
      }
    }
    if (type === "buy") {
      if (Number(chainRequired) === Number(chainIdConfig.binance)) {
        return buttonSubmit()
      }
      return buttonSwitched()
    }
    if (Number(chainRequired) === Number(CONFIGS.CHAIN.CHAIN_ID)) {
      return buttonSubmit()
    }
    return buttonSwitched()
  }, [CONFIGS.CHAIN.CHAIN_ID, chainIdConfig, type, edit])

  return (
    <form onSubmit={dataForm["handleSubmit"](onSubmit)}>
      <div className=" flex items-center justify-center">
        <div className=" flex w-[454px] items-center justify-center rounded-lg bg-neutral-780 p-10">
          <div>
            <Typography className=" font-neue-machina text-sm uppercase text-neutral-500">
              CREATE AN ORDER IN WHICH YOU WOULD LIKE TO BUY NAKA. PEOPLE WHO
              ARE INTERESTED IN YOUR PRICE WILL TAKE YOUR ORDER.
            </Typography>
            <HrLine className="my-3 " />
            <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
              enter price naka/busd
            </Typography>
            <Input
              name="price"
              endIcon={type === "buy" ? <IBusd /> : <INaka />}
              placeholder="Enter price"
              {...dataForm}
            />

            <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
              reference price
              <span className="ml-2 uppercase text-neutral-300">
                {nakaCurrentPrice !== undefined
                  ? Helper.formatNumber(Number(nakaCurrentPrice.last), {
                      maximumFractionDigits: 4
                    })
                  : 0}
                {edit
                  ? type === "sell"
                    ? " busd"
                    : " naka"
                  : type === "sell"
                  ? " naka"
                  : " busd"}
              </span>
            </Typography>
            <div className="flex justify-center">
              <div className="my-3 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700">
                <ArrowDownwardIcon />
              </div>
            </div>
            <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
              You will {type === "sell" ? "pay" : "recieve"}
            </Typography>
            <Input
              name="amount"
              endIcon={<INaka />}
              placeholder="Enter The amount of NAKA"
              {...dataForm}
            />

            <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
              you will {type === "buy" ? "pay" : "recieve"}
              <span className="ml-2 text-neutral-300">
                {formatNumber(
                  Number(dataForm["watch"]("price")) *
                    Number(dataForm["watch"]("amount")),
                  {
                    maximumFractionDigits: 4
                  }
                )}{" "}
                busd
              </span>
            </Typography>
            {buttonData}
            <Typography className="my-2 text-center font-neue-machina text-sm uppercase text-neutral-500">
              fee {formatEther(fee)} busd
            </Typography>
            {disableButton && (
              <Alert severity="error">
                <Typography className="  text-center font-neue-machina text-sm text-error-main">
                  {!profile ? `${MESSAGES["please_login"]}, ` : ""}
                  {address?.toLowerCase() !== profile?.address.toLowerCase()
                    ? `${MESSAGES["please-connect-wallet"]}, `
                    : ""}
                  {balance === "N/A" ||
                  removeComma(balance) <
                    Number(dataForm["watch"]("price")) *
                      Number(dataForm["watch"]("amount"))
                    ? `${MESSAGES["balance_not_enough"]}, `
                    : ""}
                  {dataForm["watch"]("amount") === "" ||
                  dataForm["watch"]("price") === "" ||
                  Number(dataForm["watch"]("amount")) < 1 ||
                  Number(dataForm["watch"]("price")) < 1
                    ? `${MESSAGES["please_fill"]}`
                    : ""}
                </Typography>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
export default memo(Form)
