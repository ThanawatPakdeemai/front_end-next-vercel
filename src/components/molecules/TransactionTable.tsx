import React from "react"
// import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
// import useGetTransWallet from "@feature/transaction/hooks/useGetTransWallet"
// import dayjs from "dayjs"
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from "@mui/material"

export default function TransactionTable() {
  // const playerId = "63bb9d6331043a1495dbbdcf"
  // const type = null
  // const limit = 30
  // const [page, setPage] = useState<number>(1)
  // const fetchRef = useRef(false)
  // const [totalCount, setTotalCount] = useState<number>(0)

  // const {
  //   isLoading,
  //   isPreviousData,
  //   data: TransData
  // } = useGetTransWallet({
  //   _playerId: playerId,
  //   _type: type,
  //   _limit: limit,
  //   _page: page
  // })

  return (
    <div>
      {/* Naka Storage Transactions
      <TableContainer
        sx={{ maxWidth: 650, padding: 1, borderRadius: "14px" }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TIME</TableCell>
              <TableCell align="right">TYPE</TableCell>
              <TableCell align="right">AMOUNT (NAKA)</TableCell>
              <TableCell align="right">FEE (MATIC)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "tr:first-child td": { borderTop: 0 },
              "tr:last-child td": { borderBottom: 0 },
              "tr:first-child td:first-child": { borderTopLeftRadius: "9px" },
              "tr:first-child td:last-child": { borderTopRightRadius: "9px" },
              "tr:last-child td:first-child": { borderBottomLeftRadius: "9px" },
              "tr:last-child td:last-child": { borderBottomRightRadius: "9px" }
            }}
            className="bg-primary-main"
          >
            {TransData?.data.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  {dayjs(data.date_time).format("DD-MMM-YYYY hh:mm A")}
                </TableCell>
                <TableCell align="right">{data.type}</TableCell>
                <TableCell align="right">{data.amount}</TableCell>
                <TableCell align="right">{data.fee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationNaka
        totalCount={totalCount}
        limit={limit}
        page={page}
        setPage={setPage}
      /> */}
    </div>
  )
}
