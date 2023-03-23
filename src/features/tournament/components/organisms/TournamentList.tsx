import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  Box,
  TextField,
  TableCell
} from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import TableHeader from "@feature/table/components/molecules/TableHeader"
import PageHeader from "@feature/table/components/molecules/PageHeader"
import TableNodata from "@feature/transaction/components/atoms/TableNodata"
import DropdownLimit from "@components/atoms/DropdownLimit"
import dayjs from "dayjs"
import useGlobal from "@hooks/useGlobal"
import useTable from "@feature/table/containers/hooks/useTable"
import SearchIcon from "@components/icons/SearchIcon"
import useFilterStore from "@stores/blogFilter"
import useTournamentController from "@feature/tournament/containers/hooks/useTournamentController"
import { Image } from "@components/atoms/image"
import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import Helper from "@utils/helper"

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
      user: "Designer Game",
      id: "OX5641964230348"
    }
  ]

  // function copyFriendCode(id:string) {
  //   throw new Error("Function not implemented.")
  // }

  // function textWithDots(id: string): React.ReactNode {
  //   throw new Error("Function not implemented.")
  // }

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
            // sx={{
            //   display: "block",
            //   borderRadius: "5px",
            //   overflow: "hidden",
            //   "tr:last-of-type td": { borderBottom: 0 }
            // }}
            // className="uppercase"
            >
              {mockupData && mockupData.length > 0 ? (
                mockupData.map((row) => (
                  // <TableRow
                  //   key={row.id}
                  //   // gridTemplateColumns="120px 200px 240px 1fr"
                  //   className="border-b-[6px] border-neutral-800 bg-primary-main"
                  // >
                  <div
                    key={row.id}
                    className="rounded-xl border-b-[6px] border-neutral-800 bg-primary-main"
                  >
                    <TableCell className="rounded-r-2xl text-end font-neue-machina-bold text-xs uppercase">
                      <Chip
                        label={dayjs(row.date_end).format("DD MMM YYYY")}
                        size="small"
                        color="default"
                        variant="outlined"
                        className="text-sm font-bold"
                      />
                    </TableCell>
                    <TableCell className="rounded-r-2xl text-end font-neue-machina text-xs uppercase">
                      <div className="flex w-[165px] items-center text-white-primary">
                        {row.game_type}
                      </div>
                    </TableCell>
                    <TableCell className="rounded-r-2xl text-end font-neue-machina text-xs uppercase">
                      <div className="flex w-[200px] items-center text-white-primary">
                        {row.reward}
                      </div>
                    </TableCell>
                    <TableCell className="w-[320px] rounded-r-2xl p-1 font-neue-machina text-xs uppercase">
                      <div className="flex items-center">
                        <Image
                          src={row.banner_image}
                          width={48}
                          height={48}
                          alt="news image"
                          className="m-auto"
                        />
                        <div className="ml-1 flex h-[50px] w-[259px] items-center rounded-[4px] border border-solid border-neutral-680 bg-neutral-800 px-2">
                          <div className="flex w-[100px] items-center text-white-primary">
                            {row.user}
                          </div>
                          <div
                            className="mx-2 flex
                            h-[20px] w-[99px] items-center justify-center rounded-[4px] border border-solid bg-secondary-contrastText text-xs uppercase"
                          >
                            {Helper.shortenString(row.id)}
                          </div>
                          <div className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[4px] border border-solid border-neutral-700">
                            <button
                              type="button"
                              className="focus:outline-none"
                              // onClick={() => {
                              //   copyFriendCode(row.id)
                              // }}
                            >
                              <CopyMiniIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </div>
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
