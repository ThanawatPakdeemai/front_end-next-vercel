import React, { useEffect, useRef, useState } from "react"
import SettingIcon from "@components/icons/SettingIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import TableIcon from "@components/icons/TableIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import {
  Box,
  Card,
  Chip,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { IPlayerInfoResponse, IProfile } from "@src/types/profile"
import { RandomReveal } from "react-random-reveal"
import { CHAR_SET_JP } from "@constants/characterSet"
import dayjs from "dayjs"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import Lavel from "@components/icons/Lavel"
import { Image } from "@components/atoms/image"
import Helper from "@utils/helper"
import { v4 as uuidv4 } from "uuid"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import { motion } from "framer-motion"
import RankIcon from "@feature/playerProfile/components/atoms/RankIcon"
import SearchIcon from "@components/icons/SearchIcon"
import DropdownLimit from "@components/atoms/DropdownLimit"
// import useGlobal from "@hooks/useGlobal"
import { PaginationNaka } from "@components/atoms/pagination"
// import { getPlayerInfoByPlayerId } from "@feature/profile/containers/services/profile.service"
// import { useQueryClient } from "@tanstack/react-query"
import useLoadingStore from "@stores/loading"
import EditProfileModal from "./EditProfileModal"
import SliderBadges from "./SliderBadges"
import SideSocialShare from "../SideSocialShare"
import TotalCardContent from "./TotalCardContent"

const ProfileContent = () => {
  const profile = useProfileStore((state) => state.profile)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<IProfile>()
  const [idPlayer, setIdPlayer] = useState<string>("")
  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const [getProfileInfo, setGetProfileInfo] = useState<IPlayerInfoResponse>()
  // const { hydrated, pager } = useGlobal()
  const [totalCount, setTotalCount] = useState<number>(0)
  const fetchRef = useRef(false)
  // const queryClient = useQueryClient()
  const { setOpen, setClose } = useLoadingStore()

  useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
      setIdPlayer(profile.data.id as string)
    }
  }, [profile])

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

  useEffect(() => {
    if (!fetchRef.current && getProfileInfo && !isFetching) {
      fetchRef.current = true
      setTotalCount(getProfileInfo.data.info.totalCount)
    }
  }, [getProfileInfo, isFetching])

  useEffect(() => {
    if (profileDataFromQuery) {
      setGetProfileInfo(profileDataFromQuery)
    }
  }, [profileDataFromQuery])

  useEffect(() => {
    if (!isPreviousData) {
      setOpen()
      refetchGetProfile().then(() => setClose())
    }
  }, [isPreviousData, page, refetchGetProfile, setClose, setOpen])
  // useEffect(() => {
  //   if (!isPreviousData && getProfileInfo) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["PlayerInfoByPlayerId", page + 1],
  //       queryFn: () =>
  //         getPlayerInfoByPlayerId({
  //           _limit: limit,
  //           _playerId: idPlayer,
  //           _page: page,
  //           _sort: "",
  //           _cheat: "All",
  //           _rewards_send_status: "All"
  //         }).then((res) => {
  //           setGetProfileInfo(res)
  //         })
  //     })
  //     // refetchGetProfile()
  //   }
  // }, [
  //   getProfileInfo,
  //   isPreviousData,
  //   page,
  //   queryClient,
  //   idPlayer,
  //   refetchGetProfile,
  //   limit
  // ])

  // const { response: getProfileInfo } = useGetProfileInfo({
  //   _limit: 20,
  //   _playerId: idPlayer,
  //   _page: 1,
  //   _sort: "",
  //   _cheat: "All",
  //   _rewards_send_status: "All"
  // })

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

  return profileData && getProfileInfo && !isFetching ? (
    <div className="w-[90%]">
      <SideSocialShare />
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
        <div className="absolute top-0 right-0 m-4">
          <ButtonToggleIcon
            handleClick={handleOnExpandClick}
            startIcon={<SettingIcon />}
            text="Edit Profile"
            className="z-[2] h-[50px] w-[148px] bg-neutral-900 font-bold capitalize text-white-default"
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
      </div>
      <div className="relative">
        <Tagline
          className="my-0 mt-4 mb-4"
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
          <div className="absolute bottom-[-50px] z-10 h-[150px] w-[150px] rounded-3xl border-8 border-neutral-900 bg-neutral-700">
            <div
              className="absolute top-[-20px] right-[28px]
    z-20"
            >
              <div className="relative">
                <Lavel className="absolute" />
                <Typography className="absolute flex h-[45px] w-[45px] items-center justify-center p-2 font-digital-7 text-[24px] text-white-default">
                  {profileData.level}
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
          Joined : {dayjs(profileData.createdAt).format("MMM YYYY")}
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="mt-[50px] grid grid-cols-3 gap-4">
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
      <SliderBadges _playerId={profileData.id} />
      {getProfileInfo.data.game_data.map((item, index) => (
        <Card
          key={uuidv4()}
          className="grid grid-cols-3 grid-rows-1 rounded-[18px] "
          sx={{
            backgroundImage: "none",
            backgroundColor: "#010101"
          }}
        >
          <div className="py-10 px-10">
            <NumberRank
              className="m-0 h-6 w-8 !rounded-[4px]"
              index={index + limit * (page - 1)}
            />
            <h1 className="py-5 text-neutral-300">{item.name}</h1>
            <p className=" text-xs text-neutral-500">
              <TooltipsCustom
                className="truncate hover:text-clip"
                placement="bottom"
                title={item.story}
                color="error"
              >
                <div>{item.story}</div>
              </TooltipsCustom>
            </p>
          </div>
          <div className="my-7 mx-10 grid grid-cols-2 grid-rows-2 gap-5">
            <div>
              <p className="text-xs text-neutral-600">RANK</p>
              <Chip
                label={item.rank}
                variant="outlined"
                size="small"
                className="mt-2 cursor-pointer uppercase"
              />
            </div>
            <div>
              <p className="text-xs text-neutral-600">RANK SCORE</p>
              <Chip
                label={Helper.formatNumber(item.rankScore)}
                variant="outlined"
                size="small"
                className="mt-2 cursor-pointer uppercase"
              />
            </div>
            <div>
              <p className="text-xs text-neutral-600">PLAYED</p>
              <Chip
                label={Helper.formatNumber(item.played)}
                variant="outlined"
                size="small"
                className="mt-2 cursor-pointer uppercase"
              />
            </div>
            <div>
              <p className="text-xs text-neutral-600">WINRATE</p>
              <Chip
                label={item.winrate}
                variant="outlined"
                size="small"
                className="mt-2 cursor-pointer uppercase"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image
              className="h-40 w-40 rounded-[15px] object-cover"
              src={item.image}
              alt={item.name}
              width={160}
              height={160}
            />
            <div className="flex h-40 w-40 items-center justify-center rounded-[10px] border-[1px] border-solid border-neutral-700 ">
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 4
                }}
              >
                <RankIcon
                  width={70}
                  height={70}
                  icon={item.rank}
                />
              </motion.div>
            </div>
          </div>
        </Card>
      ))}
      <div className="flex w-full justify-between">
        <PaginationNaka
          totalCount={totalCount}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="flex">
          <TextField
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
          />
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
