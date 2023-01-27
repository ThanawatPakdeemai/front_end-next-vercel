/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getTransWallet } from "@feature/transaction/containers/services/transaction.service"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import dayjs from "dayjs"
import {
  Box,
  Chip,
  Grid,
  InputAdornment,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputLabel,
  OutlinedInput,
  IconButton
} from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FilterIcon from "@components/icons/FilterIcon"
import SortIcon from "@components/icons/SortIcon"
import IconArrowTop from "@components/icons/arrowTopIcon"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import useProfileStore from "@stores/profileStore"
import { v4 as uuid } from "uuid"

interface IPropCheckbox {
  name: string
  value: boolean
}

export default function TransactionTable() {
  const profile = useProfileStore((state) => state.profile.data)
  // const initialType = ["DepositNaka", "WithdrawNaka"]
  const type = ["DepositNaka", "WithdrawNaka"]
  const playerId = "61a72d7e970fbe264d627bf5"
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  const [valueCheckbox, setValueCheckbox] = useState<IPropCheckbox[]>([
    { name: "DepositNaka", value: false },
    { name: "WithdrawNaka", value: false }
  ])

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
    const value = valueCheckbox
      .filter((ele) => ele.value)
      ?.map((ele) => ele.name)
    if (!isPreviousData && TransData) {
      queryClient.prefetchQuery({
        queryKey: ["getTransWallet", playerId, value, page + 1],
        queryFn: () =>
          getTransWallet({
            _playerId: playerId,
            _type: value,
            _limit: limit,
            _page: page + 1
          })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TransData, isPreviousData, page, queryClient, valueCheckbox])

  // useEffect(() => {
  //   const valueReal = valueCheckbox.filter((ele) => ele.value)
  //   console.log(valueReal)
  //   console.log(valueCheckbox)

  //   if (type) {
  //     queryClient.fetchQuery({
  //       queryKey: ["getTransWallet", playerId, type, page],
  //       queryFn: () =>
  //         getTransWallet({
  //           _playerId: playerId,
  //           _type: type,
  //           _limit: limit,
  //           _page: page
  //         })
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [valueCheckbox])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const queryByType = (_valueCheck) => {
    // const valueReal = valueCheckbox.filter((ele) => ele.value)
    // console.log(valueReal)
    // console.log(valueCheckbox)
    console.log(_valueCheck)

    if (_valueCheck) {
      queryClient.fetchQuery({
        queryKey: ["getTransWallet", playerId, _valueCheck, page],
        queryFn: () =>
          getTransWallet({
            _playerId: playerId,
            _type: _valueCheck,
            _limit: limit,
            _page: page
          })
      })
    }
  }
  console.log(TransData)
  return (
    <div>
      <p className="my-5 font-neue-machina-bold text-default uppercase">
        Naka Storage Transactions
      </p>
      <Box className="w-[563px] rounded-[14px] bg-neutral-800 px-1.5 pb-1.5 pt-5">
        <Box>
          <Grid
            container
            alignItems="center"
          >
            <Grid item>
              <TableHead
                className="uppercase"
                sx={{
                  "& .MuiTableCell-root": {
                    borderBottom: "none"
                  }
                }}
              >
                <TableRow className="grid grid-cols-5 gap-0.5 pl-4">
                  <TableCell className="col-span-2 flex p-0 font-neue-machina-bold text-xs text-neutral-600">
                    Time
                    <SortIcon className="mt-1" />
                  </TableCell>
                  <TableCell className="flex p-0 font-neue-machina-bold text-xs text-neutral-600">
                    type
                    <IconButton
                      aria-label="filter type"
                      onClick={(e) => handleClick(e)}
                    >
                      <FilterIcon />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        {valueCheckbox.map((value, index) => (
                          <CheckBoxNaka
                            key={Number(index)}
                            value={value.value}
                            onHandle={(_event) => {
                              // handleCheckbox(value, _event?.target.checked)
                              const _index = valueCheckbox.findIndex(
                                (ele) => ele.name === value.name
                              )
                              valueCheckbox.splice(_index, 1, {
                                name: value.name,
                                value: Boolean(_event?.target.checked)
                              })
                              setValueCheckbox(valueCheckbox)
                              handleClose()
                              console.log(valueCheckbox)
                              queryByType(
                                valueCheckbox
                                  .filter((ele) => ele.value)
                                  ?.map((ele) => ele.name)
                              )
                            }}
                            text={value.name}
                            className="flex items-center"
                          />
                        ))}
                      </Typography>
                    </Popover>
                  </TableCell>
                  <TableCell className="flex p-0 font-neue-machina-bold text-xs text-neutral-600">
                    amount (NAKA)
                    <SortIcon className="mt-1" />
                  </TableCell>
                  <TableCell className="flex justify-end p-0 font-neue-machina-bold text-xs text-neutral-600">
                    fee (MATIC)
                  </TableCell>
                </TableRow>
              </TableHead>
            </Grid>
          </Grid>
          <Box className="rounded-[9px] bg-primary-main px-3.5">
            <TableBody>
              {TransData &&
                TransData.data.map((item) => (
                  <>
                    <div>
                      <TableRow
                        key={item.id}
                        sx={{
                          "& .MuiTableCell-root": {
                            borderBottom: "1px solid rgb(24 24 28)"
                          }
                        }}
                        className="grid grid-cols-5"
                      >
                        <TableCell
                          align="left"
                          className="col-span-2 flex items-center pl-0 pr-0 font-neue-machina-bold text-xs"
                        >
                          <span className="rounded-[4px] border border-neutral-700 p-1 uppercase text-neutral-400 ">
                            {dayjs(item.current_time).format("DD MMM YYYY")}
                          </span>
                          <span className="px-5 text-neutral-500">
                            {dayjs(item.current_time).format("hh:mm A")}
                          </span>
                        </TableCell>
                        <TableCell
                          align="left"
                          className="px-0"
                        >
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
                        <TableCell
                          align="left"
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
                        </TableCell>
                        <TableCell
                          align="right"
                          className="flex items-center pr-0 font-neue-machina-bold text-sm"
                        >
                          - {item.fee.toFixed(4)}
                        </TableCell>
                      </TableRow>
                      {isLoading ? <div>Loading ...</div> : null}
                    </div>
                  </>
                ))}
            </TableBody>
          </Box>
        </Box>
      </Box>
      <div className="my-5 flex justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        {/* <TextField
          className="ml-3"
          select
          value={0}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOutlinedIcon />
                <span className="ml-[18px] font-neue-machina-bold text-xs uppercase">
                  show
                </span>
              </InputAdornment>
            )
          }}
        /> */}
      </div>
    </div>
  )
}
