import React, { useEffect, useRef, useState } from "react"
import { Table, TableBody, TableContainer, Paper, Chip } from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import useHistory from "@feature/history/containers/hook/useHistory"
import dayjs from "dayjs"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import DropdownLimit from "@components/atoms/DropdownLimit"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"
import useGlobal from "@hooks/useGlobal"
import useProfileStore from "@stores/profileStore"
import useTable from "@feature/table/containers/hooks/useTable"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import { IHistory } from "@feature/history/interfaces/IHistoryService"

const HistoryTable = () => {
  const profile = useProfileStore((state) => state.profile.data)

  // Hooks
  const { pager, hydrated } = useGlobal()
  const { HistoryTableHead, onHandleView } = useHistoryController()
  const { limit, setLimit } = useTable()
  const { getHistoryData } = useHistory()

  // States
  const [skip, setSkip] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const [hxHistory, setHxHistory] = useState<IHistory[]>([])

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
    const fetchHistory = async () => {
      if (profile) {
        await getHistoryData({
          player_id: profile && profile.id ? profile.id : "",
          limit,
          skip
        }).then((res) => {
          // res.status === 200 -> ok
          if (res.data) {
            setHxHistory(res.data)
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
  }, [limit, skip])

  return (
    <>
      {hydrated && (
        <div className="mx-auto max-w-[678px]">
          <PageHeader
            title="PLAY HISTORY"
            subtitle="Wallet manager for nakamoto.games world"
          />

          <TableContainer
            className="w-[678px] overflow-hidden rounded-2xl bg-transparent px-1.5 pt-4 pb-1.5"
            component={Paper}
          >
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
                {hxHistory && hxHistory.length > 0 ? (
                  hxHistory.map((row) => (
                    <TableRowData
                      key={row._id}
                      gridTemplateColumns="180px 130px 130px 90px 1fr"
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
                            className="font-bold text-grey-neutral04"
                            onClick={() => {
                              onHandleView(row.path, row.room_id)
                            }}
                          />
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

          <div className="my-5 flex w-[678px] justify-between">
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={skip}
              setPage={setSkip}
            />
            <DropdownLimit
              defaultValue={12}
              list={pager}
              onChangeSelect={setLimit}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default HistoryTable
