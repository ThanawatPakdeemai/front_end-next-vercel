import React, { useState } from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import useP2PDexController from "@feature/p2pDex/containers/hooks/useP2PDexController"
import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import VerifiedIcon from "@components/icons/VerifiedIcon"

const OrderList = () => {
  const title = [
    { title: "order id", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "seller address", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "price per naka", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "available", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "buy", arrowIcon: false }
  ]
  const [type] = useState<"sell" | "buy">("buy")
  const [limit] = useState<number>(10)
  const [page] = useState<number>(1)
  const { P2PDexOrderList } = useP2PDexController({
    _type: type,
    _limit: limit,
    _page: page
  })
  // eslint-disable-next-line no-console
  console.log(P2PDexOrderList)

  return (
    <>
      <TableContainer className="custom-scroll w-auto rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
        <Table aria-label="simple table">
          <TableHeader
            thead={title}
            gridTemplateColumns="176px 200px 190px 190px 1fr"
          />
          <TableBody
            sx={{
              display: "block",
              borderRadius: "9px",
              overflow: "hidden",
              "tr:last-of-type td": { borderBottom: 0 }
            }}
          >
            {P2PDexOrderList &&
              P2PDexOrderList.data &&
              P2PDexOrderList.data.map((order, index) => (
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
                      <VerifiedIcon />
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
                      {order.naka_price}
                      <div className="ml-2 mr-2 rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                        BUSD
                      </div>
                    </>,
                    <>
                      <div className="mr-2">AVAILABLE</div>
                      {order.total_price}
                      <div className="ml-2  rounded border border-neutral-700 px-2.5 py-1 uppercase text-neutral-400">
                        NAKA
                      </div>
                    </>,
                    <>
                      <ButtonLink
                        href="href"
                        text="Buy"
                        size="medium"
                        className=" h-[30px] !min-w-[60px] max-w-[60px] bg-varidian-default font-neue-machina-bold text-xs text-neutral-800 hover:bg-varidian-default"
                      />
                    </>
                  ]}
                  gridTemplateColumns="190px 200px 190px 190px 1fr"
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default OrderList
