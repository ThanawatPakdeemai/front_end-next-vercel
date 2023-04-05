import DropdownLimit from "@components/atoms/DropdownLimit"
import { PaginationNaka } from "@components/atoms/pagination"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import useTransactionController from "@feature/transaction/containers/hooks/useTransactionController"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"
import useGlobal from "@hooks/useGlobal"
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer
} from "@mui/material"
import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import DropdownEvent from "@feature/transaction/components/molecules/DropdownEvent"
import CONFIGS from "@configs/index"
import { IProfile } from "@src/types/profile"
import { gameItemType, landType, nakaType } from "@constants/historyTransaction"
import Link from "next/link"
import ReloadIcon from "../../../components/icons/ReloadIcon"

interface IProp {
  profile?: IProfile
}

const TransactionPage = ({ profile }: IProp) => {
  const { getTransHistory, isLoading } = useGetTransWallet()

  const { sortTime, sortAmount, AllTransactionTableHeader } =
    useTransactionController()

  const typeTandsactionDropDown = [
    "Land",
    "Game Item",
    "Building",
    "Material",
    "NAKA Punks"
  ]

  const [Event, setEvent] = useState<string>("Land")
  const [typeList, setTypeList] = useState<string[]>(landType)
  const [limit, setLimit] = useState<number>(12)
  const { hydrated, pager } = useGlobal()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])

  const baseUrl = CONFIGS.CHAIN.POLYGON_SCAN

  const onHandleEvent = (_event: string) => {
    setEvent(_event)

    // if (_event === "Land") {
    //   setTypeList(landType)
    // }
    // if (_event === "Game Item") {
    //   setTypeList(buildingType)
    // } else {
    //   setTypeList(bmnakaType)
    // }

    switch (_event) {
      case "Land":
        setTypeList(landType)
        break
      case "Game Item":
        setTypeList(gameItemType)
        break
      // case "Building":
      //   setTypeList(buildingType)
      //   break
      // case "Material":
      //   setTypeList(materialType)
      //   break
      default:
        setTypeList(nakaType)
        break
    }
  }

  useEffect(() => {
    let load = false

    if (!load) {
      const fetchTransaction = async () => {
        if (profile) {
          await getTransHistory({
            _playerId: profile && profile.id ? profile.id : "",
            _type: typeList,
            _page: page,
            _limit: limit,
            _sort:
              sortTime || sortAmount
                ? { "current_time": sortTime, "amount": sortAmount }
                : undefined
          }).then((res) => {
            if (res.data) {
              setTxHistory(res.data)
            }
            if (res.info) {
              setTotalCount(res.info.totalCount)
            }
          })
        }
      }

      fetchTransaction()
    }

    return () => {
      load = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortAmount, sortTime, typeList])

  return (
    <>
      {hydrated && (
        <div className="md-w-[678px] mx-auto">
          <div className="flex justify-between">
            <PageHeader
              title="HISTORY TRANSACTION"
              subtitle="Wallet manager for nakamoto.games world"
            />
            <DropdownEvent
              defaultValue={Event}
              list={typeTandsactionDropDown}
              onChangeEvent={onHandleEvent}
            />
          </div>
          <TableContainer
            className="w-full overflow-x-auto rounded-2xl bg-transparent px-1.5 pb-1.5 pt-4 "
            component={Paper}
          >
            <Table
              aria-label="simple table"
              className="whitespace-nowrap rounded-2xl border-black-500 bg-neutral-780 p-5 py-1.5 text-neutral-600"
            >
              <TableHeader
                thead={AllTransactionTableHeader}
                gridTemplateColumns="180px 130px 130px 100px 1fr"
              />
              <TableBody
                sx={{
                  display: "block",
                  borderRadius: "5px",
                  overflow: "hidden",
                  "tr:last-of-type td": { borderBottom: 0 }
                }}
                className="relative uppercase"
              >
                {isLoading && (
                  <div className="absolute z-[2] grid h-full w-full content-center justify-items-center bg-neutral-900 opacity-50">
                    <ReloadIcon className="animate-spin" />
                  </div>
                )}
                {txHistory && txHistory.length > 0 ? (
                  txHistory.map((item) => (
                    <TableRowData
                      key={uuid()}
                      gridTemplateColumns="180px 130px 130px 100px 1fr"
                      className="m-2 !rounded-[11px]"
                      borderBottom={false}
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
                            className={`max-w-[120px] font-neue-machina-bold uppercase !text-neutral-900 ${
                              item.type && item.type === "DepositNaka"
                                ? "!bg-varidian-default"
                                : "!bg-red-card"
                            }`}
                          />
                        </div>,
                        <div key={item.id}>
                          {item.amount === 0 ? "-" : item.amount.toFixed(4)}
                        </div>,
                        <div key={item.id}>
                          {item.fee === 0 ? "-" : item.fee.toFixed(4)}
                        </div>,
                        <Link
                          key={item.id}
                          href={`${baseUrl}/tx/${item.transaction_hash}`}
                        >
                          <Chip
                            component="button"
                            variant="outlined"
                            label="view transaction"
                            size="small"
                          />
                        </Link>
                      ]}
                    />
                  ))
                ) : (
                  <TableNodata />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            className="my-2 flex justify-between md:my-5 md:w-[678px]"
            sx={{
              ".MuiPagination-ul": {
                gap: "5px 0"
              }
            }}
          >
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            <DropdownLimit
              className="m-0 w-[160px] flex-row"
              defaultValue={12}
              list={pager}
              onChangeSelect={setLimit}
            />
          </Box>
        </div>
      )}
    </>
  )
}

export default TransactionPage
