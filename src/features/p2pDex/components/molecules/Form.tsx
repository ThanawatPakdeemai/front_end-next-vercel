/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useCallback, useMemo } from "react"
import { formatEther } from "ethers/lib/utils"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useTranslation } from "next-i18next"
import dynamic from "next/dynamic"
import Helper from "@utils/helper"
import { MESSAGES } from "@constants/messages"
import useProfileStore from "@stores/profileStore"
import { useWeb3Provider } from "@providers/Web3Provider"
import useAllBalances from "@hooks/useAllBalances"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import CONFIGS from "@configs/index"
import { chainIdConfig } from "@configs/sites"
import useSwitchNetwork from "@hooks/useSwitchNetwork"
import useChainSupportStore from "@stores/chainSupport"
import { ITokenContract } from "@feature/contract/containers/hooks/useContractVaultBinance"

const Input = dynamic(() => import("../atoms/Input"), {
  suspense: true,
  ssr: false
})
const RightMenuNotLogIn = dynamic(
  () => import("@components/molecules/rightMenu/RightMenuNotLogIn"),
  {
    suspense: true,
    ssr: false
  }
)
const SwitchChain = dynamic(() => import("@components/atoms/SwitchChain"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Alert = dynamic(() => import("@mui/material/Alert"), {
  suspense: true,
  ssr: false
})
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
  ssr: false
})
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  type: string
  onSubmit: (_data) => void
  edit?: boolean
  chain?: string
}

const Form = ({
  type = "buy",
  edit = false,
  onSubmit,
  chain,
  ...dataForm
}: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { address, signer } = useWeb3Provider()
  const { balanceValutBusd, balanceValutNaka } = useAllBalances()
  const { nakaCurrentPrice, fee } = useContractMultichain()
  const { handleSwitchNetwork } = useSwitchNetwork()
  const { formatNumber } = Helper
  const { t } = useTranslation()
  const { chainSupport } = useChainSupportStore()

  const chainRequired = signer?.provider?._network?.chainId ?? 0

  // const balance = useMemo(() => {
  //   if (chain === "polygon") {
  //     return Number(balanceValutNaka?.digit)
  //   }
  //   return Number(balanceValutBusd?.digit)
  // }, [balanceValutNaka, balanceValutBusd, chain])

  const balance = useMemo(
    () =>
      Number(
        (chainSupport as unknown as ITokenContract)?.[0]?.balanceVault?.digit
      ),
    [chainSupport]
  )

  const total = useMemo(
    () =>
      Number(dataForm["watch"]("price")) * Number(dataForm["watch"]("amount")),
    [dataForm, dataForm["watch"]("price"), dataForm["watch"]("amount")]
  )

  const disableButton = useMemo(() => {
    if (
      profile &&
      address &&
      address?.toLowerCase() === profile?.address?.toLowerCase() &&
      Number(balance) >= total &&
      total > 0 &&
      dataForm["watch"]("amount") !== "" &&
      dataForm["watch"]("price") !== ""
    ) {
      return false
    } else {
      return true
    }
  }, [
    address,
    balance,
    total,
    balanceValutNaka,
    balanceValutBusd,
    chain,
    profile?.address,
    dataForm,
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
        className={`leading-2 mb-5 mt-5 flex h-[50px] w-full items-center  justify-center rounded-md ${
          type === "buy" ? " bg-varidian-default " : " bg-error-main"
        } !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
        type="submit"
      />
    ),
    [
      type,
      disableButton,
      address,
      balance,
      profile?.address,
      dataForm["watch"]("price"),
      dataForm["watch"]("amount"),
      total,
      balanceValutNaka,
      balanceValutBusd,
      chain,
      dataForm
    ]
  )

  const buttonSwitched = () => (
    <SwitchChain
      variant="full"
      handleClick={() =>
        chain === "polygon"
          ? handleSwitchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX as string)
          : handleSwitchNetwork(CONFIGS.CHAIN.CHAIN_ID_HEX_BNB as string)
      }
    />
  )

  const buttonData = useMemo(() => {
    if (profile && address) {
      if (chain === "polygon") {
        return Number(chainRequired) === Number(chainIdConfig.polygon)
          ? buttonSubmit()
          : buttonSwitched()
      }
      return Number(chainRequired) === Number(chainIdConfig.binance)
        ? buttonSubmit()
        : buttonSwitched()
    }
  }, [
    chainRequired,
    chainIdConfig,
    type,
    signer,
    edit,
    balance,
    balanceValutNaka,
    balanceValutBusd,
    disableButton,
    profile,
    address
  ])

  return (
    <form onSubmit={dataForm["handleSubmit"](onSubmit)}>
      <div className=" flex items-center justify-center">
        <div className=" flex w-full items-center justify-center rounded-lg bg-neutral-780 p-2 md:w-[454px] md:p-10">
          <div className="w-full md:w-auto">
            <Typography className=" font-neue-machina text-sm uppercase text-neutral-500">
              {t("create_order_buy_naka")}
            </Typography>
            {/* <HrLine className="my-3 w-full " /> */}
            <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
              {t("enter_price_naka_busd")}
            </Typography>
            <Input
              name="price"
              endIcon={
                type === "buy" ? (
                  <Icomoon className="icon-busd" />
                ) : (
                  <Icomoon className="icon-Naka text-error-main" />
                )
              }
              placeholder={String(t("enter_price_naka_busd"))}
              {...dataForm}
            />

            <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
              {t("reference_price")}
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
              {t("you_will")} {type === "sell" ? "pay" : "recieve"}
            </Typography>
            <Input
              name="amount"
              endIcon={<Icomoon className="icon-Naka text-error-main" />}
              placeholder={String("enter_amount_naka")}
              {...dataForm}
            />

            <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
              {t("you_will")} {type === "buy" ? "pay" : "recieve"}
              <span className="ml-2 text-neutral-300">
                {formatNumber(total, {
                  maximumFractionDigits: 4
                })}{" "}
                busd
              </span>
            </Typography>
            {profile ? (
              buttonData
            ) : (
              <div className="my-3 flex items-center justify-center">
                <RightMenuNotLogIn />
              </div>
            )}
            {!edit && (
              <Typography className="my-2 text-center font-neue-machina text-sm uppercase text-neutral-500">
                {t("fee")} {formatEther(fee)} busd
              </Typography>
            )}
            {disableButton && (
              <Alert severity="error">
                <Typography className="  text-center font-neue-machina text-sm text-error-main">
                  {!profile ? `${MESSAGES["please_login"]}, ` : ""}
                  {address?.toLowerCase() !== profile?.address.toLowerCase()
                    ? `${MESSAGES["please-connect-wallet"]}, `
                    : ""}
                  {balance <
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
