import React, { useEffect, useRef, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  styled,
  Button
} from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useHistory from "@feature/history/containers/hook/useHistory"
import dayjs from "dayjs"
// import { useTranslation } from "react-i18next"

const TableCellStyle = styled(TableCell)({
  ":root": {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textOverflow: "ellipsis",
    text: "uppercase"
  }
})

const TableRowStyle = styled(TableRow)({
  ":root": {
    color: "red"
  },
  "&.MuiTableRow-root": {
    display: "grid",
    gridTemplateColumns: "250px 100px 130px 100px 1fr"
  }
})

// function createData(
//   time: string,
//   game: string,
//   type: string,
//   status: string,
//   view: string
// ) {
//   return { time, game, type, status, view }
// }

// const rows = [
//   createData("22 JAN 2023", "NAKAMOTO WAR", "PLAY TO EARN", "DONE", "View"),
//   createData("22 JAN 2023", "NAKAMOTO WAR", "FREE TO PLAY", "DONE", "View"),
//   createData("22 JAN 2023", "NAKAMOTO WAR", "PLAY TO EARN", "DONE", "View"),
//   createData("22 JAN 2023", "NAKAMOTO WAR", "PLAY TO EARN", "DONE", "View")
// ]

const HistoryTable = () => {
  const playerId = "61a72d7e970fbe264d627bf5"
  const limit = 12
  // const [limit, setLimit] = useState<number>(12)
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const { historyData, historyIsLoading } = useHistory({
    player_id: playerId,
    limit,
    skip
  })

  useEffect(() => {
    if (!fetchRef.current && historyData) {
      fetchRef.current = true
      setTotalCount(historyData.info.totalCount)
    }
  }, [historyData])

  // const onHandleView = (row: string, _id: string, path: any) => {}

  return (
    <div>
      <h2 className="my-1 font-neue-machina text-default uppercase text-primary-contrastText">
        PLAY HISTORY
      </h2>
      <h1 className="mb-8 font-neue-machina text-xs uppercase text-neutral-600">
        Wallet manager for nakamoto.games world
      </h1>

      <TableContainer
        className="w-[678px] overflow-hidden rounded-2xl bg-transparent p-2 pt-0"
        component={Paper}
      >
        {historyIsLoading ? (
          <p>Loading ...</p>
        ) : (
          <Table className="rounded-2xl border-black-500 bg-neutral-780 p-5 py-1.5 text-neutral-600">
            <TableHead
              sx={{
                display: "block"
              }}
              className="border-box uppercase"
            >
              <TableRowStyle>
                <TableCellStyle className="rounded-t-lg border-b-0">
                  <div className="flex">
                    <p>TIME</p>
                    <div className="ml-1 flex flex-col pt-0.5">
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp className="mb-[-6px] text-sm" />
                        <KeyboardArrowDown className="text-sm" />
                      </div>
                    </div>
                  </div>
                </TableCellStyle>
                <TableCellStyle
                  align="left"
                  className="border-b-0"
                >
                  <div className="flex">
                    <p>GAME</p>
                    <div className="ml-1 flex flex-col pt-0.5">
                      <KeyboardArrowUp className="mb-[-6px] text-sm" />
                      <KeyboardArrowDown className="text-sm" />
                    </div>
                  </div>
                </TableCellStyle>
                <TableCellStyle
                  align="left"
                  className="border-b-0"
                >
                  <div className="flex">
                    <p>TYPE</p>
                    <div className="ml-1 flex flex-col pt-0.5">
                      <KeyboardArrowUp className="mb-[-6px] text-sm" />
                      <KeyboardArrowDown className="text-sm" />
                    </div>
                  </div>
                </TableCellStyle>
                <TableCellStyle
                  align="left"
                  className="border-b-0"
                >
                  <div className="flex">
                    <p>STATUS</p>
                    <div className="ml-1 flex flex-col pt-0.5">
                      <KeyboardArrowUp className="mb-[-6px] text-sm" />
                      <KeyboardArrowDown className="text-sm" />
                    </div>
                  </div>
                </TableCellStyle>
                <TableCell
                  align="right"
                  className="border-b-0"
                >
                  <div className="flex">
                    <p>VIEW</p>
                    <div className="ml-1 flex flex-col pt-0.5">
                      <KeyboardArrowUp className="mb-[-6px] text-sm" />
                      <KeyboardArrowDown className="text-sm" />
                    </div>
                  </div>
                </TableCell>
              </TableRowStyle>
            </TableHead>
            <TableBody
              sx={{
                display: "block",
                borderRadius: "5px",
                overflow: "hidden",
                "tr:last-of-type td": { borderBottom: 0 }
              }}
            >
              {historyData &&
                historyData.data.length > 0 &&
                historyData.data.map((row) => (
                  <TableRowStyle
                    className="bg-neutral-900 px-2"
                    key={row._id}
                  >
                    <TableCellStyle className="border-b-neutral-800">
                      <div className="flex items-center">
                        <Chip
                          label={dayjs(row.createdAt).format("DD MMM YYYY")}
                          size="small"
                          color="default"
                          variant="outlined"
                          className="font-bold"
                        />
                        <span className="ml-4">
                          {dayjs(row.createdAt).format("hh:mm A")}
                        </span>
                      </div>
                    </TableCellStyle>
                    <TableCellStyle className="border-b-neutral-800 text-neutral-300">
                      {row.game_name}
                    </TableCellStyle>
                    <TableCellStyle
                      className="border-b-neutral-800"
                      // align="center"
                    >
                      {row.game_mode === "PLAY TO EARN" ? (
                        <Chip
                          label={row.game_mode}
                          size="small"
                          color="error"
                          className="font-bold"
                        />
                      ) : (
                        <Chip
                          label={row.game_mode}
                          size="small"
                          color="secondary"
                          className="font-bold"
                        />
                      )}
                    </TableCellStyle>
                    <TableCellStyle
                      align="left"
                      className="border-b-neutral-800 uppercase"
                    >
                      {row.room_status}
                    </TableCellStyle>
                    <TableCell
                      className="border-b-neutral-800 text-success-main"
                      align="right"
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
                        onClick={() => {}}
                      >
                        view
                      </Button>
                    </TableCell>
                  </TableRowStyle>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div className="my-5 flex w-[678px] justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={skip}
          setPage={setSkip}
        />
        {/* <DropdownLimit
          defaultValue={12}
          list={[6, 12, 24, 48, 64]}
          onChangeSelect={handleLimit}
        /> */}
      </div>
    </div>
  )
}

export default HistoryTable
