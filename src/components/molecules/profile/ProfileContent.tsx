import React, { useEffect, useRef, useState } from "react"
import SettingIcon from "@components/icons/SettingIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import TableIcon from "@components/icons/TableIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { Box, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { IPlayerInfoResponse } from "@src/types/profile"
import { RandomReveal } from "react-random-reveal"
import { CHAR_SET_JP } from "@constants/characterSet"
import dayjs from "dayjs"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import Lavel from "@components/icons/Lavel"
import { Image } from "@components/atoms/image"
import Helper from "@utils/helper"
import { v4 as uuidv4 } from "uuid"
import DropdownLimit from "@components/atoms/DropdownLimit"
// import useGlobal from "@hooks/useGlobal"
import { PaginationNaka } from "@components/atoms/pagination"
import useLoadingStore from "@stores/loading"
import GameStatOverview from "@feature/playerProfile/components/organisms/GameStatOverview"
import { useRouter } from "next/router"
import useGetProfileByEmail from "@feature/profile/containers/hook/getProfileByEmail"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import EditProfileModal from "./EditProfileModal"
import SliderBadges from "./SliderBadges"
import SideSocialShare from "../SideSocialShare"
import TotalCardContent from "./TotalCardContent"

const ProfileContent = () => {
  const { profile } = useProfileStore()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [idPlayer, setIdPlayer] = useState<string>("")
  const [emailPlayer, setEmailPlayer] = useState<string>("")
  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const [getProfileInfo, setGetProfileInfo] = useState<IPlayerInfoResponse>()
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  const { setOpen, setClose } = useLoadingStore()
  const router = useRouter()
  const { errorToast } = useToast()
  const { player_id } = router.query

  const {
    getProfileInfo: profileDataFromQuery,
    refetchGetProfile,
    isPreviousData,
    isFetching
  } = useGetProfileInfo({
    _limit: limit,
    _playerId: idPlayer,
    _page: page,
    _sort: "",
    _cheat: "All",
    _rewards_send_status: "All"
  })

  const { profile: profileFetched, isError } = useGetProfileByEmail(emailPlayer)

  useEffect(() => {
    if (isError) {
      errorToast(MESSAGES.please_login)
      router.push("/")
    }
  }, [isError, errorToast, router])

  useEffect(() => {
    if (!fetchRef.current && getProfileInfo && !isFetching) {
      fetchRef.current = true
      setTotalCount(getProfileInfo.data.info.totalCount)
    }
  }, [getProfileInfo, isFetching])

  useEffect(() => {
    if (profileDataFromQuery) {
      setGetProfileInfo(profileDataFromQuery)
      setEmailPlayer(profileDataFromQuery.data.email)
    }
  }, [profileDataFromQuery])

  useEffect(() => {
    if (!isPreviousData && idPlayer) {
      setOpen()
      refetchGetProfile().then(() => setClose())
    }
  }, [idPlayer, isPreviousData, page, refetchGetProfile, setClose, setOpen])

  useEffect(() => {
    if (player_id) {
      setIdPlayer(player_id as string)
    }
  }, [player_id])

  // useEffect(() => {
  //   if (!profile.status) {
  //     router.push("/")
  //     errorToast(MESSAGES.please_login)
  //   }
  // }, [errorToast, profile.status, router])

  const handleOnExpandClick = () => {
    setOpenEdit(!openEdit)
  }
  const handleClose = () => setOpenEdit(false)

  const getRankCount = (rank: string) =>
    (getProfileInfo &&
      getProfileInfo.data.game_data.filter((data) => data.rank === rank)
        .length) ||
    0
  const bronzeCount = getRankCount("bronze")
  const silverCount = getRankCount("silver")
  const platinumCount = getRankCount("platinum")

  return profileFetched && getProfileInfo && !isFetching ? (
    <div className="mt-8 w-full md:mt-0 md:w-[98%] lg:w-[90%]">
      {/* <div className="w-[90%]"> */}
      <SideSocialShare hidden="hidden lg:block" />
      <div className="relative">
        <Box
          component="img"
          sx={{
            height: "100%",
            width: "100%"
          }}
          alt="The house from the offer."
          src="/images/common/profile_banner.svg"
        />
        {profile &&
          profile.data &&
          profile.data.id === (player_id as string) && (
            <>
              <div className="absolute top-0 right-0 m-1 sm:m-4">
                <ButtonToggleIcon
                  handleClick={handleOnExpandClick}
                  startIcon={<SettingIcon />}
                  text="Edit Profile"
                  className="z-[2] h-[40px] w-fit bg-neutral-900 !text-[8px] font-bold capitalize text-white-default sm:h-[50px] sm:w-[148px] sm:text-sm"
                  type="button"
                />
              </div>
              <EditProfileModal
                onRefetchProfile={refetchGetProfile}
                handleClose={handleClose}
                showModal={handleOnExpandClick}
                openEdit={openEdit}
                platinumCount={platinumCount}
                userName={getProfileInfo.data.username}
                userImage={getProfileInfo.data.avatar}
              />
            </>
          )}
      </div>
      <div className="relative">
        <Tagline
          className="!my-2 mt-4 mb-4"
          text="Nakamoto.Games - Secue. fun. simple. earn $naka AND enjoy"
          bgColor={platinumCount === 0 ? `bg-neutral-800` : `bg-error-main`}
          icon={
            <ShapeIcon fill={platinumCount === 0 ? `#4E5057` : `#18181C`} />
          }
          textColor={`font-bold text-sm ${
            platinumCount === 0 ? "text-neutral-600" : "text-neutral-900"
          } `}
        />
        <div className="flex w-full justify-center">
          <div className="absolute bottom-[-50px] z-10 h-[110px] w-[110px] rounded-3xl border-8 border-neutral-900 bg-neutral-700 sm:h-[150px] sm:w-[150px]">
            <div
              className="absolute top-[-20px] right-[28px]
   z-20"
            >
              <div className="relative">
                <Lavel className="absolute" />
                <Typography className="absolute flex h-[45px] w-[45px] items-center justify-center p-2 font-digital-7 text-[24px] text-white-default">
                  {profileFetched.level}
                </Typography>
              </div>
            </div>

            <Image
              src={getProfileInfo.data.avatar}
              width={150}
              height={150}
              alt="profile-avatar"
              className="absolute !h-full rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="flex h-full justify-center">
        <TableIcon className="absolute" />
      </div>
      <div className="mt-[50px] flex w-full justify-center">
        <Typography className="font-mondwest text-[46px] uppercase  text-error-main shadow-error-main drop-shadow-xl">
          {getProfileInfo && (
            <RandomReveal
              isPlaying
              duration={0.1}
              revealDuration={1}
              characters={getProfileInfo.data.username}
              onComplete={() => ({ shouldRepeat: true, delay: 6 })}
              characterSet={CHAR_SET_JP}
            />
          )}
        </Typography>
      </div>
      <div className="flex w-full justify-center">
        <Typography className="text-xs font-bold uppercase text-error-main">
          Joined : {dayjs(profileFetched.createdAt).format("MMM YYYY")}
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="mt-[50px] grid  grid-cols-2 gap-4 overflow-x-auto md:grid-cols-3">
          {getProfileInfo && (
            <>
              <TotalCardContent
                text="Total Matches"
                totalNumber={getProfileInfo.data.total_game_played}
                rank={false}
              />
              <TotalCardContent
                text="Total Win rate"
                totalNumber={getProfileInfo.data.total_win_rate}
                rank={false}
              />
              <TotalCardContent
                text="Total rewards (naka)"
                totalNumber={Helper.number4digit(
                  getProfileInfo.data.total_reward
                )}
                rank={false}
              />
              <TotalCardContent
                text="Platinum"
                totalNumber={platinumCount}
                rank
                icon="platinum"
              />
              <TotalCardContent
                text="Silver"
                totalNumber={silverCount}
                rank
                icon="silver"
              />
              <TotalCardContent
                text="Bronze"
                totalNumber={bronzeCount}
                rank
                icon="bronze"
              />
            </>
          )}
        </div>
      </div>
      <SliderBadges _playerId={profileFetched.id} />
      <GameStatOverview
        key={uuidv4()}
        data={getProfileInfo}
        limit={limit}
        page={page}
      />
      <div className="flex w-full justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="flex">
          {/* <TextField
           sx={{
             input: {
               "&[type=text]": {
                 paddingLeft: "15px"
               }
             }
           }}
           placeholder="Search Game..."
           size="medium"
           InputProps={{
             endAdornment: (
               <InputAdornment position="end">
                 <SearchIcon />
               </InputAdornment>
             )
           }}
         /> */}
          <DropdownLimit
            className="ml-2"
            defaultValue={limit}
            list={[20, 40, 80]}
            onChangeSelect={setLimit}
          />
        </div>
      </div>
    </div>
  ) : null
}

export default ProfileContent
