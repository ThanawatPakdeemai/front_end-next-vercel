/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo } from "react"

import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"

import useLoadingStore from "@stores/loading"
import { MESSAGES } from "@constants/messages"
import { ModalCustom } from "@components/molecules/Modal/ModalCustom"
import ModalHeader from "@components/molecules/Modal/ModalHeader"
import {
  IMultiData,
  IMultiTrustOrder
} from "@feature/multichain/interfaces/IMultichain"

import { useToast } from "@feature/toast/containers"
import { Trans } from "next-i18next"
import useProfileStore from "@stores/profileStore"
import Form from "../molecules/Form"
import LeftContentForm from "../molecules/LeftContentForm"

interface IProp {
  type?: string
  edit?: boolean
  open: boolean
  handleModal: () => void
  dataEdit: IMultiData | IMultiTrustOrder | undefined
  cancelOrder?: () => void
  refetchData?: () => void
  chain?: string
}
const FormEdit = ({
  type = "buy",
  edit = false,
  open = false,
  handleModal,
  dataEdit,
  cancelOrder,
  refetchData,
  chain
}: IProp) => {
  const { setClose, setOpen } = useLoadingStore()
  const {
    allowNaka,
    sendAllowNaka,
    submitDataEditNaka,
    allowBinance,
    sendAllowBinance
  } = useContractMultichain()
  const { errorToast } = useToast()
  const profile = useProfileStore((state) => state.profile.data)
  const priceBusd = useMemo(() => dataEdit?.busd_price, [dataEdit])
  const priceNaka = useMemo(() => dataEdit?.naka_price, [dataEdit])
  const amount = useMemo(() => dataEdit?.naka_amount, [dataEdit])

  const formData = useForm({
    defaultValues: {
      price: type === "sell" ? priceNaka : priceBusd,
      amount
    }
  })

  const {
    setValue
    // formState: { errors }
  } = formData

  const price = useMemo(() => {
    if (edit) {
      return dataEdit?.order_type === "buy"
        ? dataEdit?.busd_price
        : dataEdit?.naka_price
    }
    return dataEdit?.order_type === "sell"
      ? dataEdit?.busd_price
      : dataEdit?.naka_price
  }, [dataEdit?.busd_price, dataEdit?.naka_price, dataEdit?.order_type, edit])

  // !default value
  useEffect(() => {
    let load = false

    if (!load) {
      setValue("price", price)
      setValue("amount", amount)
    }

    return () => {
      setValue("amount", 0)
      setValue("price", 0)
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  const sendData = (_data) => {
    if (dataEdit) {
      submitDataEditNaka(_data, dataEdit, chain)
        .then((_response) => {
          if (_response) {
            if (refetchData) refetchData()
            setClose()
            handleModal()
          }
          setClose()
        })
        .catch((_err) => {
          setClose()
        })
    }
  }

  const onSubmit = async (_data) => {
    if (profile) {
      if (chain === "polygon") {
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
      } else if (chain === "binance") {
        const allowBi = await allowBinance
        if (allowBi && allowBi.toString() > 0) {
          sendData(_data)
        } else {
          setOpen(MESSAGES.approve_processing)
          sendAllowBinance()
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
    }
  }

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
                  <Trans i18nKey={type} />
                  {" : "}
                </span>
                NAKA
              </p>
            }
          />
          <div className="xs:block xs:mb-5 custom-scroll m-3 h-[545px] items-center justify-between gap-3 overflow-y-auto lg:mb-0 lg:flex">
            <LeftContentForm
              dataInfo={dataEdit}
              type={type}
              chain={chain}
              edit
              cancelOrder={() => {
                if (cancelOrder) {
                  setOpen(MESSAGES.transaction_processing_order)
                  cancelOrder()
                }
              }}
            />

            <Form
              type={type}
              edit
              onSubmit={onSubmit}
              chain={chain}
              {...formData}
            />
          </div>
        </>
      </ModalCustom>
    </>
  )
}
export default FormEdit
