/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import IBusd from "@components/icons/Busd"
import INaka from "@components/icons/Naka"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Alert, Typography } from "@mui/material"
import React, { useEffect, useMemo } from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

import useAllBalances from "@hooks/useAllBalances"
import { useForm } from "react-hook-form"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
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
import CONFIGS from "@configs/index"
import Input from "../atoms/Input"
import HeaderFormEx from "../atoms/HeaderFormEx"

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
  const { address, signer } = useWeb3Provider()
  const { busdVaultBalance, nakaVaultBalance } = useAllBalances()
  const { setClose, setOpen } = useLoadingStore()
  const {
    fee,
    allowNaka,
    sendAllowNaka,
    // eslint-disable-next-line no-unused-vars
    sendRequestBuyNaka,
    allowBinance,
    sendAllowBinance,
    saveRequestSellNaka
  } = useContractMultichain()

  const { errorToast } = useToast()

  const { formatNumber } = Helper

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

  const chainRequired = signer ? signer?.provider?._network?.chainId : 0

  // !defaultvalue
  useEffect(() => {
    const price =
      type === "buy"
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
      type === "buy"
        ? Number(priceNakaDefault) * Number(watch("amount"))
        : Number(priceBusdDefault) * Number(watch("amount"))
    setValue("price", Number(formatNumber(price, { maximumFractionDigits: 4 })))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("amount")])

  const sendDataSellNaka = async (_data) => {
    saveRequestSellNaka(_data, dataEdit, type)
      .then(async (_res) => {
        if (refetchData) await refetchData()
        await handleModal()
        await setClose()
      })
      .catch((_err) => {
        setClose()
      })
  }

  const sendDataBuyNaka = async (_data) => {
    // eslint-disable-next-line no-console
    console.log("sendDataBuyNaka")
  }

  const onSubmit = async (_data) => {
    if (type === "sell") {
      const allowPolygon = await allowNaka
      if (allowPolygon && allowPolygon.toString() > 0) {
        sendDataSellNaka(_data)
      } else {
        setOpen(MESSAGES.approve_processing)
        sendAllowNaka()
          .then((_res) => {
            if (_res) {
              setClose()
              sendDataSellNaka(_data)
            } else {
              setClose()
              errorToast(MESSAGES.approve_error)
            }
          })
          .catch(() => {
            setClose()
          })
      }
    } else {
      const allowBnb = await allowBinance
      if (allowBnb && allowBnb.toString() > 0) {
        sendDataBuyNaka(_data)
      } else {
        setOpen(MESSAGES.approve_processing)
        sendAllowBinance()
          .then((_res) => {
            if (_res) {
              setClose()
              sendDataBuyNaka(_data)
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

  const disableButton = useMemo(() => {
    if (
      profile &&
      address &&
      balance &&
      balance !== "N/A" &&
      Helper.removeComma(balance) >=
        Number(watch("price")) * Number(watch("amount")) &&
      Number(watch("amount")) > 0 &&
      Number(watch("price")) > 0 &&
      Number(watch("amount")) <= amountDefault
    ) {
      if (edit) {
        if (address?.toLowerCase() === profile.address.toLowerCase()) {
          return false
        }
        return true
      }
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    balance,
    profile,
    amountDefault,
    watch("price"),
    watch("amount")
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const buttonSubmit = () => (
    <ButtonToggleIcon
      startIcon=""
      endIcon=""
      disabled={disableButton}
      text={`${edit ? "edit" : ""} ${type} NAKA`}
      handleClick={() => {}}
      className={`leading-2 mt-5 mb-5 flex h-[50px] w-full items-center  justify-center rounded-md ${
        type === "buy" ? " bg-varidian-default " : " bg-error-main"
      } !fill-primary-main font-neue-machina text-sm font-bold capitalize !text-primary-main`}
      type="submit"
    />
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
      if (Number(chainRequired) === Number(CONFIGS.CHAIN.BNB_CHAIN_ID)) {
        return buttonSubmit()
      }
    }
    if (type === "buy") {
      if (Number(chainRequired) === Number(CONFIGS.CHAIN.BNB_CHAIN_ID)) {
        return buttonSubmit()
      }
      return buttonSwitched()
    }
    if (Number(chainRequired) === Number(CONFIGS.CHAIN.CHAIN_ID)) {
      return buttonSubmit()
    }
    return buttonSwitched()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainRequired, disableButton, type])

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
            <HeaderFormEx
              dataInfo={dataEdit}
              type={type}
              edit={edit}
              cancelOrder={cancelOrder}
            />
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
                      endIcon={<IBusd />}
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

                    {buttonData}
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
