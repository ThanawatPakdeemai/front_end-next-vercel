import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  Box,
  TextField
} from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableRowData from "@feature/table/components/molecules/TableRowData"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import DropdownLimit from "@components/atoms/DropdownLimit"
import dayjs from "dayjs"
import useGlobal from "@hooks/useGlobal"
import useTable from "@feature/table/containers/hooks/useTable"
import SearchIcon from "@components/icons/SearchIcon"
import useFilterStore from "@stores/blogFilter"
import useTournamentController from "@feature/tournament/containers/hooks/useTournamentController"
import { Image } from "@components/atoms/image"

const TournamentList = () => {
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { pager } = useGlobal()
  const { limit, setLimit } = useTable()
  const [skip, setSkip] = useState<number>(1)
  const [totalCount] = useState<number>(0)
  const { TournamentTableHeader } = useTournamentController()

  const mockupData = [
    {
      date_end: new Date(),
      game_type: "NAKAMOTO WARS",
      reward: "200,000 NAKA",
      banner_image: "/images/home/table-com.svg",
      name: "OX56419643GGSDF656230348"
    }
  ]

  return (
    <>
      <div className="mx-auto md:w-[908px]">
        <PageHeader title="PAST TOURNAMENT">
          <div className="flex gap-4">
            <DropdownLimit
              className="m-0 w-[160px] flex-row"
              defaultValue={12}
              list={pager}
              onChangeSelect={setLimit}
            />
            <TextField
              value={searchBlog}
              onChange={(event) => {
                let { value } = event.target
                value = value.replace(/[^A-Za-z0-9]/gi, "")
                setSearchBlog(value)
              }}
              placeholder="Search Games..."
              InputProps={{
                startAdornment: <SearchIcon className="mr-4 lg:max-xl:mr-2" />
              }}
              className="w-[182px]"
            />
          </div>
        </PageHeader>

        {/* sm:w-[380px] */}
        <TableContainer
          className="w-full overflow-x-auto rounded-2xl bg-transparent px-1.5 pt-4 pb-1.5 md:w-[908px]"
          component={Paper}
        >
          <Table className="whitespace-nowrap rounded-2xl border-black-500 bg-neutral-780 p-5 py-1.5 text-neutral-600">
            <TableHeader
              thead={TournamentTableHeader}
              gridTemplateColumns="120px 200px 240px 1fr"
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
              {mockupData && mockupData.length > 0 ? (
                mockupData.map((row) => (
                  <TableRowData
                    key={row.name}
                    gridTemplateColumns="120px 200px 240px 1fr"
                    child={[
                      <div
                        key={row.name}
                        className="history--datetime flex items-center"
                      >
                        <Chip
                          label={dayjs(row.date_end).format("DD MMM YYYY")}
                          size="small"
                          color="default"
                          variant="outlined"
                          className="font-bold"
                        />
                      </div>,
                      <div
                        key={row.name}
                        className="history--gameName truncate text-xs text-neutral-300"
                      >
                        {row.game_type}
                      </div>,
                      <div
                        key={row.name}
                        className="history--gameType text-xs text-neutral-300"
                      >
                        {row.reward}
                      </div>,
                      <div
                        key={row.name}
                        className="history--roomStatus"
                      >
                        <div className="flex items-center">
                          <Image
                            src={row.banner_image}
                            width={48}
                            height={48}
                            alt="news image"
                            className="m-auto"
                          />
                          <div className="border-box item-center flex h-[48px] w-[257px] justify-center gap-[10px] rounded-sm border-neutral-800 bg-neutral-800 pl-4 pt-1 uppercase">
                            Designer Game
                            <Box className="border-box text-[10px]rounded-sm  flex h-[20px] w-[99px] content-center overflow-hidden text-ellipsis border-neutral-700 bg-secondary-contrastText">
                              {row.name}
                            </Box>
                          </div>
                        </div>
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
        <Box
          className="my-2 flex justify-between md:my-5 md:w-[908px]"
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
    </>
  )
}

export default TournamentList
