import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import { Typography } from "@mui/material"
import React from "react"
import AmountBalance from "@components/molecules/balance/AmountBalance"

import HrLine from "@components/icons/HrLine"
import useAllBalances from "@hooks/useAllBalances"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import useP2PDexCreateOrder from "@feature/p2pDex/containers/hooks/useP2PDexCreateOrder"
import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Form from "../molecules/Form"

interface IProp {
  type?: string
}
const FormCreate = ({ type = "buy" }: IProp) => {
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { setClose, setOpen } = useLoadingStore()
  const {
    createOrderBuyNaka,
    createOrderSellNaka,
    p2pPolygonContract,
    sendAllowNaka,
    allowNaka
  } = useContractMultichain()
  const { mutateCreateOrder } = useP2PDexCreateOrder()
  const { errorToast } = useToast()
  const formData = useForm({
    defaultValues: { price: "", amount: "" }
  })

  const sendData = (_data) => {
    setOpen("Processing Transaction")
    if (type === "buy") {
      createOrderBuyNaka(_data.price, _data.amount)
    } else {
      createOrderSellNaka(_data.price, _data.amount)
        .then((_receipt) => {
          const receipt = (_receipt as IResponseGetFee).data
          if (
            _receipt &&
            (_receipt as IResponseGetFee).status &&
            receipt.logs
          ) {
            const log = receipt.logs.find(
              (_log) => _log.address === p2pPolygonContract.address
            )
            const events = p2pPolygonContract.interface.parseLog(log)
            if (events) {
              const _orderId = events.args.orderSellId
              const _busdPrice = "0" // Only binance
              const _nakaPrice = events.args.nakaPrice.toString()
              const _nakaAmount = events.args.amount.toString()
              const _totalPrice = "0" // Only polygon
              const _address = events.args.seller
              const _type = events.args.orderSellId ? "sell" : "buy"
              mutateCreateOrder({
                _orderId,
                _type,
                _busdPrice,
                _nakaPrice,
                _nakaAmount,
                _totalPrice,
                _address
              })
                .then((_res) => {
                  setClose()
                })
                .catch((_err) => {
                  setClose()
                })
            }
          } else {
            setClose()
          }
        })
        .catch(() => {
          setClose()
        })
    }
  }

  const onSubmit = async (_data) => {
    const allow = await allowNaka
    if (allow && allow.toString() > 0) {
      sendData(_data)
    } else {
      setOpen(MESSAGES.approve_processing)
      sendAllowNaka()
        .then((_res) => {
          if (_res) {
            setClose()
            sendData(_data)
          } else {
            setClose()
            errorToast(MESSAGES.approve_error)
          }
        })
        .catch(() => {
          setClose()
        })
    }
  }

  return (
    <>
      <div className="mt-10">
        <Form
          type={type}
          onSubmit={onSubmit}
          {...formData}
        />
      </div>
      <div className="flex   justify-center">
        <div className="mt-10 flex w-[454px] items-center  justify-center rounded-lg bg-neutral-780 p-10">
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
        </div>
      </div>
    </>
  )
}
export default FormCreate
