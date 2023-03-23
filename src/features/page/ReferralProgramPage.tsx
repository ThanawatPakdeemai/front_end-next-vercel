import React, { useEffect, useRef, useState } from "react"
import ButtonIcon from "@components/atoms/button/ButtonIcon"
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import Helper from "@utils/helper"
import DollarIcon from "@components/icons/Referral/DollarIcon"
import FriendsActivitiesIcon from "@components/icons/Referral/FriendsActivitiesIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import IReferrals from "@components/icons/Referrals"
import useGetReferral from "@feature/referral/containers/hook/useGetRefrral"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { v4 as uuid } from "uuid"
import dayjs from "dayjs"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import CONFIGS from "@src/configs/index"
import CopyIcon from "@components/icons/CopyIcon"
import CopyMiniIcon from "@components/icons/Referral/CoopyMiniIcon"
import CardContent from "@feature/referral/components/CardContent"
import BoxContent from "@feature/referral/components/molecules/BoxContent"
import RadarAnimateIcon from "@components/icons/Referral/RadarAnimateIcon"
import DropdownLimit from "@components/atoms/DropdownLimit"
import useGlobal from "@hooks/useGlobal"
import { useQueryClient } from "@tanstack/react-query"
import { PaginationNaka } from "@components/atoms/pagination"
import { getReferrals } from "@feature/referral/containers/services/referral.service"
import { ISortReferrals } from "@feature/referral/interface/IReferralService"

const ReferralProgramPage = () => {
  const { hydrated, pager, page, setPage } = useGlobal()
  const queryClient = useQueryClient()
  const [limitPage, setlimitPage] = useState(12)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [sortType, setSortType] = useState<ISortReferrals>({
    sort: undefined,
    sort_value: undefined
  })
  const fetchRef = useRef(false)
  const profile = useProfileStore((state) => state.profile.data)
  const { successToast } = useToast()
  const { getReferralsData, isPreviousData } = useGetReferral({
    // player_id: profile && profile.id ? profile.id : "",
    player_id: "61bc302f7f8867700b66dd4b",
    skip: page,
    limit: limitPage,
    sort: undefined,
    sort_value: undefined
  })
  const baseUrl = CONFIGS.BASE_URL.FRONTEND

  const copyClipboard = () => {
    navigator.clipboard.writeText(
      `${baseUrl}/register?referral=${profile && profile.id}`
    )
    successToast(MESSAGES.copy)
  }

  const copyFriendCode = (friendCode: string) => {
    navigator.clipboard.writeText(friendCode)
    successToast(MESSAGES.copy)
  }

  const handleSort = (type: string) => {
    if (sortType.sort === type) {
      setSortType({
        ...sortType,
        sort_value: sortType.sort_value === 1 ? -1 : 1
      })
    } else {
      setSortType({ sort: type, sort_value: 1 })
    }
  }

  useEffect(() => {
    if (!fetchRef.current && getReferralsData) {
      fetchRef.current = true
      setTotalCount(getReferralsData.data.info.totalCount)
    }
  }, [getReferralsData])

  useEffect(() => {
    if (!isPreviousData && getReferralsData) {
      queryClient.prefetchQuery({
        queryKey: ["getReferralsData", profile && profile.id ? profile.id : ""],
        queryFn: () =>
          getReferrals({
            player_id: profile && profile.id ? profile.id : "",
            skip: page,
            limit: limitPage,
            sort: sortType.sort,
            sort_value: sortType.sort_value
          })
      })
    }
  }, [
    page,
    limitPage,
    isPreviousData,
    getReferralsData,
    queryClient,
    sortType.sort,
    sortType.sort_value,
    profile
  ])

  return (
    <>
      {hydrated && (
        <div className="relative z-10 w-[calc(100%)] px-[10%]">
          <div className="sm:grid md:grid lg:flex">
            <div className="h-fit max-w-[630px] rounded-3xl border border-solid border-neutral-700 bg-neutral-800 p-2">
              <div className="my-[30px] mr-8 ml-2 grid sm:grid md:grid-cols-3 lg:grid-cols-3">
                <div className="uppercase text-neutral-300">
                  <div className="flex pb-4 md:py-0 lg:py-0">
                    <ShareIcon className="mr-4" />
                    <div>Share 2 Earn</div>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-black-default">
                  Sharing is caring. Have your friends sign up and start
                  playing.Earn 3% referral fee on every game your friends play.
                  Enjoy lifetime passive income. Start earning!
                </div>
              </div>
              <div className="relative h-[50px] w-full rounded-2xl border border-solid border-neutral-700 bg-primary-main">
                <div className="ml-[15px] flex h-full items-center">
                  <Chip
                    label="Referral Link"
                    variant="outlined"
                    size="small"
                    className="cursor-pointer uppercase"
                  />
                  <div className="ml-[15px] truncate uppercase text-neutral-600">
                    {Helper.textWithDots(
                      `${baseUrl}/register?referral=${profile && profile.id}`,
                      20
                    )}
                  </div>
                  <ButtonIcon
                    onClick={copyClipboard}
                    className="absolute right-0 m-1 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800"
                    icon={<CopyIcon />}
                  />
                </div>
              </div>
            </div>
            {getReferralsData && (
              <CardContent
                className="mt-4 max-w-[284px] lg:ml-3 lg:mt-0"
                title="Your earnings"
                icon={<DollarIcon />}
              >
                <BoxContent
                  padding="p-[14px]"
                  title="NAKA"
                  total={Helper.formatNumber(
                    getReferralsData.data.data.youEarn,
                    {
                      maximumFractionDigits: 4
                    }
                  )}
                />
              </CardContent>
            )}
          </div>
          <div className="mt-8 grid max-w-[630px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
            {getReferralsData && (
              <CardContent
                className="col-span-2"
                title="My friends info"
                icon={<IReferrals stroke="#E1E2E2" />}
              >
                <div className="gap-2 uppercase sm:grid md:flex lg:flex">
                  <BoxContent
                    textColor="text-secondary-main"
                    title="total friends"
                    total={getReferralsData.data.data.countReferral}
                  />
                  <BoxContent
                    textColor="text-secondary-main"
                    title="Total played games"
                    total={getReferralsData.data.data.gameCountReferralPlay}
                  />
                </div>
              </CardContent>
            )}
            <div className="flex justify-center self-center sm:block md:block lg:block">
              <RadarAnimateIcon />
            </div>
          </div>
          <CardContent
            className="mt-8 max-w-[630px]"
            title="friends Activities"
            icon={<FriendsActivitiesIcon />}
          >
            <TableContainer className="mt-4">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="w-[300px] border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                      onClick={() => handleSort("username")}
                    >
                      <div className="flex">
                        <div className="flex cursor-pointer">
                          <p>FRIEND’S </p>
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
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex">
                        <div className="flex cursor-pointer">
                          <p>REFERRAL EARNED NAKA</p>
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
                      className="border-b-0 pt-0 pb-1 text-end font-neue-machina-bold text-xs uppercase"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex justify-end">
                        <div className="flex cursor-pointer">
                          <p>DATE</p>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getReferralsData &&
                  getReferralsData.data.data.data_activities.length > 0 ? (
                    getReferralsData.data.data.data_activities.map(
                      (referrer) => (
                        <TableRow
                          key={uuid()}
                          className="border-b-[6px] border-neutral-800 bg-primary-main"
                        >
                          <TableCell className="w-[300px] rounded-l-2xl p-1 text-end font-neue-machina-bold text-xs uppercase">
                            <div className="flex items-center">
                              <div className="flex h-[50px] w-[50px] items-center rounded-xl bg-secondary-main">
                                <div className="w-[50px] text-center font-neue-machina-bold text-[16px] text-white-primary">
                                  {referrer.username.charAt(0)}
                                </div>
                              </div>
                              <div className="ml-1 flex h-[50px] items-center rounded-xl border border-solid border-neutral-680 bg-neutral-800 px-2">
                                <div className="w-[100px] text-white-primary">
                                  {referrer.username}
                                </div>
                                <Chip
                                  label={referrer._id}
                                  variant="outlined"
                                  size="small"
                                  className="mx-2 w-[89px] uppercase"
                                  // cursor-pointer
                                  // onClick={() => {
                                  //   copyFriendCode(referrer._id)
                                  // }}
                                />
                                <div className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[4px] border border-solid border-neutral-700">
                                  <button
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={() => {
                                      copyFriendCode(referrer._id)
                                    }}
                                  >
                                    <CopyMiniIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-end font-neue-machina-bold text-xs uppercase">
                            <div className="text-start text-[12px] text-varidian-default">
                              +
                              {Helper.formatNumber(referrer.referral_earn, {
                                maximumFractionDigits: 4
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="rounded-r-2xl text-end font-neue-machina-bold text-xs uppercase">
                            <Chip
                              label={dayjs(referrer.date).format("DD MMM YYYY")}
                              variant="outlined"
                              size="small"
                              className="cursor-pointer uppercase"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="justify-center rounded-lg border border-neutral-800 bg-neutral-700 py-3 text-center"
                      >
                        No Data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          {getReferralsData &&
            getReferralsData.data.data.data_activities.length > 0 && (
              <div className="my-5 flex max-w-[630px] justify-between">
                <PaginationNaka
                  totalCount={totalCount}
                  limit={limitPage}
                  page={page}
                  setPage={setPage}
                />
                <DropdownLimit
                  defaultValue={12}
                  list={pager}
                  onChangeSelect={setlimitPage}
                />
              </div>
            )}
        </div>
      )}
    </>
  )
}

export default ReferralProgramPage
