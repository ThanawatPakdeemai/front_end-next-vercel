/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getTransWallet } from "@feature/transaction/containers/services/transaction.service"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useGetTransWallet from "@feature/transaction/containers/hooks/useGetTransWallet"
import dayjs from "dayjs"
import {
  InputAdornment,
  Paper,
  Popover,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FilterIcon from "@components/icons/FilterIcon"
import SortIcon from "@components/icons/SortIcon"
import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import TransHead from "../atoms/TransHead"
import TransBody from "../atoms/TransBody"

export default function TransactionTable() {
  const initialType = ["DepositNaka", "WithdrawNaka"]
  const [type, setType] = useState<string[]>(["DepositNaka", "WithdrawNaka"])
  const playerId = "61a72d7e970fbe264d627bf5"
  const limit = 10
  const [page, setPage] = useState<number>(1)
  const fetchRef = useRef(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const queryClient = useQueryClient()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [checkDeposit, setCheckDeposit] = useState<boolean>(false)
  const [checkWithdraw, setCheckWithdraw] = useState<boolean>(false)

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
  }, [TransData, isPreviousData, page, queryClient])

  useEffect(() => {
    if (type) {
      queryClient.fetchQuery({
        queryKey: ["getTransWallet", playerId, type, page],
        queryFn: () =>
          getTransWallet({
            _playerId: playerId,
            _type: type,
            _limit: limit,
            _page: page
          })
      })
    }
  }, [type])

  const setChangeType = (selected: any) => {
    selected =
      selected.target.value === "all" ? initialType : [selected.target.value]
    setType(selected)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <div>
      <p className="my-5 font-neue-machina-bold text-default uppercase">
        Naka Storage Transactions
      </p>
      <TableContainer
        sx={{ width: "700px", borderRadius: "16px" }}
        component={Paper}
        className="items-center bg-[#101013] px-1.5 pb-1.5 pt-5"
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "none"
            }
          }}
          aria-label="simple table"
        >
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                padding: "0px",
                paddingLeft: "16px"
              }
            }}
          >
            <TableRow>
              <TransHead
                label="TIME"
                icon={SortIcon}
              />
              <TransHead
                label="TYPE"
                icon={FilterIcon}
                onHandle={(e) => handleClick(e)}
              />
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
                  {/* <select
                    value={type}
                    name="type"
                    id="type"
                    onChange={setChangeType}
                  >
                    <option value="all">All</option>
                    <option value="DepositNaka">DepositNaka</option>
                    <option value="WithdrawNaka">WithdrawNaka</option>
                  </select> */}
                  <CheckBoxNaka
                    value={checkDeposit}
                    onHandle={() => setCheckDeposit(!checkDeposit)}
                    text="DepositNaka"
                    className="flex items-center"
                  />
                  <CheckBoxNaka
                    value={checkWithdraw}
                    onHandle={() => setCheckWithdraw(!checkWithdraw)}
                    text="WithdrawNaka"
                    className="flex items-center"
                  />
                </Typography>
              </Popover>
              <TransHead
                label="AMOUNT (NAKA)"
                icon={SortIcon}
              />
              <TransHead
                label="FEE (MATIC)"
                className="justify-end"
              />
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "tr:last-of-type": { borderBottom: 0 },
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
        {isLoading ? <div>Loading ...</div> : null}
      </TableContainer>
      <div className="my-5 flex justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <TextField
          // label="Show 6"
          className="ml-3"
          select
          value={[10, 15, 20, 25, 30]}
          placeholder="Show 6"
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
        />
      </div>
    </div>
  )
}
