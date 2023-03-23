import React, { useState } from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"

import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import VerifiedIcon from "@components/icons/VerifiedIcon"
import {
  IMultiTrustOrder,
  IMultiOrderListServ
} from "@feature/multichain/interfaces/IMultichain"
import { useWeb3Provider } from "@providers/Web3Provider"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import useP2PDexCancel from "@feature/p2pDex/containers/hooks/useP2PDexCancel"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import useLoadingStore from "@stores/loading"
import FormEdit from "./FormEdit"
import FormEx from "./FormEx"

interface IProp {
  data: IMultiOrderListServ | undefined
  isLoading: boolean
  isFetching: boolean
  type: "buy" | "sell"
  sort: number
  setSort: (_data) => void
  sortName: string
  setSortName: (_data) => void
}

const OrderList = ({ ...props }: IProp) => {
  const { mutateCancelP2PDexOrder } = useP2PDexCancel()
  const {
    cancelOrderSellNaka,
    sendAllowNaka,
    allowNaka,
    allowBinance,
    sendAllowBinance,
    cancelOrderBuyNaka
  } = useContractMultichain()
  const { address } = useWeb3Provider()
  const { setClose, setOpen } = useLoadingStore()
  const { errorToast } = useToast()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<IMultiTrustOrder>()

  const { data, isLoading, isFetching, type, sort, setSort, setSortName } =
    props
  const title = [
    { title: "order id" },
    { title: "seller address" },
    {
      title: `price per ${type === "buy" ? "naka" : "busd"}`,
      arrowIcon: true,
      keyUp: type === "buy" ? sort === 1 : sort === 1,
      keyDown: type === "buy" ? sort === 1 : sort === -1,
      onClick: () => {
        if (type === "buy") {
          setSortName("naka_price")
          setSort(sort === 1 ? -1 : 1)
        } else {
          setSortName("busd_price")
          setSort(sort === 1 ? -1 : 1)
        }
      }
    },
    {
      title: "available",
      arrowIcon: true,
      keyUp: sort === 1,
      keyDown: sort === -1,
      onClick: () => {
        setSortName("naka_amount")
        setSort(sort === 1 ? -1 : 1)
      }
    },
    {
      title: <div className="flex w-full items-center justify-end">{type}</div>
    }
  ]

  const sendData = () => {
    setOpen(`${MESSAGES.transaction_processing_order}`)
    if (dataEdit) {
      cancelOrderSellNaka(dataEdit.order_id)
        .then((_resp) => {
          if ((_resp as IResponseGetFee).status) {
            mutateCancelP2PDexOrder(dataEdit.order_id).then((_data) => {
              props["refetch"]()
              setClose()
              setOpenModal(false)
            })
          }
          setClose()
        })
        .catch(() => {
          setClose()
        })
    } else {
      setClose()
      errorToast(MESSAGES.order_not_found)
    }
  }

  const sendDataCancelBinance = () => {
    setOpen(`${MESSAGES.transaction_processing_order}`)
    if (dataEdit) {
      cancelOrderBuyNaka(dataEdit.order_id)
        .then((_resp) => {
          if ((_resp as IResponseGetFee).status) {
            mutateCancelP2PDexOrder(dataEdit.order_id).then((_data) => {
              props["refetch"]()
              setClose()
              setOpenModal(false)
            })
          }
          setClose()
        })
        .catch(() => {
          setClose()
        })
    } else {
      setClose()
      errorToast(MESSAGES.order_not_found)
    }
  }

  const cancelOrder = async () => {
    if (type === "buy") {
      const allow = await allowNaka
      if (allow && allow.toString() > 0) {
        await sendData()
      } else {
        await setOpen(MESSAGES.approve_processing)
        await sendAllowNaka()
          .then((_res) => {
            if (_res) {
              setClose()
              sendData()
            } else {
              setClose()
              errorToast(MESSAGES.approve_error)
            }
          })
          .catch(() => {
            setClose()
          })
      }
    } else if (type === "sell") {
      const allowBi = await allowBinance
      if (allowBi && allowBi.toString() > 0) {
        sendDataCancelBinance()
      } else {
        setOpen(MESSAGES.approve_processing)
        sendAllowBinance()
          .then((_res) => {
            if (_res) {
              setClose()
              sendDataCancelBinance()
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
      <TableContainer className="custom-scroll w-auto rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5">
        <Table aria-label="sticky table ">
          <TableHeader
            thead={title}
            gridTemplateColumns="175px 200px 190px 190px 1fr"
          />
          <TableBody
            className={`custom-scroll block ${
              data && data?.info.currentCount > 12 ? "h-[815px]" : "h-auto"
            } overflow-y-auto rounded-[9px]`}
            sx={{
              "tr:last-of-type td": { borderBottom: 0 }
            }}
          >
            {!isLoading && !isFetching ? (
              data &&
              data.data &&
              data.data.map((order, index) => (
                <TableRowData
                  key={Number(index)}
                  className="!mb-[5px] !rounded-less"
                  borderBottom={false}
                  child={[
                    <>
                      <div className="mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                        {Helper.shortenString(order.id)}
                      </div>
                      <Box
                        className="cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                        onClick={() => {
                          Helper.copyClipboard(order.id)
                        }}
                      >
                        <CopyTextIcon />
                      </Box>
                    </>,
                    <>
                      {order.trusted_order ? (
                        <VerifiedIcon />
                      ) : (
                        <div className="mr-[23px]" />
                      )}
                      <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                        {Helper.shortenString(order.wallet_address)}
                      </div>
                      <Box
                        className=" cursor-pointer rounded border border-neutral-800 bg-neutral-780 px-1 py-1"
                        onClick={() => {
                          Helper.copyClipboard(order.wallet_address)
                        }}
                      >
                        <CopyTextIcon />
                      </Box>
                    </>,
                    <>
                      <div className="flex w-[130px] items-center justify-between ">
                        {Helper.formatNumber(
                          type === "sell" ? order.busd_price : order.naka_price,
                          { maximumFractionDigits: 4 }
                        )}
                        <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                          {type === "sell" ? "BUSD" : "NAKA"}
                        </div>
                      </div>
                    </>,
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="mr-2">AVAILABLE</div>
                        {Helper.formatNumber(order.naka_amount, {
                          maximumFractionDigits: 4
                        })}
                        <div className="ml-2  rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                          {type === "buy" ? "BUSD" : "NAKA"}
                        </div>
                      </div>
                    </>,
                    <>
                      <div className="flex w-full justify-end">
                        <ButtonLink
                          href=""
                          onClick={() => {
                            setOpenModal(true)
                            setDataEdit(order)
                          }}
                          text={
                            order.wallet_address.toLowerCase() ===
                            (address && address.toLowerCase())
                              ? "edit"
                              : type
                          }
                          size="medium"
                          className={`h-[30px] !min-w-[60px] max-w-[60px]  font-neue-machina-bold   text-xs capitalize text-neutral-800   ${
                            order.wallet_address.toLowerCase() !==
                              (address && address.toLowerCase()) &&
                            type === "sell" &&
                            " bg-error-main hover:bg-error-main"
                          } ${
                            order.wallet_address.toLowerCase() !==
                              (address && address.toLowerCase()) &&
                            type === "buy" &&
                            " bg-varidian-default hover:bg-varidian-default"
                          } ${
                            order.wallet_address.toLowerCase() ===
                              (address && address.toLowerCase()) &&
                            " bg-secondary-main hover:bg-secondary-main"
                          }`}
                        />
                      </div>
                    </>
                  ]}
                  gridTemplateColumns="175px 200px 190px 190px 1fr"
                />
              ))
            ) : (
              <p className="text-center">loading</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {dataEdit?.wallet_address.toLowerCase() ===
      (address && address.toLowerCase()) ? (
        <FormEdit
          type={type}
          open={openModal}
          handleModal={() => setOpenModal(!openModal)}
          dataEdit={dataEdit}
          chain={type === "sell" ? "binance" : "polygon"}
          edit={
            dataEdit?.wallet_address.toLowerCase() ===
            (address && address.toLowerCase())
          }
          cancelOrder={() => {
            cancelOrder()
          }}
          refetchData={props["refetch"]}
        />
      ) : (
        <FormEx
          type={type}
          chain={type === "buy" ? "binance" : "polygon"}
          open={openModal}
          handleModal={() => setOpenModal(!openModal)}
          dataEdit={dataEdit}
          edit={
            dataEdit?.wallet_address.toLowerCase() ===
            (address && address.toLowerCase())
          }
          refetchData={props["refetch"]}
        />
      )}
    </>
  )
}
export default OrderList
