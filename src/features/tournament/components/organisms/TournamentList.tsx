/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableContainer,
  Chip,
  Box,
  TextField,
  TableCell,
  TableRow,
  TableHead,
  Card,
  Button
} from "@mui/material"
import PaginationNaka from "@components/atoms/pagination/PaginationNaka"
import dayjs from "dayjs"
import useGlobal from "@hooks/useGlobal"
import SearchIcon from "@components/icons/SearchIcon"
import useFilterStore from "@stores/blogFilter"
import { Image } from "@components/atoms/image"
import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import Helper from "@utils/helper"
import { ISortReferrals } from "@feature/referral/interface/IReferralService"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { v4 as uuid } from "uuid"
import DropdownLimit from "@components/atoms/DropdownLimit"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import NoData from "@components/molecules/NoData"

interface IMockData {
  key: string
  date_end: string
  banner_image: string
  banner_image_alt: string
  banner_name: string
  game_type: string
  reward: number
}

const TournamentList = () => {
  const { search: searchBlog, setSearch: setSearchBlog } = useFilterStore()
  const { pager } = useGlobal()
  const { successToast } = useToast()
  const [sortType] = useState<ISortReferrals>({
    sort: undefined,
    sort_value: undefined
  })

  const mockupData: IMockData[] = []
  for (let i = 1; i <= 12; i += 1) {
    mockupData.push({
      key: `0x${i}${`${Math.floor(Math.random() * 10 ** 20)}`.toString()}`,
      date_end: `2014-12-${i} 23:12:00`,
      banner_image: "/images/tounament/Thumbnail_Sqaure.png",
      banner_image_alt: `image-banner-${i}`,
      banner_name: `DesiGner Game-${i}`,
      game_type: "NAKAMOTO WARS",
      reward: 200000 * i
    })
  }

  // const mockupData = [
  //   {
  //     player_id: "61bc302f7f8867700b66dd4b",
  //     skip: 1,
  //     limit: 12,
  //     sort: undefined,
  //     sort_value: undefined
  //   }
  // ]

  const copyClipboard = (id: string) => {
    navigator.clipboard.writeText(id)
    successToast(MESSAGES.copy)
  }

  return (
    <>
      <div className="pt-16 pb-14">
        <div className="h-[10px] w-full rounded-[13px] bg-[url('/images/services/curvy-line.png')]" />
      </div>
      <Box className="mx-auto flex items-center justify-between py-4">
        <p className="text-lg font-bold uppercase">Past tournaments</p>
        <div className="flex max-[390px]:grid">
          <Button
            variant="contained"
            className="mr-4 w-32 rounded-lg !bg-neutral-800 text-sm text-neutral-300"
            endIcon={<KeyboardArrowDownIcon />}
          >
            All Games
          </Button>
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
      </Box>
      <Card className="bg-neutral-780 p-4">
        <TableContainer className="mt-4">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="w-32 border-b-0  pt-0 pb-1 pl-4 text-left font-neue-machina-bold text-xs uppercase"
                  // onClick={() => handleSort("amount")}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>Finished</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortType.sort === "amount" &&
                            sortType.sort_value === 1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortType.sort === "amount" &&
                            sortType.sort_value === -1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="w-64 border-b-0 pt-0 pb-1 text-end font-neue-machina-bold text-xs uppercase"
                  // onClick={() => handleSort("date")}
                >
                  <div className="flex justify-items-start">
                    <div className="flex cursor-pointer">
                      <p>GAME</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortType.sort === "date" &&
                            sortType.sort_value === 1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortType.sort === "date" &&
                            sortType.sort_value === -1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="w-[25.25rem] border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  // onClick={() => handleSort("username")}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>TOTAL PRIZE</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortType.sort === "username" &&
                            sortType.sort_value === 1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortType.sort === "username" &&
                            sortType.sort_value === -1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  // onClick={() => handleSort("username")}
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>Winner 1ST</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortType.sort === "username" &&
                            sortType.sort_value === 1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortType.sort === "username" &&
                            sortType.sort_value === -1
                              ? "text-neutral-100"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockupData && mockupData.length > 0 ? (
                mockupData.map((_elm, _index) => (
                  <TableRow
                    key={uuid()}
                    className="border-b-[6px] bg-primary-main"
                    style={{
                      borderColor: "#1c1c1f"
                    }}
                  >
                    <TableCell
                      className="rounded-[9px] p-1 pr-4 text-center font-neue-machina-bold text-xs uppercase"
                      style={{
                        borderTopLeftRadius: "9px",
                        borderBottomLeftRadius: "9px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px"
                      }}
                    >
                      <Chip
                        label={dayjs(_elm.date_end).format("DD MMM YYYY")}
                        variant="outlined"
                        size="small"
                        className="cursor-pointer uppercase"
                      />
                    </TableCell>
                    <TableCell className="text-left font-neue-machina-bold text-xs uppercase">
                      <div className="text-start text-[12px]">
                        {_elm.game_type}
                      </div>
                    </TableCell>
                    <TableCell className="text-left font-neue-machina-bold text-xs uppercase">
                      {_elm.reward ? Helper.formatNumber(_elm.reward) : 0} naka
                    </TableCell>
                    <TableCell
                      className="rounded-r-2xl p-1 text-center font-neue-machina-bold text-xs uppercase"
                      style={{
                        borderTopLeftRadius: "0px",
                        borderBottomLeftRadius: "0px",
                        borderTopRightRadius: "9px",
                        borderBottomRightRadius: "9px"
                      }}
                    >
                      <div className="ml-2 flex items-center max-[390px]:overflow-x-scroll">
                        <Image
                          src={_elm.banner_image}
                          width={50}
                          height={50}
                          alt={_elm.banner_image_alt}
                          className="rounded-[5px]"
                        />
                        <div className="ml-1 flex h-[50px] items-center rounded-[5px] border border-solid border-neutral-800 bg-neutral-800 px-2">
                          <div className="w-28 text-white-primary">
                            {_elm.banner_name}
                          </div>
                          <Chip
                            label={Helper.textWithDots(_elm.key, 6)}
                            variant="outlined"
                            size="small"
                            className="cursor-pointer uppercase"
                          />
                          <div className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[4px] border border-solid border-neutral-700">
                            <button
                              type="button"
                              className="focus:outline-none"
                              onClick={() => {
                                copyClipboard(_elm.key)
                              }}
                            >
                              <CopyMiniIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="justify-center rounded-lg border border-neutral-800 bg-neutral-700 py-3 text-center"
                  >
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {mockupData && mockupData.length > 0 && (
        <div className="my-5 flex justify-between">
          <PaginationNaka
            totalCount={120}
            limit={12}
            page={1}
            setPage={() => {
              12
            }}
          />
          <DropdownLimit
            defaultValue={12}
            list={pager}
            onChangeSelect={() => {
              12
            }}
          />
        </div>
      )}
    </>
  )
}

export default TournamentList
