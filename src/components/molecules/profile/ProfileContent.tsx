import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Typography } from "@mui/material"
import { RandomReveal } from "react-random-reveal"
import dayjs from "dayjs"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import FacebookLogin from "react-facebook-login"
import dynamic from "next/dynamic"
import useProfileStore from "@stores/profileStore"
import { IPlayerInfoResponse } from "@src/types/profile"
import { CHAR_SET_JP } from "@constants/characterSet"
import useGetProfileInfo from "@feature/profile/containers/hook/getProfileInfo"
import Helper from "@utils/helper"
import useLoadingStore from "@stores/loading"
import useGetProfileByEmail from "@feature/profile/containers/hook/getProfileByEmail"
import { useToast } from "@feature/toast/containers"
import { MESSAGES } from "@constants/messages"
import CONFIGS from "@configs/index"
import useSyncProfile from "@mobile/features/game/containers/hooks/useSyncProfile"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"

const TelegramWidget = dynamic(
  () => import("@components/atoms/button/TelegramWidget"),
  {
    suspense: true,
    ssr: false
  }
)
const TotalCardContent = dynamic(() => import("./TotalCardContent"), {
  suspense: true,
  ssr: false
})
const SideSocialShare = dynamic(() => import("../SideSocialShare"), {
  suspense: true,
  ssr: false
})
const SliderBadges = dynamic(() => import("./SliderBadges"), {
  suspense: true,
  ssr: false
})
const EditProfileModal = dynamic(() => import("./EditProfileModal"), {
  suspense: true,
  ssr: false
})
const LevelIcon = dynamic(() => import("@components/atoms/svg/LevelIcon"), {
  suspense: true,
  ssr: false
})
const CrumbCustom = dynamic(() => import("@components/atoms/CrumbCustom"), {
  suspense: true,
  ssr: false
})
const GameStatOverview = dynamic(
  () => import("@feature/playerProfile/components/organisms/GameStatOverview"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const ButtonToggleIcon = dynamic(
  () => import("@components/molecules/gameSlide/ButtonToggleIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const DropdownLimit = dynamic(() => import("@components/atoms/DropdownLimit"), {
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
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

const ProfileContent = () => {
  const { profile: pro } = useProfileStore()
  const profile = pro.data
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
  const { t } = useTranslation()
  const { handleSyncTelegramId, handleSyncFacebookId } = useSyncProfile()
  const { isShowSyncTelegram, isShowSyncFacebook } = useGlobalControllerMobile()

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
    let load = false

    if (!load) {
      if (isError) {
        errorToast(MESSAGES.please_login)
        router.push("/")
      }
    }

    return () => {
      load = true
    }
  }, [isError, errorToast, router])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!fetchRef.current && getProfileInfo && !isFetching) {
        fetchRef.current = true
        setTotalCount(getProfileInfo.data.info.totalCount)
      }
    }

    return () => {
      load = true
    }
  }, [getProfileInfo, isFetching])

  useEffect(() => {
    let load = false

    if (!load) {
      if (profileDataFromQuery) {
        setGetProfileInfo(profileDataFromQuery)
        setEmailPlayer(profileDataFromQuery.data.email)
      }
    }

    return () => {
      load = true
    }
  }, [profileDataFromQuery])

  useEffect(() => {
    let load = false

    if (!load) {
      if (!isPreviousData && idPlayer) {
        setOpen()
        refetchGetProfile().then(() => setClose())
      }
    }

    return () => {
      load = true
    }
  }, [idPlayer, isPreviousData, page, refetchGetProfile, setClose, setOpen])

  useEffect(() => {
    let load = false

    if (!load) {
      if (player_id) {
        setIdPlayer(player_id as string)
      }
    }

    return () => {
      load = true
    }
  }, [player_id])

  useEffect(() => {
    let load = false
    if (!load) {
      if (player_id) {
        setIdPlayer(player_id as string)
      }
    }
    return () => {
      load = true
    }
  }, [player_id])

  const handleOnExpandClick = () => {
    setOpenEdit(!openEdit)
  }
  const handleClose = () => setOpenEdit(false)

  const getRankCount = useCallback(
    (rank: string) =>
      (getProfileInfo &&
        getProfileInfo.data.game_data.filter((data) => data.rank === rank)
          .length) ||
      0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getProfileInfo]
  )

  const bronzeCount = getRankCount("bronze")
  const silverCount = getRankCount("silver")
  const platinumCount = getRankCount("platinum")

  return profileFetched && getProfileInfo && !isFetching ? (
    <div className="login-telegram mt-8 w-full md:mt-0 md:w-[98%] lg:w-[90%]">
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
        {profile && profile.id === (player_id as string) && (
          <>
            <div className="absolute right-0 top-0 m-1 sm:m-4">
              <ButtonToggleIcon
                handleClick={handleOnExpandClick}
                startIcon={<Icomoon className="icon-Settings" />}
                text={t("edit_profile")}
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
          className="!my-2 mb-4 mt-4"
          text={t("simple_tagline")}
          bgColor={platinumCount === 0 ? `bg-neutral-800` : `bg-error-main`}
          icon={
            <Icomoon
              className={`icon-require text-${
                platinumCount === 0 ? `#4E5057` : `#18181C`
              }`}
            />
          }
          textColor={`font-bold text-sm ${
            platinumCount === 0 ? "text-neutral-600" : "text-neutral-900"
          } `}
          show={false}
        />
        <div className="flex w-full justify-center">
          <div className="absolute bottom-[-50px] z-10 h-[110px] w-[110px] rounded-3xl border-8 border-neutral-900 bg-neutral-700 sm:h-[150px] sm:w-[150px]">
            <div className="absolute right-[28px] top-[-20px] z-20">
              <div className="relative">
                <LevelIcon className="absolute" />
                <Typography className="absolute flex h-[45px] w-[45px] items-center justify-center p-2 font-digital-7 text-[24px] text-white-default">
                  {profileFetched.level}
                </Typography>
              </div>
            </div>

            {getProfileInfo.data && getProfileInfo.data.avatar ? (
              <Image
                src={Helper.convertAvatar(getProfileInfo.data.avatar)}
                width={150}
                height={150}
                alt="profile-avatar"
                className="absolute !h-full rounded-3xl object-cover object-center"
              />
            ) : (
              <Image
                src="/images/common/no_login_avatar.png"
                width={150}
                height={150}
                alt="profile-avatar"
                className="absolute !h-full rounded-3xl object-cover object-center"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex h-full justify-center">
        {/* <TableIcon className="absolute" /> */}
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
          {t("Joined")} : {dayjs(profileFetched.createdAt).format("MMM YYYY")}
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="mt-[50px] grid  grid-cols-2 gap-4 overflow-x-auto md:grid-cols-3">
          {getProfileInfo && (
            <>
              <TotalCardContent
                text={t("total_matches")}
                totalNumber={getProfileInfo.data.total_game_played}
                rank={false}
              />
              <TotalCardContent
                text={t("total_win_rate")}
                totalNumber={getProfileInfo.data.total_win_rate}
                rank={false}
              />
              <TotalCardContent
                text={t("total_rewards")}
                totalNumber={Helper.number4digit(
                  getProfileInfo.data.total_reward
                )}
                rank={false}
              />
              <TotalCardContent
                text={t("platinum")}
                totalNumber={platinumCount}
                rank
                icon="platinum"
              />
              <TotalCardContent
                text={t("silver")}
                totalNumber={silverCount}
                rank
                icon="silver"
              />
              <TotalCardContent
                text={t("bronze")}
                totalNumber={bronzeCount}
                rank
                icon="bronze"
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {(isShowSyncTelegram() || isShowSyncTelegram()) && (
          <div className="flex">
            <CrumbCustom
              text="Sync account to complete your profile"
              className="mr-4 w-auto cursor-default border border-solid border-neutral-700 p-[20px] text-neutral-400"
            />
          </div>
        )}
        {/* Sync Button */}
        {isShowSyncTelegram() && (
          <TelegramWidget
            dataOnAuth={handleSyncTelegramId}
            botName="NakaGameBot"
          />
        )}
        {isShowSyncFacebook() && (
          <FacebookLogin
            appId={`${CONFIGS.FACEBOOK_APP_ID}`}
            autoLoad={false}
            fields="name,email,picture"
            callback={handleSyncFacebookId}
            cssClass="my-facebook-button-class flex gap-2 items-center h-[50px] rounded-2xl border border-solid border-neutral-690 !bg-neutral-800 px-3"
            icon={<Icomoon className="icon-Facebook" />}
            textButton="Sync with Facebook"
          />
        )}
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
