import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Box, Typography } from "@mui/material"
import React, { ReactNode, useEffect, useMemo } from "react"
import AmountBalance from "@components/molecules/balance/AmountBalance"

import HrLine from "@components/icons/HrLine"
import useAllBalances from "@hooks/useAllBalances"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"

import Helper from "@utils/helper"
import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import useP2PDexEditOrder from "@feature/p2pDex/containers/hooks/useP2PDexEditOrder"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import {
  IMultiData,
  IMultiTrustOrder
} from "@feature/multichain/interfaces/IMultichain"

import { useToast } from "@feature/toast/containers"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import Form from "../molecules/Form"

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
const FormEdit = ({
  type = "buy",
  edit = false,
  open = false,
  handleModal,
  dataEdit,
  cancelOrder,
  refetchData
}: IProp) => {
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { setClose, setOpen } = useLoadingStore()
  const { mutateEditOrder } = useP2PDexEditOrder()
  const { editOrderSellNaka, p2pPolygonContract } = useContractMultichain()
  const { successToast } = useToast()

  const { shortenString, copyClipboard } = Helper

  const priceBusd = useMemo(() => dataEdit?.busd_price, [dataEdit])
  const priceNaka = useMemo(() => dataEdit?.naka_price, [dataEdit])
  const amount = useMemo(() => dataEdit?.naka_amount, [dataEdit])

  const formData = useForm({
    defaultValues: {
      price: type === "buy" ? priceNaka : priceBusd,
      amount
    }
  })

  const {
    setValue
    // formState: { errors }
  } = formData

  useEffect(() => {
    let price = 0
    if (type === "sell") {
      price = Number(priceNaka)
    } else {
      price = Number(priceBusd)
    }
    setValue("price", price)
    setValue("amount", amount)

    return () => {
      setValue("amount", 0)
      setValue("price", 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit])

  const onSubmit = (_data) => {
    if (dataEdit) {
      editOrderSellNaka(_data.price, _data.amount, dataEdit?.order_id).then(
        async (_receipt) => {
          setOpen(MESSAGES.transaction_processing_order)
          const receipt = (_receipt as IResponseGetFee).data
          if (
            _receipt &&
            (_receipt as IResponseGetFee).status &&
            receipt.logs
          ) {
            const tx_hash = receipt.transactionHash
            const _events = receipt.logs.find(
              (log) =>
                log.address.toLowerCase() ===
                p2pPolygonContract.address.toLowerCase()
            )

            const events = p2pPolygonContract.interface.parseLog(_events)

            if (events) {
              const order_id =
                type === "buy"
                  ? events.args.orderBuyId
                  : events.args.orderSellId
              const busd_price =
                type === "buy" ? events.args.busdPrice.toString() : "0" // Only binace
              const naka_price =
                type === "buy" ? "0" : events.args.nakaPrice.toString()
              const naka_amount = events.args.amount.toString()
              const total_price =
                type === "buy" ? events.args.totalPriceInOrder.toString() : "0" // Only polygon
              const { wallet_address } = dataEdit
              mutateEditOrder({
                _orderId: order_id,
                _type: type,
                _busdPrice: busd_price,
                _nakaPrice: naka_price,
                _nakaAmount: naka_amount,
                _totalPrice: total_price,
                _address: wallet_address,
                _txHash: tx_hash
              })
                .then((_res) => {
                  if (refetchData) refetchData()
                  setClose()
                  handleModal()
                })
                .catch((_err) => {
                  setClose()
                })
            }
          }
          setClose()
        }
      )
    }
  }

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
          <div className="xs:block xs:mb-5 custom-scroll m-3 h-[545px] items-center justify-between gap-3 overflow-y-auto lg:mb-0 lg:flex">
            <div className="flex   items-center justify-between ">
              <div className=" h-[528px] w-[454px] flex-col items-center  justify-center rounded-lg border-2 border-neutral-780 bg-primary-main p-10">
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
                    handleClick={() => {
                      if (cancelOrder) {
                        cancelOrder()
                        setOpen(MESSAGES.transaction_processing_order)
                      }
                    }}
                    className={`leading-2 mt-5 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${" bg-secondary-main"} !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
                    type="button"
                  />
                )}
              </div>
            </div>
            <Form
              type={type}
              edit
              onSubmit={onSubmit}
              {...formData}
            />
          </div>
        </>
      </ModalCustom>
    </>
  )
}
export default FormEdit
