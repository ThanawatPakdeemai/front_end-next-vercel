import React, { useEffect, useState } from "react"
import SettingIcon from "@components/icons/SettingIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import TableIcon from "@components/icons/TableIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { Box, Typography } from "@mui/material"
import useProfileStore from "@stores/profileStore"
import { IProfile } from "@src/types/profile"
import { RandomReveal } from "react-random-reveal"
import { CHAR_SET_JP } from "@constants/characterSet"
import dayjs from "dayjs"
import Image from "next/image"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import Lavel from "@components/icons/Lavel"
// import useGetBadge from "@feature/badge/containers/hook/useGetBadge"
import EditProfileModal from "./EditProfileModal"
import TotalCardContent from "./TotalCardContent"
import SliderBadges from "./SliderBadges"

const ProfileContent = () => {
  const profile = useProfileStore((state) => state.profile)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<IProfile>()
  const [idPlayer, setIdPlayer] = useState<string>("")

  useEffect(() => {
    if (profile && profile.data) {
      setProfileData(profile.data as IProfile)
      setIdPlayer(profile.data.id as string)
    }
  }, [profile])

  const { getProfileInfo, refetchGetProfile, isFetching } = useGetProfileInfo({
    _limit: 20,
    _playerId: idPlayer,
    _page: 1,
    _sort: "id"
  })

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
    <div>
      <div className="relative">
        {/* <div className="h-[148px] rounded-xl bg-neutral-700">
          <ProfileBanner />
          <Image
            src="/images/common/profile_banner.svg"
            alt="123"
            fill
            objectFit="contain"
          />
        </div> */}
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
              fill
              alt="profile-avatar"
              className="absolute rounded-3xl"
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
                totalNumber={getProfileInfo.data.total_reward}
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
    </div>
  ) : null
}

export default ProfileContent
