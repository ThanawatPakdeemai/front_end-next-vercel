/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Alert, Box, Typography } from "@mui/material"
import React, { ReactNode, useEffect, useMemo } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import AmountBalance from "@components/molecules/balance/AmountBalance"

import HrLine from "@components/icons/HrLine"
import useAllBalances from "@hooks/useAllBalances"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import { formatEther } from "ethers/lib/utils"
import { useWeb3Provider } from "@providers/Web3Provider"

import Helper from "@utils/helper"
import useProfileStore from "@stores/profileStore"
import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"

import ModalHeader from "@components/molecules/Modal/ModalHeader"
import {
  IMultiData,
  IMultiTrustOrder
} from "@feature/multichain/interfaces/IMultichain"

import { useToast } from "@feature/toast/containers"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import useP2PDexExOrder from "@feature/p2pDex/containers/hooks/useP2PDexExOrder "
import Input from "../atoms/Input"

interface IPropContent {
  title: string | ReactNode
  value: string | ReactNode
}
interface IProp {
  type?: string
  edit?: boolean
  open: boolean
  handleModal: () => void
  dataEdit: IMultiData | IMultiTrustOrder | undefined
  cancelOrder?: () => void
  refetchData?: () => void
}
const FormEx = ({
  type = "buy",
  edit = false,
  open = false,
  handleModal,
  dataEdit,
  cancelOrder,
  refetchData
}: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const { address } = useWeb3Provider()
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { setClose, setOpen } = useLoadingStore()
  const { fee, sendRequestSellNaka, p2pPolygonContract } =
    useContractMultichain()
  const { mutateExOrder } = useP2PDexExOrder()

  const { successToast } = useToast()

  const { shortenString, copyClipboard, formatNumber } = Helper

  const balance = type === "buy" ? busdVaultBalance.text : nakaVaultBalance.text

  const priceBusdDefault = useMemo(
    () => Number(dataEdit?.busd_price),
    [dataEdit]
  )
  const priceNakaDefault = useMemo(
    () => Number(dataEdit?.naka_price),
    [dataEdit]
  )
  const amountDefault = useMemo(() => Number(dataEdit?.naka_amount), [dataEdit])

  const formData = useForm({
    defaultValues: {
      price: type === "buy" ? priceNakaDefault : priceBusdDefault,
      amount: amountDefault
    }
  })

  const {
    handleSubmit,
    watch,
    setValue
    // formState: { errors }
  } = formData

  // !defaultvalue
  useEffect(() => {
    const price =
      type === "sell"
        ? Number(priceNakaDefault) * Number(amountDefault)
        : Number(priceBusdDefault) * Number(amountDefault)

    setValue("price", price)
    setValue("amount", amountDefault)

    return () => {
      setValue("amount", 0)
      setValue("price", 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit])

  // !setValue amount
  useEffect(() => {
    const price =
      type === "sell"
        ? Number(priceNakaDefault) * Number(watch("amount"))
        : Number(priceBusdDefault) * Number(watch("amount"))
    setValue("price", Number(formatNumber(price, { maximumFractionDigits: 4 })))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("amount")])

  const onSubmit = (_data) => {
    setOpen(MESSAGES.transaction_processing_order)
    if (dataEdit) {
      sendRequestSellNaka(
        dataEdit.order_id,
        dataEdit.wallet_address,
        _data.price,
        _data.amount,
        amountDefault
      ).then((receipt) => {
        if ((receipt as IResponseGetFee).data) {
          const _receipt = (receipt as IResponseGetFee).data
          if (_receipt && _receipt.logs) {
            const event = _receipt.logs.find(
              (log) => log.address === p2pPolygonContract.address
            )

            const events = p2pPolygonContract.interface.parseLog(event)

            if (events) {
              const request_id =
                type === "buy"
                  ? events.args.requestBuyNakaId
                  : events.args.requestSellNakaId
              const order_id =
                type === "buy"
                  ? events.args.polygonOrderSellId
                  : events.args.binanceOrderBuyId
              const busd_price =
                type === "buy" ? "0" : events.args.busdPrice.toString()
              const naka_price =
                type === "buy" ? events.args.nakaPrice.toString() : "0"
              const naka_amount =
                type === "buy"
                  ? events.args.buyAmount.toString()
                  : events.args.sellAmount.toString()
              const buyer_address = events.args.buyer
              const seller_address = events.args.seller

              mutateExOrder({
                _requestId: request_id,
                _orderId: order_id,
                _type: type,
                _busdPrice: busd_price,
                _nakaPrice: naka_price,
                _nakaAmount: naka_amount,
                _buyerAddress: buyer_address,
                _sellerAddress: seller_address,
                _totalPrice: amountDefault.toString(),
                _address: dataEdit.wallet_address
              })
                .then((_res) => {
                  if (refetchData) refetchData()
                  handleModal()
                  setClose()
                })
                .catch((_err) => {
                  setClose()
                })
            }
          }
        }
      })
    }
  }

  const disableButton = useMemo(() => {
    if (
      profile &&
      address &&
      balance &&
      balance !== "N/A" &&
      address?.toLowerCase() === profile.address.toLowerCase() &&
      Helper.removeComma(balance) >=
        Number(watch("price")) * Number(watch("amount")) &&
      Number(watch("amount")) > 0 &&
      Number(watch("price")) > 0 &&
      Number(watch("amount")) <= amountDefault
    ) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, balance, profile, watch("price"), watch("amount")])

  const dataInfo: IPropContent[] = [
    {
      title: "SELLER ADDRESS",
      value: (
        <>
          {dataEdit && (
            <div className="flex items-center gap-2">
              <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                {shortenString(dataEdit.wallet_address)}
              </div>
              <Box
                className=" cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                onClick={() => {
                  copyClipboard(dataEdit.wallet_address)
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
      title: "Order ID ",
      value: (
        <>
          {dataEdit && (
            <div className="flex items-center gap-2">
              <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                {shortenString(dataEdit?.order_id)}
              </div>
              <Box
                className=" cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                onClick={() => {
                  copyClipboard(dataEdit?.order_id)
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
      title: `price per ${type === "sell" ? "busd" : "naka"}`,
      value: `${
        type === "buy" ? dataEdit?.busd_price ?? "" : dataEdit?.naka_price ?? ""
      } ${type === "sell" ? "busd" : "naka"}`
    },
    {
      title: "Available",
      value: dataEdit ? `${dataEdit.naka_amount} NAKA` : ""
    }
  ]

  return (
    <>
      <ModalCustom
        open={open}
        onClose={handleModal}
        className="gap-3 rounded-[34px] p-[10px]"
        width="auto"
      >
        <>
          <ModalHeader
            bg=" bg-neutral-700 rounded-lg p-3"
            handleClose={handleModal}
            title={
              <p className=" font-neue-machina-bold uppercase">
                <span
                  className={`${
                    type === "buy"
                      ? " !text-varidian-default"
                      : " !text-error-main"
                  }`}
                >
                  {type}
                  {" : "}
                </span>
                NAKA
              </p>
            }
          />
          <div className="xs:block xs:mb-5 custom-scroll h-[545px] items-center  justify-between  gap-3 overflow-y-auto lg:mb-0 lg:flex">
            <div className="flex   items-center justify-between ">
              <div className="mt-3 h-[528px] w-[454px] flex-col items-center  justify-center rounded-lg border-2 border-neutral-780 bg-primary-main p-10">
                {dataInfo.map((ele, index) => (
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
                        your wallet balance
                      </Typography>
                      <HrLine className="" />
                    </div>
                    <AmountBalance
                      dataBalance={[
                        {
                          icon: type === "sell" ? <INaka /> : <IBusd />,
                          balance:
                            type === "sell"
                              ? nakaVaultBalance.text
                              : busdVaultBalance.text
                        }
                      ]}
                    />
                  </div>
                </div>
                {edit && (
                  <ButtonToggleIcon
                    startIcon=""
                    endIcon=""
                    text="cancel order"
                    handleClick={cancelOrder}
                    className={`leading-2 mt-5 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${" bg-secondary-main"} !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
                    type="button"
                  />
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-3 flex items-center justify-center ">
                <div className=" flex h-[528px] w-[454px] items-center justify-center rounded-lg border-2 border-neutral-780 bg-neutral-780 p-5 py-8">
                  <div>
                    <Typography className=" font-neue-machina text-sm uppercase text-neutral-500">
                      {edit
                        ? "enter price naka/busd"
                        : `HOW MANY NAKA WOULD YOU LIKE TO ${type}?`}
                    </Typography>
                    <Input
                      name="amount"
                      endIcon={<INaka />}
                      placeholder="Enter The amount of NAKA"
                      {...formData}
                    />
                    <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
                      <p>
                        your total naka{" "}
                        <span className=" text-neutral-300">
                          {dataEdit?.naka_amount ?? 0}
                        </span>{" "}
                        <span
                          className=" cursor-pointer text-secondary-main"
                          onClick={() => setValue("amount", amountDefault)}
                        >
                          MAX
                        </span>{" "}
                      </p>
                    </Typography>
                    <div className="flex justify-center">
                      <div className="my-3 flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-neutral-700">
                        <ArrowDownwardIcon />
                      </div>
                    </div>
                    <Typography className="font-neue-machina text-sm uppercase text-neutral-500">
                      You will {type === "buy" ? "pay" : "recieve"}
                    </Typography>

                    <Input
                      name="price"
                      endIcon={type === "buy" ? <IBusd /> : <INaka />}
                      placeholder="Enter price"
                      disabled={!edit}
                      {...formData}
                    />
                    {edit && (
                      <Typography className="font-neue-machina text-sm uppercase text-neutral-600">
                        you will {type === "buy" ? "pay" : "recieve"}
                        <span className="ml-2 text-neutral-300">
                          {Helper.formatNumber(
                            Number(watch("price")) * Number(watch("amount")),
                            {
                              maximumFractionDigits: 4
                            }
                          )}{" "}
                          busd
                        </span>
                      </Typography>
                    )}

                    <ButtonToggleIcon
                      startIcon=""
                      endIcon=""
                      disabled={disableButton}
                      text={`${edit ? "edit" : ""} ${type} NAKA`}
                      handleClick={() => {}}
                      className={`leading-2 mt-5 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${
                        type === "buy"
                          ? " bg-varidian-default "
                          : " bg-error-main"
                      } !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
                      type="submit"
                    />
                    {edit && (
                      <Typography className="my-2 text-center font-neue-machina text-sm uppercase text-neutral-500">
                        fee {fee ? formatEther(fee) : 0} busd
                      </Typography>
                    )}

                    {disableButton && (
                      <Alert severity="error">
                        <Typography className="  text-center font-neue-machina text-sm text-error-main">
                          {!profile ? `${MESSAGES["please_login"]}, ` : ""}
                          {address?.toLowerCase() !==
                          profile?.address.toLowerCase()
                            ? `${MESSAGES["please-connect-wallet"]}, `
                            : ""}
                          {balance === "N/A" ||
                          Helper.removeComma(balance) <
                            Number(watch("price")) * Number(watch("amount"))
                            ? `${MESSAGES["balance_not_enough"]}, `
                            : ""}
                          {Number(watch("amount")) < 1 ||
                          Number(watch("price")) < 1
                            ? `${MESSAGES["please_fill"]}`
                            : ""}

                          {Number(watch("amount")) > amountDefault
                            ? `${MESSAGES.amount_many}`
                            : ""}
                        </Typography>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      </ModalCustom>
    </>
  )
}
export default FormEx
