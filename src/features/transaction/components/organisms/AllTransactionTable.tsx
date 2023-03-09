import React, { useEffect, useRef, useState } from "react"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import useTransactionController from "@feature/transaction/containers/hooks/useTransactionController"
import dayjs from "dayjs"
import { Chip, TableBody, Table, TableContainer, Button } from "@mui/material"
import IconArrowTop from "@components/icons/arrowTopIcon"
import { v4 as uuid } from "uuid"
import {
  ITransactionWalletData,
  ITransData
} from "@feature/transaction/interfaces/ITransaction"
import DropdownLimit from "@components/atoms/DropdownLimit"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import { useTranslation } from "react-i18next"
import useGlobal from "@hooks/useGlobal"
import { IProfile } from "@src/types/profile"
import { useRouter } from "next/router"
import CONFIGS from "@configs/index"
import TableNodata from "../atoms/TableNodata"
import DropdownEvent from "../molecules/DropdownEvent"

interface IProp {
  profile?: IProfile
}

export default function AllTransactionTable({ profile }: IProp) {
  const baseUrl = CONFIGS.CHAIN.POLYGON_SCAN
  const { hydrated } = useGlobal()
  const { t } = useTranslation()
  const { getTransHistory } = useGetTransWallet()
  const { sortTime, sortAmount, typeCheck, AllTransactionTableHeader } =
    useTransactionController()
  const [limit, setLimit] = useState<number>(12)
  const allTypes = [
    "all",
    "BuyItem",
    "ClaimRental",
    "CreateItemOrder",
    "CreateLandOrder",
    "CreateBuildingOrder",
    "CreateNFTGameOrder",
    "CancelSubmitBuyNaka",
    "CancleBuildingOrder",
    "CancleLandOrder",
    "DepositNaka",
    "RentLand",
    "RewardSeasonPass",
    "MintBuilding",
    "MintLand",
    "MultiChainSubmitSellNaka",
    "PayCommission",
    "TransferNFTGameOwner",
    "WithdrawNaka",
    "WithdrawMaterial"
  ]
  const [Event, setEvent] = useState<string>("all")
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const router = useRouter()
  const [txHistory, setTxHistory] = useState<ITransactionWalletData[]>([])
  const gridTemplateColumns: string = "160px 160px 130px 80px 1fr"

  useEffect(() => {
    const fetchHistory = async () => {
      if (profile) {
        await getTransHistory({
          _playerId: profile && profile.id ? profile.id : "",
          _type: Event === "all" ? allTypes : Event,
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
    }
    if (fetchRef.current) {
      fetchHistory()
    }
    fetchRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortTime, Event, typeCheck, sortAmount])

  const handleLimit = (_limit: number) => {
    setLimit(_limit)
  }

  const onHandleEvent = (_event: string) => {
    setEvent(_event)
  }

  const onHandleView = (element: ITransData) => {
    router.push(`${baseUrl}/tx/${element.transaction_hash}`)
  }

  const formatNumber = (num: number): string => {
    if (num < 1000) {
      return num.toFixed(2)
    }
    if (num >= 1000 && num < 1000000) {
      return `${(num / 1000).toFixed(2)}K`
    }
    if (num >= 1000000 && num < 1000000000) {
      return `${(num / 1000000).toFixed(2)}M`
    }
    if (num >= 1000000000 && num < 1000000000000) {
      return `${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000000000 && num < 1000000000000000) {
      return `${(num / 1000000000000).toFixed(2)}T`
    }
    if (num >= 1000000000000000 && num < 1000000000000000000) {
      return `${(num / 1000000000000000).toFixed(2)}Q`
    }
    return `${(num / 1000000000000000000).toFixed(2)}Qi`
  }
  return (
    <>
      <div className="flex justify-between uppercase">
        <div>
          <div className="text-[18px] text-neutral-400">
            history tRansactions
          </div>
          <div className="text-xs">Wallet manager for nakamoto.games world</div>
        </div>
        <DropdownEvent
          defaultValue={Event}
          list={allTypes}
          onChangeEvent={onHandleEvent}
        />
      </div>
      {hydrated && (
        <div>
          <TableContainer className="my-9 rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
            <Table aria-label="simple table">
              <TableHeader
                thead={AllTransactionTableHeader}
                gridTemplateColumns={gridTemplateColumns}
              />
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
                      gridTemplateColumns={gridTemplateColumns}
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
                              {formatNumber(item.amount)}
                            </div>
                          </div>
                        </div>,
                        <div
                          key={item.id}
                          className="flex w-fit"
                        >
                          <span className="font-neue-machina-bold text-sm text-neutral-600">
                            - {item.fee.toFixed(4)}
                          </span>
                        </div>,
                        <div
                          key={item.id}
                          className="flex w-full justify-end"
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              paddingX: "10px !important",
                              marginTop: "4px !important",
                              minWidth: "10px !important",
                              borderRadius: "5px !important"
                            }}
                            className="h-6 flex-none justify-self-end font-neue-machina text-[10px] uppercase text-grey-neutral04"
                            onClick={() => {
                              onHandleView(item)
                            }}
                          >
                            {t("view_Transaction")}
                          </Button>
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
          <div className="flex justify-between">
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            <DropdownLimit
              defaultValue={limit}
              list={[6, 12, 24, 48, 64]}
              onChangeSelect={handleLimit}
            />
          </div>
        </div>
      )}
    </>
  )
}
