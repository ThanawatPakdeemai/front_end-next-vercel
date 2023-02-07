import React, { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getTransWallet } from "@feature/transaction/containers/services/transaction.service"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import dayjs from "dayjs"
import {
  Chip,
  Popover,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  Button,
  styled
} from "@mui/material"
import FilterIcon from "@components/icons/FilterIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import useProfileStore from "@stores/profileStore"
import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"
import { v4 as uuid } from "uuid"
// eslint-disable-next-line import/no-extraneous-dependencies
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import DropdownLimit from "../atoms/DropdownLimit"

interface IPropCheckbox {
  name: string
  value: boolean
}

type IPropSort = {
  current_time?: number
  amount?: number
}

export default function TransactionTable() {
  const { profile } = useProfileStore()
  const playerId = "61a72d7e970fbe264d627bf5"
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const fetchRef = useRef(false)
  const [valueCheckbox] = useState<IPropCheckbox[]>([
    { name: "DepositNaka", value: false },
    { name: "WithdrawNaka", value: false }
  ])
  const [sortBy, setSortBy] = useState<IPropSort>({
    "current_time": -1
  })
  const [type, setType] = useState<string[]>(["DepositNaka", "WithdrawNaka"])

  const {
    isLoading,
    isPreviousData,
    data: TransData,
    refetch
  } = useGetTransWallet({
    _playerId: playerId,
    _type: type,
    _limit: limit,
    _page: page,
    _sort: sortBy
  })

  useEffect(() => {
    if (!fetchRef.current && TransData) {
      fetchRef.current = true
      setTotalCount(TransData.info.totalCount)
    }
  }, [TransData])

  useEffect(() => {
    refetch()
  }, [refetch, valueCheckbox])

  const refreshData = useCallback(
    (_valueCheckbox: IPropCheckbox[]) => {
      if (_valueCheckbox) {
        if (
          !isPreviousData &&
          TransData &&
          sortBy &&
          profile &&
          valueCheckbox
        ) {
          queryClient.prefetchQuery({
            queryKey: ["getTransWallet", playerId, type, page, limit, sortBy],
            queryFn: () =>
              getTransWallet({
                _playerId: playerId,
                _type: type,
                _limit: limit,
                _page: page,
                _sort: sortBy
              })
          })
          setTotalCount(TransData.info.totalCount)
        }
      }
    },
    [
      TransData,
      isPreviousData,
      limit,
      page,
      profile,
      queryClient,
      sortBy,
      type,
      valueCheckbox
    ]
  )

  useEffect(() => {
    refreshData(valueCheckbox)
  }, [refreshData, valueCheckbox])

  const querySort = (_name: keyof IPropSort) => {
    let sortTime = -1
    if (sortBy[_name] === -1) {
      sortTime = 1
    } else {
      sortTime = -1
    }
    setSortBy({ [_name]: Number(sortTime) })
  }

  const TableRowStyle = styled(TableRow)({
    "&.MuiTableRow-root": {
      display: "grid",
      gridTemplateColumns: "180px 130px 130px 1fr"
    }
  })

  const TableCellStyle = styled(TableCell)({
    "&.MuiTableCell-root": {
      display: "flex",
      alignItems: "center"
    }
  })

  return (
    <div>
      <p className="my-5 font-neue-machina-bold text-default uppercase">
        Naka Storage Transactions
      </p>
      <TableContainer className="w-[580px] rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
        {isLoading ? (
          <SkeletonTableWallet />
        ) : (
          <Table aria-label="simple table">
            <TableHead
              sx={{
                display: "block"
              }}
              className="px-3.5"
            >
              <TableRowStyle>
                <TableCellStyle
                  className="border-b-0 pt-0 pl-0 pb-1 text-start font-neue-machina-bold text-xs uppercase text-neutral-600"
                  onClick={() => querySort("current_time")}
                >
                  <Button className="flex !min-w-0 justify-start bg-transparent p-0 font-neue-machina-bold text-xs">
                    <div className="flex items-center text-neutral-600 hover:text-neutral-400">
                      <p>Time</p>
                      <div className="ml-1 flex flex-col">
                        <KeyboardArrowUp
                          className={`mb-[-4px] !text-sm ${
                            sortBy["current_time"] === -1 && "text-neutral-400"
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`!text-sm ${
                            sortBy["current_time"] === 1 && "text-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </Button>
                </TableCellStyle>
                <TableCellStyle className="border-b-0 pt-0 pb-1 text-start uppercase">
                  <PopupState
                    variant="popover"
                    popupId="demo-popup-popover"
                  >
                    {(popupState) => (
                      <>
                        <Button
                          className="flex !min-w-0 justify-start bg-transparent p-0 font-neue-machina-bold text-xs"
                          {...bindTrigger(popupState)}
                        >
                          <div className="flex items-center text-neutral-600 hover:text-neutral-400">
                            <p>Type</p>
                            <div className="ml-1">
                              <FilterIcon className="mb-0.5" />
                            </div>
                          </div>
                        </Button>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                          }}
                        >
                          <div className="bg-neutral-780 p-2">
                            {valueCheckbox.map((value) => (
                              <CheckBoxNaka
                                key={uuid()}
                                value={value.value}
                                onHandle={(_event) => {
                                  const _index = valueCheckbox.findIndex(
                                    (ele) => ele.name === value.name
                                  )
                                  valueCheckbox.splice(_index, 1, {
                                    name: value.name,
                                    value: Boolean(_event?.target.checked)
                                  })
                                  refreshData(valueCheckbox)
                                  setType(
                                    valueCheckbox.every((ele) => !ele.value)
                                      ? valueCheckbox.map((ele) => ele.name)
                                      : valueCheckbox
                                          .filter(
                                            (ele) => ele.name && ele.value
                                          )
                                          .map((ele) => ele.name)
                                  )
                                }}
                                text={value.name}
                                className="flex items-center"
                              />
                            ))}
                          </div>
                        </Popover>
                      </>
                    )}
                  </PopupState>
                </TableCellStyle>
                <TableCellStyle
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase text-neutral-600"
                  onClick={() => querySort("amount")}
                >
                  <Button className="flex !min-w-0 justify-start bg-transparent p-0 font-neue-machina-bold text-xs">
                    <div className="flex items-center text-neutral-600 hover:text-neutral-400">
                      <p>Amount&nbsp;(Naka)</p>
                      <div className="ml-1 flex flex-col">
                        <KeyboardArrowUp
                          className={`mb-[-4px] !text-sm ${
                            sortBy["amount"] === -1 && "text-neutral-400"
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`!text-sm ${
                            sortBy["amount"] === 1 && "text-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </Button>
                </TableCellStyle>
                <TableCellStyle
                  align="right"
                  className="border-b-0 pt-0 pr-0 pb-1 font-neue-machina-bold text-xs uppercase text-neutral-600"
                >
                  <p>Fee</p>
                </TableCellStyle>
              </TableRowStyle>
            </TableHead>
            <TableBody
              sx={{
                display: "block",
                borderRadius: "9px",
                overflow: "hidden",
                "tr:last-of-type td": { borderBottom: 0 }
              }}
            >
              {TransData &&
                TransData.data.map((item) => (
                  <TableRowStyle
                    key={uuid()}
                    className="bg-neutral-900 px-3.5"
                  >
                    <TableCellStyle className="border-b-neutral-800 pl-0 text-start font-neue-machina-bold text-xs">
                      <span className="rounded-less border p-[5px]">
                        {dayjs(item.current_time).format("DD MMM YYYY")}
                      </span>
                      <span className="px-3">
                        {dayjs(item.current_time).format("hh:mm A")}
                      </span>
                    </TableCellStyle>
                    <TableCellStyle className="border-b-neutral-800 text-start">
                      <Chip
                        label={item.type}
                        size="small"
                        className={`font-neue-machina-bold uppercase !text-neutral-900 ${
                          item.type && item.type === "DepositNaka"
                            ? "!bg-varidian-default"
                            : "!bg-red-card"
                        }`}
                      />
                    </TableCellStyle>
                    <TableCellStyle className="border-b-neutral-800 text-start">
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
                    </TableCellStyle>
                    <TableCellStyle
                      align="right"
                      className="border-b-neutral-800 pr-0 font-neue-machina-bold text-sm"
                    >
                      - {item.fee.toFixed(4)}
                    </TableCellStyle>
                  </TableRowStyle>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div className="my-5 flex w-[580px] justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          defaultValue={12}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={setLimit}
        />
      </div>
    </div>
  )
}
