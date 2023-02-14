import React, { useEffect, useRef, useState } from "react"
import { TableBody, Table, TableContainer, Box } from "@mui/material"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import useP2PDexController from "@feature/p2pDex/containers/hooks/useP2PDexController"
import ButtonLink from "@components/atoms/button/ButtonLink"
import Helper from "@utils/helper"
import CopyTextIcon from "@components/icons/CopyTextIcon"
import VerifiedIcon from "@components/icons/VerifiedIcon"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import DropdownLimit from "@feature/transaction/components/atoms/DropdownLimit"
import { getP2PDexOrderList } from "@feature/multichain/containers/services/multichain.service"
import { useQueryClient } from "@tanstack/react-query"

const OrderList = () => {
  const title = [
    { title: "order id", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "seller address", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "price per naka", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "available", arrowIcon: true, keyUp: true, keyDown: false },
    { title: "buy", arrowIcon: false }
  ]
  const [type] = useState<"sell" | "buy">("buy")
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(12)
  const queryClient = useQueryClient()
  const fetchRef = useRef(false)
  const { P2PDexOrderList, isPreviousData, isLoading } = useP2PDexController({
    _type: type,
    _limit: limit,
    _page: page
  })
  // eslint-disable-next-line no-console

  useEffect(() => {
    if (!fetchRef.current && P2PDexOrderList) {
      fetchRef.current = true
      setTotalCount(Number(P2PDexOrderList?.info.totalCount) ?? 12)
    }
  }, [P2PDexOrderList])

  useEffect(() => {
    // if (!isPreviousData) {

    queryClient.fetchQuery({
      queryKey: ["fetchP2P", type, page, limit],
      queryFn: () =>
        getP2PDexOrderList({ _type: type, _limit: limit, _page: page })
    })
    // }
  }, [P2PDexOrderList, isPreviousData, limit, page, queryClient, type])

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
            {!isLoading ? (
              P2PDexOrderList &&
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
              ))
            ) : (
              <>loading</>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-5 flex w-full justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          defaultValue={limit}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={setLimit}
        />
      </div>
    </>
  )
}
export default OrderList
