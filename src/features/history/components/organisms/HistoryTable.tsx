/* eslint-disable no-console */
import React from "react"
import dayjs from "dayjs"
import { v4 as uuid } from "uuid"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import Box from "@mui/material/Box"
import { TRoomStatus } from "@feature/game/interfaces/IGameService"
import useTable from "@feature/table/containers/hooks/useTable"
import useGlobal from "@hooks/useGlobal"
import useHistoryController from "@feature/history/containers/hook/useHistoryController"

const TableNodata = dynamic(
  () => import("@feature/transaction/components/atoms/TableNodata"),
  {
    suspense: true,
    ssr: false
  }
)
const SkeletonTableWallet = dynamic(
  () => import("@components/atoms/skeleton/SkeletonTableWallet"),
  {
    suspense: true,
    ssr: false
  }
)
const Table = dynamic(() => import("@mui/material/Table"), {
  suspense: true,
  ssr: false
})
const TableBody = dynamic(() => import("@mui/material/TableBody"), {
  suspense: true,
  ssr: false
})
const Chip = dynamic(() => import("@mui/material/Chip"), {
  suspense: true,
  ssr: false
})
const PaginationNaka = dynamic(
  () => import("@components/atoms/pagination/PaginationNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const PageHeader = dynamic(
  () => import("@feature/table/components/molecules/PageHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const TableRowData = dynamic(
  () => import("@feature/table/components/molecules/TableRowData"),
  {
    suspense: true,
    ssr: false
  }
)
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
  suspense: true,
  ssr: false
})
const TableHeader = dynamic(
  () => import("@feature/table/components/molecules/TableHeader"),
  {
    suspense: true,
    ssr: false
  }
)

const HistoryTable = () => {
  const { setSkip, totalCount, skip, hxHistory, historyIsLoading } =
    useHistoryController()

  // Hooks
  const { pager, hydrated } = useGlobal()
  const { HistoryTableHead, handleClickView } = useHistoryController()
  const { limit, setLimit } = useTable()
  const { t } = useTranslation()

  const roomStatus = (status: TRoomStatus) => {
    switch (status) {
      case "send_noti":
        return "Done"
      case "running":
        return "Running"
      case "end":
        return "End"
      default:
        return "Done"
    }
  }

  return (
    <>
      {hydrated && (
        <div className="mx-auto max-w-[678px]">
          <PageHeader
            title={t("Played History")}
            subtitle={t("history_transactions_desc")}
          />
          {/* sm:w-[380px] */}
          <TableContainer
            className="w-full overflow-x-auto rounded-2xl bg-transparent px-1.5 pb-1.5 pt-4 md:w-[678px]"
            component={Paper}
          >
            <Table className="whitespace-nowrap rounded-2xl border-black-500 bg-neutral-780 p-5 py-1.5 text-neutral-600">
              <TableHeader
                thead={HistoryTableHead}
                gridTemplateColumns="180px 130px 130px 100px 1fr"
              />
              {historyIsLoading ? (
                [...Array(limit)].map(() => (
                  <SkeletonTableWallet key={uuid()} />
                ))
              ) : (
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
                            {row.game_detail.name}
                          </div>,
                          <div
                            key={row._id}
                            className="history--gameType"
                          >
                            {/* //TODO: Refactor this game type */}
                            {row.game_mode === "play-to-earn" ? (
                              <Chip
                                label={row.game_mode
                                  .split("-")
                                  .join(" ")
                                  .split("games")
                                  .join("")}
                                size="small"
                                color="error"
                                className="font-bold"
                              />
                            ) : (
                              <Chip
                                label={row.game_type}
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
                              onClick={() => handleClickView(row)}
                            />
                          </div>
                        ]}
                      />
                    ))
                  ) : (
                    <TableNodata />
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <Box
            component="div"
            className="my-2 flex justify-between md:my-5 md:w-[678px]"
            sx={{
              ".MuiPagination-ul": {
                gap: "5px 0"
              }
            }}
          >
            <PaginationNaka
              totalCount={totalCount}
              limit={limit}
              page={skip}
              setPage={setSkip}
            />
            <DropdownLimit
              className="m-0 w-[160px] flex-row"
              defaultValue={12}
              list={pager}
              onChangeSelect={setLimit}
            />
          </Box>
        </div>
      )}
    </>
  )
}

export default HistoryTable
