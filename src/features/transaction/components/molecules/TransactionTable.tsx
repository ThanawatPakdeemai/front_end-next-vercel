import React, { useCallback, useEffect, useState } from "react"
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
  TableContainer
} from "@mui/material"
import FilterIcon from "@components/icons/FilterIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import useProfileStore from "@stores/profileStore"
import SkeletonTableWallet from "@components/atoms/skeleton/SkeletonTableWallet"
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"
import { v4 as uuid } from "uuid"
import { borderTableStyle } from "@constants/styleConstants"
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
  const [playerId, setPlayerId] = useState<string>("")
  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
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
    if (profile && profile.data) {
      setPlayerId(profile.data.id)
    }
  }, [profile])

  useEffect(() => {
    if (TransData) {
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
        }
      }
    },
    [
      TransData,
      isPreviousData,
      limit,
      page,
      playerId,
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

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const querySort = (_name: keyof IPropSort) => {
    let sortTime = -1
    if (sortBy[_name] === -1) {
      sortTime = 1
    } else {
      sortTime = -1
    }
    setSortBy({ [_name]: Number(sortTime) })
  }

  const handleLimit = (_limit: number) => {
    setLimit(_limit)
  }

  return (
    <div>
      <p className="my-5 font-neue-machina-bold text-default uppercase">
        Naka Storage Transactions
      </p>
      <TableContainer className="w-[678px] rounded-[14px] border border-neutral-800 bg-neutral-780 px-1.5 pb-1.5 pt-4">
        {isLoading ? (
          <SkeletonTableWallet />
        ) : (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  onClick={() => querySort("current_time")}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>Time</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortBy["current_time"] === -1 && "text-neutral-400"
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortBy["current_time"] === 1 && "text-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  onClick={(e) => handleClick(e)}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>Type</p>
                      <div className="ml-1">
                        <FilterIcon className="text-sm" />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  onClick={() => querySort("amount")}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>Amount&nbsp;(Naka)</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortBy["amount"] === -1 && "text-neutral-400"
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortBy["amount"] === 1 && "text-neutral-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-b-0 pt-0 pb-1 text-end font-neue-machina-bold text-xs uppercase">
                  <p>Fee</p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={borderTableStyle}>
              {TransData &&
                TransData.data.map((item) => (
                  <TableRow
                    key={uuid()}
                    className="bg-neutral-900"
                  >
                    <TableCell
                      // sx={{
                      //   "& .MuiTableCell-root": { borderWidth: "100px" }
                      // }}
                      className="border-b-neutral-800 text-start font-neue-machina-bold text-xs"
                    >
                      <span className="rounded-less border p-[5px]">
                        {dayjs(item.current_time).format("DD MMM YYYY")}
                      </span>
                      <span className="px-3">
                        {dayjs(item.current_time).format("hh:mm A")}
                      </span>
                    </TableCell>
                    <TableCell className="border-b-neutral-800 text-start">
                      <Chip
                        label={item.type}
                        size="small"
                        className={`font-neue-machina-bold uppercase !text-neutral-900 ${
                          item.type && item.type === "DepositNaka"
                            ? "!bg-varidian-default"
                            : "!bg-red-card"
                        }`}
                      />
                    </TableCell>
                    <TableCell className="border-b-neutral-800 text-start">
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
                    </TableCell>
                    <TableCell className="border-b-neutral-800 text-end font-neue-machina-bold text-sm">
                      - {item.fee.toFixed(4)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div className="my-5 flex w-[678px] justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <DropdownLimit
          defaultValue={12}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={handleLimit}
        />
      </div>
      <>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          sx={{ "& .MuiPaper-rounded": { borderRadius: "9px" } }}
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
                  handleClose()
                  setType(
                    valueCheckbox.every((ele) => !ele.value)
                      ? valueCheckbox.map((ele) => ele.name)
                      : valueCheckbox
                          .filter((ele) => ele.name && ele.value)
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
    </div>
  )
}
