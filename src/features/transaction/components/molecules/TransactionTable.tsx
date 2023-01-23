/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getTransWallet } from "@feature/transaction/containers/services/transaction.service"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import dayjs from "dayjs"
import { v4 as uuid } from "uuid"
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import SkeletonCard from "@components/atoms/skeleton/SkeletonCard"
import TransHead from "../atoms/TransHead"
import TransBody from "../atoms/TransBody"
import TransTextField from "../atoms/TransTextField"

export default function TransactionTable() {
  const [type, setType] = useState<string[]>(["DepositNaka", "WithdrawNaka"])
  const playerId = "61a72d7e970fbe264d627bf5"
  const limit = 5
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()

  const {
    isLoading,
    isPreviousData,
    data: TransData
  } = useGetTransWallet({
    _playerId: playerId,
    _type: type,
    _limit: limit,
    _page: page
  })

  useEffect(() => {
    // totalCount
    if (!fetchRef.current && TransData) {
      fetchRef.current = true
      setTotalCount(TransData.info.totalCount)
    }
  }, [TransData])

  useEffect(() => {
    if (!isPreviousData && TransData) {
      queryClient.prefetchQuery({
        queryKey: ["getTransWallet", playerId, type, page + 1],
        queryFn: () =>
          getTransWallet({
            _playerId: playerId,
            _type: type,
            _limit: limit,
            _page: page + 1
          })
      })
    }
  }, [TransData, isPreviousData, page, queryClient, type])

  const typeSelect = (e) => {
    // selectType.some((st) => st === e) ? selectType.pop() : selectType.push(e)
    // const updatedType = type.filter((item) => (e === item ? item : undefined))
    // setSelectType(updatedType)
    // console.log(selectType)
  }
  console.log(TransData)
  return (
    <div>
      <p className="my-5">Naka Storage Transactions</p>
      <TableContainer
        sx={{ width: "700px", borderRadius: "16px" }}
        component={Paper}
        className="bg-neutral-800 p-2"
      >
        <Table
          sx={{
            padding: 0,
            "& .MuiTableCell-root": {
              borderBottom: "none"
            }
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TransHead label="TIME" />
              <TransHead label="TYPE" />
              {type
                ? type.map((e) => (
                    <CheckBoxNaka
                      key={e}
                      value={false}
                      onHandle={() => typeSelect(e)}
                      text={e}
                      className="items-center"
                    />
                  ))
                : null}
              <TransHead label="AMOUNT (NAKA)" />
              <TransHead
                label="FEE (MATIC)"
                className="justify-end"
              />
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "tr:first-of-type td": { borderTop: 0 },
              "tr:last-of-type td": { borderBottom: 0 },
              "tr:first-of-type td:first-of-type": {
                borderTopLeftRadius: "9px"
              },
              "tr:first-of-type td:last-of-type": {
                borderTopRightRadius: "9px"
              },
              "tr:last-of-type td:first-of-type": {
                borderBottomLeftRadius: "9px"
              },
              "tr:last-of-type td:last-of-type": {
                borderBottomRightRadius: "9px"
              }
            }}
            className="bg-neutral-900"
          >
            {isLoading
              ? [...Array(limit)].map(() => <SkeletonCard key={uuid()} />)
              : null}
            {TransData
              ? TransData.data.map((data) => (
                  <TransBody
                    key={data.id}
                    date={dayjs(data.current_time).format("DD MMM YYYY")}
                    time={dayjs(data.current_time).format("hh:mm A")}
                    type={data.type}
                    amount={data.amount}
                    fee={data.fee}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-5 flex">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <TransTextField />
      </div>
    </div>
  )
}
