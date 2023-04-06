import CopyTextIcon from "@components/icons/CopyTextIcon"
import HrLine from "@components/icons/HrLine"
import Balance from "@components/molecules/balance/Balance"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { chainIdConfig } from "@configs/sites"
import { MESSAGES } from "@constants/messages"
import {
  IMultiData,
  IMultiTrustOrder
} from "@feature/multichain/interfaces/IMultichain"
import { useToast } from "@feature/toast/containers"

// import useAllBalances from "@hooks/useAllBalances"
import { Box, Typography } from "@mui/material"
import { useWeb3Provider } from "@providers/Web3Provider"
import Helper from "@utils/helper"
import { ReactNode, useMemo } from "react"
import { Trans, useTranslation } from "react-i18next"

interface IPropContent {
  title: string | ReactNode
  value: string | ReactNode
}
interface IProp {
  dataInfo: IMultiData | IMultiTrustOrder | undefined
  type: string
  edit: boolean
  cancelOrder?: () => void
  chain?: string
}
const HeaderFormEx = ({ dataInfo, type, edit, cancelOrder, chain }: IProp) => {
  const { successToast } = useToast()
  const { signer } = useWeb3Provider()
  // const { balanceValutNaka, balanceValutBusd } = useAllBalances()
  const { shortenString, copyClipboard } = Helper
  const chainRequired = signer ? signer?.provider?._network?.chainId : 0
  const { t } = useTranslation()

  const isSwitchChain = useMemo(() => {
    if (chain === "polygon") {
      return Number(chainRequired) === Number(chainIdConfig.polygon)
    }
    return Number(chainRequired) === Number(chainIdConfig.binance)
  }, [chain, chainRequired])

  // const balance = useMemo(() => {
  //   if (chain === "polygon") {
  //     return balanceValutNaka
  //   }
  //   return balanceValutBusd
  // }, [balanceValutBusd, balanceValutNaka, chain])

  const price = useMemo(() => {
    if (edit) {
      return chain === "binance" ? dataInfo?.busd_price : dataInfo?.naka_price
    }
    return chain === "polygon" ? dataInfo?.busd_price : dataInfo?.naka_price
  }, [chain, dataInfo?.busd_price, dataInfo?.naka_price, edit])

  const dataTable: IPropContent[] = [
    {
      title: <Trans i18nKey="seller_address" />,
      value: (
        <>
          {dataInfo && (
            <div className="flex items-center gap-2">
              <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                {shortenString(dataInfo.wallet_address)}
              </div>
              <Box
                className=" cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                onClick={() => {
                  copyClipboard(dataInfo.wallet_address)
                  successToast(MESSAGES.copy_text_success)
                }}
              >
                <CopyTextIcon />
              </Box>
            </div>
          )}
        </>
      )
    },
    {
      title: <Trans i18nKey="order_id" />,
      value: (
        <>
          {dataInfo && (
            <div className="flex items-center gap-2">
              <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                {shortenString(dataInfo?.order_id)}
              </div>
              <Box
                className=" cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                onClick={() => {
                  copyClipboard(dataInfo?.order_id)
                  successToast(MESSAGES.copy_text_success)
                }}
              >
                <CopyTextIcon />
              </Box>
            </div>
          )}
        </>
      )
    },
    {
      title: `${t("price_per")} ${type === "sell" ? "busd" : "naka"}`,
      value: `${
        price
        // type === "sell"
        //   ? dataInfo?.busd_price ?? ""
        //   : dataInfo?.naka_price ?? ""
      } ${type === "sell" ? "busd" : "naka"}`
    },
    {
      title: <Trans i18nKey="available" />,
      value: dataInfo ? `${dataInfo.naka_amount} NAKA` : ""
    }
  ]
  return (
    <div className="flex items-center justify-between">
      <div className="mt-3 h-[528px] w-[454px] flex-col items-center  justify-center rounded-lg border-2 border-neutral-780 bg-primary-main p-10">
        {dataTable.map((ele, index) => (
          <div
            className="flex items-center justify-between border-b-2 border-neutral-700 py-5"
            key={Number(index)}
          >
            <Typography className=" font-neue-machina-bold text-sm uppercase text-neutral-500">
              {ele.title}
            </Typography>
            <Typography className=" font-neue-machina-bold text-sm uppercase text-neutral-300">
              {ele.value}
            </Typography>
          </div>
        ))}

        <div className="flex w-full items-center justify-center">
          <div className=" m-auto w-full flex-row  gap-y-3 rounded-[13px]  px-[5px] py-[5px]">
            <div className="my-5 flex items-center">
              <Typography className="mr-3 whitespace-nowrap font-neue-machina text-sm uppercase text-neutral-500">
                <Trans i18nKey="your_wallet_balance" />
              </Typography>
              <HrLine className="" />
            </div>
            <Balance />
          </div>
        </div>
        {edit && isSwitchChain && (
          <ButtonToggleIcon
            startIcon=""
            endIcon=""
            text={t("cancel_order")}
            handleClick={cancelOrder}
            className={`leading-2 mb-5 mt-5 flex h-[50px] w-full items-center  justify-center rounded-md ${" bg-secondary-main"} !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
            type="button"
          />
        )}
      </div>
    </div>
  )
}
export default HeaderFormEx
