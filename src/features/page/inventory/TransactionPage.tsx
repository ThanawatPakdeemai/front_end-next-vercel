import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer
} from "@mui/material"
import dynamic from "next/dynamic"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import useTransactionController from "@feature/transaction/containers/hooks/useTransactionController"
import { ITransactionWalletData } from "@feature/transaction/interfaces/ITransaction"
import useGlobal from "@hooks/useGlobal"
import CONFIGS from "@configs/index"
import { IProfile } from "@src/types/profile"
import { gameItemType, landType, nakaType } from "@constants/historyTransaction"

const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const TooltipsCustom = dynamic(
  () => import("@components/atoms/TooltipsCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
  suspense: true,
  ssr: false
})
const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const PageHeader = dynamic(
  () => import("@feature/table/components/molecules/PageHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const TableHeader = dynamic(
  () => import("@feature/table/components/molecules/TableHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const TableRowData = dynamic(
  () => import("@feature/table/components/molecules/TableRowData"),
  {
    suspense: true,
    ssr: false
  }
)
const TableNodata = dynamic(
  () => import("@feature/transaction/components/atoms/TableNodata"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownEvent = dynamic(
  () => import("@feature/transaction/components/molecules/DropdownEvent"),
  {
    suspense: true,
    ssr: false
  }
)

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

  const insertSpaces = (str: string) => {
    const regex = /([a-z])([A-Z])/g
    const result = str.replace(regex, "$1 $2")
    const words = result.split(" ")
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )

    return capitalizedWords.join(" ")
  }

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
        <div className="mx-auto mt-12 w-fit overflow-x-auto">
          <div className="m-4 grid justify-between sm:m-0 sm:flex">
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
                    <Icomoon className="icon-Refresh-01 animate-spin" />
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
                          <TooltipsCustom
                            color="secondary"
                            title={insertSpaces(item.type)}
                            placement="left"
                          >
                            <Chip
                              label={insertSpaces(item.type)}
                              size="small"
                              className={`max-w-[120px] font-neue-machina-bold uppercase !text-neutral-900 ${
                                item.type && item.type === "DepositNaka"
                                  ? "!bg-varidian-default"
                                  : "!bg-red-card"
                              }`}
                            />
                          </TooltipsCustom>
                        </div>,
                        <div key={item.id}>
                          {item.amount ? item.amount.toFixed(2) : "-"}
                        </div>,
                        <div key={item.id}>
                          {item.fee ? item.fee.toFixed(2) : "-"}
                        </div>,
                        <Link
                          key={item.id}
                          href={`${baseUrl}/tx/${item.transaction_hash}`}
                        >
                          <Chip
                            component="button"
                            variant="outlined"
                            label="View transaction"
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
            component="div"
            className="my-2 flex justify-between md:my-5"
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
