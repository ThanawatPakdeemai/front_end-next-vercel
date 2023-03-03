import { Typography } from "@mui/material"
import React from "react"

import HrLine from "@components/icons/HrLine"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"

import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import Balance from "@components/molecules/balance/Balance"
import Form from "../molecules/Form"

interface IProp {
  type?: string
}
const FormCreate = ({ type = "buy" }: IProp) => {
  const { setClose, setOpen } = useLoadingStore()
  const {
    sendAllowNaka,
    allowNaka,
    createOrder,
    allowBinance,
    sendAllowBinance
  } = useContractMultichain()
  const { errorToast } = useToast()
  const formData = useForm({
    defaultValues: { price: "", amount: "" }
  })

  // useEffect(() => {
  //   nakaVaultBalance
  //   busdVaultBalance
  // }, [busdVaultBalance, nakaVaultBalance])

  const sendData = (_data) => {
    createOrder(_data, type)
  }
  const sendDataBinance = (_data) => {
    createOrder(_data, type)
  }

  const onSubmit = async (_data) => {
    if (type === "sell") {
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
    } else if (type === "buy") {
      const allowBi = await allowBinance
      if (allowBi && allowBi.toString() > 0) {
        sendDataBinance(_data)
      } else {
        setOpen(MESSAGES.approve_processing)
        sendAllowBinance()
          .then((_res) => {
            if (_res) {
              setClose()
              sendDataBinance(_data)
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
  }

  return (
    <>
      <div className="mt-10">
        <Form
          type={type}
          onSubmit={onSubmit}
          {...formData}
          chain={type === "buy" ? "binance" : "polygon"}
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
              <Balance />
              {/* <AmountBalance
                icon={type === "sell" ? <INaka /> : <IBusd />}
                balance={type === "sell" ? nakaVaultBalance : busdVaultBalance}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FormCreate
