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
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import FilterIcon from "@components/icons/FilterIcon"
import SortIcon from "@components/icons/SortIcon"
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
                  <select
                    value={type}
                    name="type"
                    id="type"
                    onChange={setChangeType}
                  >
                    <option value="all">All</option>
                    <option value="DepositNaka">DepositNaka</option>
                    <option value="WithdrawNaka">WithdrawNaka</option>
                  </select>
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
            {TransData &&
              TransData.data.map((data) => (
                <>
                  <TransBody
                    key={data.id}
                    date={dayjs(data.current_time).format("DD MMM YYYY")}
                    time={dayjs(data.current_time).format("hh:mm A")}
                    type={data.type}
                    amount={data.amount}
                    fee={data.fee}
                  />
                  <div className="!mx-5">
                    <TableRow className="!border-indigo-500/100 w-50 border-b-[10px]" />
                  </div>
                  {/* <Divider variant="fullWidth" /> */}
                  {/* <td>
                    <hr />
                  </td> */}
                </>
              ))}
          </TableBody>
        </Table>
        {isLoading ? <div>Loading ...</div> : null}
      </TableContainer>
      <Box className="rounded-[14px] bg-neutral-800">
        <Box sx={{ my: 3, mx: 2 }}>
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
                <TableRow>
                  <TableCell className="font-neue-machina-bold text-xs text-neutral-600 ">
                    Time
                  </TableCell>
                  <TableCell className="font-neue-machina-bold text-xs text-neutral-600">
                    type
                  </TableCell>
                  <TableCell className="font-neue-machina-bold text-xs text-neutral-600">
                    time
                  </TableCell>
                  <TableCell className="font-neue-machina-bold text-xs text-neutral-600">
                    amount (NAKA)
                  </TableCell>
                  <TableCell className="font-neue-machina-bold text-xs text-neutral-600">
                    fee (MATIC)
                  </TableCell>
                </TableRow>
              </TableHead>
            </Grid>
          </Grid>
          <Box
            sx={{ my: 10, mx: 2 }}
            className="rounded-[9px] bg-primary-main"
          >
            {/* <Typography
              color="text.secondary"
              variant="body2"
            >
              Pinstriped cornflower blue cotton blouse takes you on a walk to
              the park or just down the hall.
            </Typography> */}
            <br />
            <Divider variant="middle" />
            <TableBody className="px-4">
              {TransData &&
                TransData.data.map((item) => (
                  <>
                    <div className="px-4">
                      <TableRow
                        key={item.id}
                        // sx={{ borderBottom: "5px solid red" }}
                        // className="border-b-[1px] border-neutral-700"
                        sx={{
                          "& .MuiTableCell-root": {
                            borderBottom: "1px solid rgb(0 0 255)"
                          }
                        }}
                        className="border-b-lime-400"
                      >
                        <TableCell align="left">
                          {dayjs(item.current_time).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell align="left">{item.type}</TableCell>
                        <TableCell align="left">
                          {dayjs(item.current_time).format("hh:mm A")}
                        </TableCell>
                        <TableCell align="left">{item.amount}</TableCell>
                        <TableCell align="left">{item.fee}</TableCell>
                      </TableRow>
                    </div>
                    {/* <Grid
                    item
                    container
                  >
                    <TableRow>
                      {row.name}
                      <Divider variant="middle" />
                    </TableRow>
                    <TableRow>
                      {row.calories}
                      <Divider variant="middle" />
                    </TableRow>
                    <TableRow>
                      {row.fat}
                      <Divider variant="middle" />
                    </TableRow>
                    <TableRow>
                      {row.carbs}
                      <Divider variant="middle" />
                    </TableRow>
                    <TableRow>
                      {row.protein}
                      <Divider variant="middle" />
                    </TableRow>
                  </Grid> */}
                  </>
                ))}
            </TableBody>
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>
          <Stack
            direction="row"
            spacing={1}
          >
            <Chip label="Extra Soft" />
          </Stack>
        </Box>
      </Box>
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
