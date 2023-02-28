/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"

import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
// import VerifiedIcon from "@components/icons/VerifiedIcon"
import {
  IMultiData,
  IMultiOrderListDataServ
} from "@feature/multichain/interfaces/IMultichain"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import useP2PDexCancelSellNaka from "@feature/p2pDex/containers/hooks/useP2PDexCancelSellNaka"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import useLoadingStore from "@stores/loading"
import FormEdit from "./FormEdit"

interface IProp {
  data: IMultiOrderListDataServ | undefined
  isLoading: boolean
  isFetching: boolean
  refetch: () => void
  type: "buy" | "sell"
  sort?: number
  setSort: (_data) => void
  sortName: string
  setSortName: (_data) => void
}
const MyOrderList = ({ ...props }: IProp) => {
  const { mutateCancelP2PDexOrder } = useP2PDexCancelSellNaka()
  const { errorToast } = useToast()
  const { cancelOrderSellNaka } = useContractMultichain()
  const { setClose, setOpen } = useLoadingStore()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<IMultiData>()

  const {
    data,
    isLoading,
    isFetching,
    type,
    refetch,
    sort,
    setSort,
    setSortName
  } = props
  const title = [
    { title: "order id", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "seller address", arrowIcon: true, keyUp: true, keyDown: false },
    {
      title: `price per ${type === "sell" ? "naka" : "busd"}`,
      arrowIcon: true,
      keyUp: type === "buy" ? sort === 1 : sort === 1,
      keyDown: type === "buy" ? sort === 1 : sort === -1,
      onClick: () => {
        if (type === "sell") {
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
      title: <div className="flex w-full items-center justify-end">{type}</div>,
      arrowIcon: false
    }
  ]

  const cancelOrder = () => {
    if (dataEdit) {
      if (type === "sell") {
        setOpen(MESSAGES.transaction_processing_order)
        cancelOrderSellNaka(dataEdit.order_id).then((_resp) => {
          if ((_resp as IResponseGetFee).status) {
            mutateCancelP2PDexOrder(dataEdit.order_id).then((_data) => {
              refetch()
            })
          }
        })
        setClose()
      }
    } else {
      errorToast(MESSAGES.order_not_found)
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
                      {/* {order.trusted_order ? (
                        <VerifiedIcon />
                      ) : (
                        <div className="mr-4" />
                      )} */}
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
                      <div className="flex w-[130px] items-center justify-between">
                        {Helper.formatNumber(
                          type === "buy" ? order.busd_price : order.naka_price,
                          { maximumFractionDigits: 4 }
                        )}
                        <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                          {type === "buy" ? "BUSD" : "NAKA"}
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
                          {type === "sell" ? "BUSD" : "NAKA"}
                        </div>
                      </div>
                    </>,
                    <>
                      <div className="flex w-full justify-end">
                        <ButtonLink
                          href=""
                          text="Edit"
                          size="medium"
                          onClick={() => {
                            setDataEdit(order)
                            setOpenModal(true)
                          }}
                          className={`h-[30px] !min-w-[60px] max-w-[60px]  font-neue-machina-bold text-xs capitalize text-neutral-800  ${
                            order.order_type === "sell"
                              ? " bg-error-main hover:bg-error-main"
                              : " bg-varidian-default hover:bg-varidian-default"
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
      <FormEdit
        type={type}
        chain={type === "buy" ? "binance" : "polygon"}
        open={openModal}
        handleModal={() => setOpenModal(!openModal)}
        dataEdit={dataEdit}
        edit
        cancelOrder={cancelOrder}
      />
    </>
  )
}
export default MyOrderList
