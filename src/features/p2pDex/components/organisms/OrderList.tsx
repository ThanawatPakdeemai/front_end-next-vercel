import React from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"

import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import VerifiedIcon from "@components/icons/VerifiedIcon"
import { IMultiOrderListServ } from "@feature/multichain/interfaces/IMultichain"

interface IProp {
  data: IMultiOrderListServ | undefined
  isLoading: boolean
  isFetching: boolean
  type: "buy" | "sell"
}
const OrderList = ({ ...props }: IProp) => {
  const { data, isLoading, isFetching, type } = props
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
    { title: type, arrowIcon: false }
  ]

  return (
    <>
      <TableContainer className="custom-scroll w-auto rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
        <Table aria-label="sticky table ">
          <TableHeader
            thead={title}
            gridTemplateColumns="176px 200px 190px 190px 1fr"
          />
          <TableBody
            className={`custom-scroll block ${
              data && data?.info.currentCount > 12 ? "h-[800px]" : "h-auto"
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
                      {order.trusted_order ? (
                        <VerifiedIcon />
                      ) : (
                        <div className="mr-4" />
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
                      <ButtonLink
                        href="href"
                        text={type}
                        size="medium"
                        className={` h-[30px] !min-w-[60px] max-w-[60px] font-neue-machina-bold   text-xs capitalize text-neutral-800  ${
                          type === "sell"
                            ? " bg-error-main hover:bg-error-main"
                            : " bg-varidian-default hover:bg-varidian-default"
                        }`}
                      />
                    </>
                  ]}
                  gridTemplateColumns="190px 200px 190px 190px 1fr"
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
export default OrderList
