/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"

import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
// import VerifiedIcon from "@components/icons/VerifiedIcon"
import { IMultiOrderListDataServ } from "@feature/multichain/interfaces/IMultichain"
import useContractMultichain from "@feature/contract/containers/hooks/useContractMultichain"
import useP2PDexCancelSellNaka from "@feature/p2pDex/containers/hooks/useP2PDexCancelSellNaka"
import { IResponseGetFee } from "@feature/contract/interfaces/IMultichainHook"

interface IProp {
  data: IMultiOrderListDataServ | undefined
  isLoading: boolean
  isFetching: boolean
  refetch: () => void
  type: "buy" | "sell"
}
const MyOrderList = ({ ...props }: IProp) => {
  const { cancelOrderSellNaka } = useContractMultichain()
  const { mutateCancelP2PDexOrder } = useP2PDexCancelSellNaka()
  const { data, isLoading, isFetching, type, refetch } = props
  const title = [
    { title: "order id", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "seller address", arrowIcon: true, keyUp: true, keyDown: false },
    {
      title: `price per ${type === "sell" ? "naka" : "busd"}`,
      arrowIcon: true,
      keyUp: true,
      keyDown: false
    },
    { title: "available", arrowIcon: true, keyUp: true, keyDown: false },
    {
      title: <div className="flex w-full items-center justify-end">{type}</div>,
      arrowIcon: false
    }
  ]

  // const onClickAll = () => {
  //   if (data && data.data) {
  //     data.data.forEach((_res: IMultiData) => {
  //       cancelOrderSellNaka(_res.order_id).then((_resp) => {
  //         if (_resp) {
  //           mutateCancelP2PDexOrder(_res.order_id).then((_data) => {
  //             // refetch()
  //           })
  //         }
  //       })
  //     })
  //   }
  // }
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
                      <div className="flex w-full items-center">
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
                        {Helper.formatNumber(order.naka_amount)}
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
                          className={`h-[30px] !min-w-[60px] max-w-[60px]  font-neue-machina-bold text-xs capitalize text-neutral-800  ${
                            order.order_type === "sell"
                              ? " bg-error-main hover:bg-error-main"
                              : " bg-varidian-default hover:bg-varidian-default"
                          }`}
                        />
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            cancelOrderSellNaka(order.order_id).then(
                              (_resp) => {
                                if ((_resp as IResponseGetFee).status) {
                                  mutateCancelP2PDexOrder(order.order_id).then(
                                    (_data) => {
                                      refetch()
                                    }
                                  )
                                }
                              }
                            )
                            // onClickAll()
                          }}
                        >
                          cancle
                        </div>
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
    </>
  )
}
export default MyOrderList
