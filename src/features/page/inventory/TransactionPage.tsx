import DropdownLimit from "@components/atoms/DropdownLimit"
import { PaginationNaka } from "@components/atoms/pagination"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import useTransactionController from "@feature/transaction/containers/hooks/useTransactionController"
import {
  ITransactionWalletData,
  ITransData
} from "@feature/transaction/interfaces/ITransaction"
import useGlobal from "@hooks/useGlobal"
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer
} from "@mui/material"
// import { validTypeGames } from "@pages/[typeGame]"
import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import DropdownEvent from "@feature/transaction/components/molecules/DropdownEvent"
import { useRouter } from "next/router"
import CONFIGS from "@configs/index"
import { IProfile } from "@src/types/profile"

interface IProp {
  profile?: IProfile
}

const TransactionPage = ({ profile }: IProp) => {
  // const { profile } = useProfileStore()
  const { getTransHistory } = useGetTransWallet()

  const { sortTime, sortAmount, AllTransactionTableHeader } =
    useTransactionController()

  // const landType = [
  //   "MintLand",
  //   "BuyLandInstallment",
  //   "BuyLandFullpayment",
  //   "RentLand",
  //   "CreateLandOrder",
  //   "CancleLandOrder",
  //   "TransferLand",
  //   "ClaimRental"
  // ]

  const landType = "MintLand"

  const typeTandsactionDropDown = [
    "Land",
    "GameType",
    "Building",
    "Material",
    "NAKA Punk"
  ]

  const [Event, setEvent] = useState<string>("Land")
  const [limit, setLimit] = useState<number>(12)
  const { hydrated, pager } = useGlobal()
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])

  const baseUrl = CONFIGS.CHAIN.POLYGON_SCAN
  const router = useRouter()

  const onHandleEvent = (_event: string) => {
    setEvent(_event)
  }

  const onHandleView = (element: ITransData) => {
    router.push(`${baseUrl}/tx/${element.transaction_hash}`)
  }

  useEffect(() => {
    const fetchTransaction = () => {
      if (profile) {
        getTransHistory({
          _playerId: profile && profile.id ? profile.id : "",
          _type: landType,
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

    if (!txHistory) {
      fetchTransaction()
    }
    // fetchTransaction()
  }, [
    getTransHistory,
    landType,
    limit,
    page,
    profile,
    sortAmount,
    sortTime,
    txHistory
  ])

  // if (profile) {
  //   await getTransHistory({
  //     _playerId: profile && profile.data?.id ? profile.data?.id : "",
  //     _type: landType,
  //     _page: page,
  //     _limit: limit,
  //     _sort:
  //       sortTime || sortAmount
  //         ? { "current_time": sortTime, "amount": sortAmount }
  //         : undefined
  //   }).then((res) => {
  //     // res.status === 200 -> ok
  //     if (res.data) {
  //       setTxHistory(res.data)
  //     }
  //     if (res.info) {
  //       setTotalCount(res.info.totalCount)
  //     }
  //   })
  // }

  // useEffect(() => {
  // const fetchTransaction = async () => {
  //   if (profile) {
  //     await getTransHistory({
  //       _playerId: profile && profile.data?.id ? profile.data?.id : "",
  //       _type: landType,
  //       _page: page,
  //       _limit: limit,
  //       _sort:
  //         sortTime || sortAmount
  //           ? { "current_time": sortTime, "amount": sortAmount }
  //           : undefined
  //     }).then((res) => {
  //       // res.status === 200 -> ok
  //       if (res.data) {
  //         setTxHistory(res.data)
  //       }
  //       if (res.info) {
  //         setTotalCount(res.info.totalCount)
  //       }
  //     })
  //     // .catch((error) => {
  //     //   // errorToast(error.message)
  //     // })
  //   }
  // }
  // fetchTransaction()
  // }, [landType, limit, page, profile, sortAmount, sortTime])

  // const fetchData = () => {
  //   getTransHistory({
  //     _playerId: profile && profile.data?.id ? profile.data?.id : "",
  //     _type: landType,
  //     _page: page,
  //     _limit: limit,
  //     _sort:
  //       sortTime || sortAmount
  //         ? { "current_time": sortTime, "amount": sortAmount }
  //         : undefined
  //   }).then((res) => {
  //     // res.status === 200 -> ok
  //     if (res.data) {
  //       setTxHistory(res.data)
  //     }
  //     if (res.info) {
  //       setTotalCount(res.info.totalCount)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   const fetchTransaction = async () => {
  //     if (profile && profile.data) {
  //       await getTransHistory({
  //         _playerId: profile && profile.data.id ? profile.data.id : "",
  //         _type: Event === "all" ? allTypes : Event,
  //         _limit: limit,
  //         _page: page,
  //         _sort:
  //           sortTime || sortAmount
  //             ? { "current_time": sortTime, "amount": sortAmount }
  //             : undefined
  //       }).then((res) => {
  //         // res.status === 200 -> ok
  //         if (res.data) {
  //           setTxHistory(res.data)
  //         }
  //         if (res.info) {
  //           setTotalCount(res.info.totalCount)
  //         }
  //       })
  //     }
  //   }
  //   fetchTransaction()
  // }),

  // console.log("Event", Event)

  return (
    <>
      {hydrated && (
        // <TransactionTable profile={profile.data} />
        <div className="md-w-[678px] mx-auto">
          {/* <Button onClick={fetchData}>click</Button> */}
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
            className="w-full overflow-x-auto rounded-2xl bg-transparent px-1.5 pt-4 pb-1.5 "
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
                className="uppercase"
              >
                {txHistory && txHistory.length > 0 ? (
                  txHistory.map((item) => (
                    <TableRowData
                      key={uuid()}
                      gridTemplateColumns="180px 130px 130px 100px 1fr"
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
                          {item.amount === 0 ? "-" : item.amount.toFixed(4)}
                        </div>,
                        <div key={item.id}>
                          {item.fee === 0 ? "-" : item.fee.toFixed(4)}
                        </div>,
                        <Chip
                          component="button"
                          onClick={() => {
                            onHandleView(item)
                          }}
                          key={item.id}
                          variant="outlined"
                          // color="secondary"
                          label="view transaction"
                          size="small"
                        />
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
