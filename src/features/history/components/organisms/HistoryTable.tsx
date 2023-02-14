import React, { useEffect, useRef, useState } from "react"
import { Table, TableBody, TableContainer, Paper, Chip } from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useHistory from "@feature/history/containers/hook/useHistory"
import dayjs from "dayjs"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useProfileStore from "@stores/profileStore"
import useTable from "@feature/table/containers/hooks/useTable"

const HistoryTable = () => {
  const profile = useProfileStore((state) => state.profile.data)

  // Hooks
  const { HistoryTableHead, onHandleView } = useHistoryController()
  const { limit } = useTable()

  // States
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const { historyData, historyIsLoading } = useHistory({
    player_id: profile && profile.id ? profile.id : "",
    limit,
    skip
  })

  const roomStatus = (status: string) => {
    if (status === "send_noti") {
      return "Done"
    }
    if (status === "running") {
      return "Running"
    }
    return ""
  }

  useEffect(() => {
    if (!fetchRef.current && historyData) {
      fetchRef.current = true
      setTotalCount(historyData.info.totalCount)
    }
  }, [historyData])

  return (
    <div className="mx-auto max-w-[678px]">
      <PageHeader
        title="PLAY HISTORY"
        subtitle="Wallet manager for nakamoto.games world"
      />
      <TableContainer
        className="w-[678px] overflow-hidden rounded-2xl bg-transparent px-1.5 pt-4 pb-1.5"
        component={Paper}
      >
        {historyIsLoading ? (
          <p>Loading ...</p>
        ) : (
          <Table className="whitespace-nowrap rounded-2xl border-black-500 bg-neutral-780 p-5 py-1.5 text-neutral-600">
            <TableHeader
              thead={HistoryTableHead}
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
              {historyData &&
                historyData.data.length > 0 &&
                historyData.data.map((row) => (
                  <TableRowData
                    key={row._id}
                    gridTemplateColumns="180px 130px 130px 100px 1fr"
                    child={[
                      <div
                        key={row._id}
                        className="history--datetime flex items-center"
                      >
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
                      </div>,
                      <div
                        key={row._id}
                        className="history--gameName truncate"
                      >
                        {row.game_name}
                      </div>,
                      <div
                        key={row._id}
                        className="history--gameType"
                      >
                        {row.game_mode === "play-to-earn" ? (
                          <Chip
                            label={row.game_mode.split("-").join(" ")}
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
                      </div>,
                      <div
                        key={row._id}
                        className="history--roomStatus"
                      >
                        {roomStatus(row.room_status)}
                      </div>,
                      <div
                        key={row._id}
                        className="history--viewMore flex w-full justify-end"
                      >
                        <Chip
                          label="View Summary"
                          size="small"
                          color="default"
                          variant="outlined"
                          className="font-bold"
                          onClick={() => {
                            onHandleView(row.path, row.room_id)
                          }}
                        />
                      </div>
                    ]}
                  />
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
