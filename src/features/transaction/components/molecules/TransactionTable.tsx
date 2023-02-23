import React, { useEffect, useRef, useState } from "react"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import useTransactionController from "@feature/transaction/containers/hooks/useTransactionController"
import dayjs from "dayjs"
import { Chip, TableBody, Table, TableContainer } from "@mui/material"
import IconArrowTop from "@components/icons/arrowTopIcon"
import { v4 as uuid } from "uuid"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"
import DropdownLimit from "@components/atoms/DropdownLimit"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import { IProfile } from "@src/types/profile"
import TableNodata from "../atoms/TableNodata"

interface IProp {
  profile?: IProfile
}

export default function TransactionTable({ profile }: IProp) {
  const { hydrated, pager } = useGlobal()
  const { t } = useTranslation()
  const { getTransHistory } = useGetTransWallet()
  const { sortTime, sortAmount, typeCheck, TransactionTableHeader } =
    useTransactionController()
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      if (profile) {
        await getTransHistory({
          _playerId: profile && profile.id ? profile.id : "",
          _type: typeCheck,
          _limit: limit,
          _page: page,
          _sort:
            sortTime || sortAmount
              ? { "current_time": sortTime, "amount": sortAmount }
              : undefined // sort: {}
        }).then((res) => {
          // res.status === 200 -> ok
          if (res.data) {
            setTxHistory(res.data)
          }
          if (res.info) {
            setTotalCount(res.info.totalCount)
          }
        })
      }
      // .catch((err) => console.log(err))
    }
    if (fetchRef.current) {
      fetchHistory()
    }
    fetchRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortTime, typeCheck, sortAmount])

  return (
    <>
      {hydrated && (
        <div>
          <p className="my-5 font-neue-machina-bold text-default uppercase">
            {t("NAKA_storage_transactions")}
          </p>
          <TableContainer className="w-[580px] rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
            <Table aria-label="simple table">
              <TableHeader thead={TransactionTableHeader} />
              <TableBody
                sx={{
                  display: "block",
                  borderRadius: "9px",
                  overflow: "hidden",
                  "tr:last-of-type td": { borderBottom: 0 }
                }}
              >
                {txHistory && txHistory.length !== 0 ? (
                  txHistory.map((item) => (
                    <TableRowData
                      key={uuid()}
                      child={[
                        <div key={item.id}>
                          <span className="rounded-less border border-neutral-700 p-[5px] font-neue-machina-bold text-xs uppercase text-neutral-400">
                            {dayjs(item.current_time).format("DD MMM YYYY")}
                          </span>
                          <span className="px-3 font-neue-machina-bold text-xs text-neutral-600">
                            {dayjs(item.current_time).format("hh:mm A")}
                          </span>
                        </div>,
                        <div key={item.id}>
                          <Chip
                            label={item.type}
                            size="small"
                            className={`font-neue-machina-bold uppercase !text-neutral-900 ${
                              item.type && item.type === "DepositNaka"
                                ? "!bg-varidian-default"
                                : "!bg-red-card"
                            }`}
                          />
                        </div>,
                        <div key={item.id}>
                          <div
                            className={`flex items-center font-neue-machina-bold text-sm ${
                              item.type && item.type === "DepositNaka"
                                ? "text-varidian-default"
                                : "text-red-card"
                            }`}
                          >
                            <div className="flex flex-row">
                              <div className="pr-[8.35px]">
                                {item.type && item.type === "DepositNaka" ? (
                                  <IconArrowTop className="rotate-180" />
                                ) : (
                                  <IconArrowTop />
                                )}
                              </div>
                              {item.amount.toFixed(2)}
                            </div>
                          </div>
                        </div>,
                        <div
                          key={item.id}
                          className="flex w-full justify-end"
                        >
                          <span className="font-neue-machina-bold text-sm text-neutral-600">
                            - {item.fee.toFixed(4)}
                          </span>
                        </div>
                      ]}
                    />
                  ))
                ) : (
                  <TableNodata />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {txHistory && txHistory.length !== 0 && (
            <div className="my-5 flex w-[580px] justify-between">
              <PaginationNaka
                totalCount={totalCount}
                limit={limit}
                page={page}
                setPage={setPage}
              />
              <DropdownLimit
                defaultValue={12}
                list={pager}
                onChangeSelect={setLimit}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
