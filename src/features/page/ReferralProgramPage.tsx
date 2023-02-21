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
import React, { useEffect, useRef, useState } from "react"
import Helper from "@utils/helper"
import DollarIcon from "@components/icons/Referral/DollarIcon"
import FriendsActivitiesIcon from "@components/icons/Referral/FriendsActivitiesIcon"
import ShareIcon from "@components/icons/HowToPlayIcon/ShareIcon"
import IReferrals from "@components/icons/Referrals"
import useGetReferral from "@feature/referral/containers/hook/useGetRefrral"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { borderTableStyle } from "@constants/styleConstants"
// import { v4 as uuid } from "uuid"
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

const ReferralProgramPage = () => {
  const testId = "61bc302f7f8867700b66dd4b"
  const { pager } = useGlobal()
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1)
  const [limitPage, setlimitPage] = useState(12)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [sortName, setSortName] = useState<number | undefined>(undefined)
  const [sortAmount, setSortAmount] = useState<number | undefined>(undefined)
  const [sortTime, setSortTime] = useState<number | undefined>(undefined)

  const fetchRef = useRef(false)
  const profile = useProfileStore((state) => state.profile.data)
  const { successToast } = useToast()
  const { getReferralsData, isPreviousData } = useGetReferral({
    player_id: testId,
    skip: page,
    limit: limitPage
  })
  const baseUrl = CONFIGS.BASE_URL.API
  const url = new URL(baseUrl.toString())
  url.pathname = url.pathname.replace("/api", "")
  const copyClipboard = () => {
    navigator.clipboard.writeText(
      `${url}/register?referral=${profile && profile.id}`
    )
    successToast(MESSAGES.success_get_code)
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
        queryKey: ["getReferralsData", testId],
        queryFn: () =>
          getReferrals({ player_id: testId, skip: page, limit: limitPage })
      })
    }
  }, [page, limitPage, isPreviousData, getReferralsData, queryClient])

  return (
    <>
      <div className="flex">
        <div className="h-fit w-[630px] rounded-3xl border border-solid border-neutral-700 bg-neutral-800 p-2">
          <div className="my-[30px] mr-8 ml-2 grid grid-cols-3">
            <div className="uppercase text-neutral-300">
              <div className="flex">
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
              <div className="ml-[15px] uppercase text-neutral-600">
                {Helper.textWithDots(
                  `${url}/register?referral=${profile && profile.id}`,
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
            className="ml-3 w-[264px]"
            title="Your earnings"
            icon={<DollarIcon />}
          >
            <BoxContent
              padding="p-[14px]"
              title="NAKA"
              total={getReferralsData.data.data.youEarn}
            />
          </CardContent>
        )}
      </div>
      <div className="mt-8 grid w-[630px] grid-cols-3 gap-4">
        {getReferralsData && (
          <CardContent
            className="col-span-2"
            title="Your earnings"
            icon={<IReferrals stroke="#E1E2E2" />}
          >
            <div className="flex gap-2 uppercase">
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

        <div className="flex justify-center self-center">
          <RadarAnimateIcon />
        </div>
      </div>
      <CardContent
        className="mt-8 w-[630px]"
        title="friends Activities"
        icon={<FriendsActivitiesIcon />}
      >
        <TableContainer className="mt-4">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="w-[300px] border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  onClick={() =>
                    setSortName((prev: number | undefined) => {
                      if (prev) {
                        return prev * -1
                      }
                      return -1
                    })
                  }
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>FRIEND’S </p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortName === -1 ? "text-neutral-100" : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortName === 1 ? "text-neutral-100" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-start font-neue-machina-bold text-xs uppercase"
                  onClick={() =>
                    setSortAmount((prev: number | undefined) => {
                      if (prev) {
                        return prev * -1
                      }
                      return -1
                    })
                  }
                >
                  <div className="flex">
                    <div className="flex cursor-pointer">
                      <p>REFERRAL EARNED NAKA</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortAmount === -1 ? "text-neutral-100" : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortAmount === 1 ? "text-neutral-100" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="border-b-0 pt-0 pb-1 text-end font-neue-machina-bold text-xs uppercase"
                  onClick={() =>
                    setSortTime((prev: number | undefined) => {
                      if (prev) {
                        return prev * -1
                      }
                      return -1
                    })
                  }
                >
                  <div className="flex justify-end">
                    <div className="flex cursor-pointer">
                      <p>DATE</p>
                      <div className="ml-1 flex flex-col pt-0.5">
                        <KeyboardArrowUp
                          className={`mb-[-6px] text-sm ${
                            sortTime === -1 ? "text-neutral-100" : ""
                          }`}
                        />
                        <KeyboardArrowDown
                          className={`text-sm ${
                            sortTime === 1 ? "text-neutral-100" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={borderTableStyle}>
              {getReferralsData &&
                getReferralsData.data.data.data_activities.map((referrer) => (
                  <>
                    <TableCell className="w-[300px] rounded-l-2xl border-b-0 bg-primary-main p-1 text-end font-neue-machina-bold text-xs uppercase">
                      <div className="flex items-center">
                        <div className="flex h-[50px] w-[50px] items-center rounded-xl bg-error-main">
                          <div className="w-[50px] text-center font-neue-machina-bold text-2xl text-primary-main">
                            {referrer.username.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-1 flex h-[50px] items-center rounded-xl border border-solid border-neutral-680 bg-neutral-800 px-2">
                          <div className="w-[100px]">{referrer.username}</div>
                          <Chip
                            label={referrer._id}
                            variant="outlined"
                            size="small"
                            className="mx-2 w-[89px] cursor-pointer uppercase"
                          />
                          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-[4px] border border-solid border-neutral-700">
                            <CopyMiniIcon />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className=" border-b-0 bg-primary-main text-end font-neue-machina-bold text-xs uppercase">
                      <div className="text-start text-varidian-default">
                        + {referrer.referral_earn.toFixed(3)}
                      </div>
                    </TableCell>
                    <TableCell className="rounded-r-2xl border-b-0 bg-primary-main text-end font-neue-machina-bold text-xs uppercase">
                      <Chip
                        label={dayjs(referrer.date).format("DD MMM YYYY")}
                        variant="outlined"
                        size="small"
                        className="cursor-pointer uppercase"
                      />
                    </TableCell>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <div className="my-5 flex w-[630px] justify-between">
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
    </>
  )
}

export default ReferralProgramPage
