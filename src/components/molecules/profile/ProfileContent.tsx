/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from "react"
import SettingIcon from "@components/icons/SettingIcon"
import ShapeIcon from "@components/icons/ShapeIcon"
import TableIcon from "@components/icons/TableIcon"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import Tagline from "@components/molecules/tagline/Tagline"
import { Box, Button, Typography } from "@mui/material"
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
import { useTranslation } from "react-i18next"
import { MobileView } from "react-device-detect"
import HeaderForWardBackWardMobile from "@mobile/components/atoms/headerMenu/HeaderForWardBackWardMobile"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ItemRewardIcon from "@components/icons/MenunIcon/ItemRewardIcon"
import BackPackIcon from "@components/icons/BackPackIcon"
import JoinStickIcon from "@components/icons/JoinStickIcon"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import PlugIcon from "@components/icons/MenunIcon/PlugIcon"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import ButtonLink from "@components/atoms/button/ButtonLink"
import Metamask from "@components/atoms/metamask"
import useWalletContoller from "@feature/wallet/containers/hooks/useWalletContoller"
import { useWeb3Provider } from "@providers/index"
import Link from "next/link"
import IReferrals from "@components/icons/Referrals"
// import { Helmet } from "react-helmet"
// import ReactDOM from "react-dom"
// eslint-disable-next-line import/no-extraneous-dependencies
// import Script from "next/script"
import EditProfileModal from "./EditProfileModal"
import SliderBadges from "./SliderBadges"
import SideSocialShare from "../SideSocialShare"
import TotalCardContent from "./TotalCardContent"
import StatProfile from "../statProfile/StatProfile"

const ProfileContent = () => {
  const { onClickLogout } = useGlobal()
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
  // eslint-disable-next-line no-console
  // const responseTelegram = (response: any) => console.log(response)

  const { t } = useTranslation()

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
  const { handleConnectWallet } = useWalletContoller()
  const { hasMetamask, disabledConnectButton } = useWeb3Provider()

  useEffect(() => {
    if (isError) {
      errorToast(MESSAGES.please_login)
      router.push("/")
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

  const MoveTelegramButton = () => {
    const gandalf: any = document.querySelector("#telegram-login-NakaGameBot")
    const list: any = document.querySelector("#login-telegram")
    list.append(gandalf)
    // function onTelegramAuth(params) {
    //   // eslint-disable-next-line no-console
    //   console.log(params)
    // }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      MoveTelegramButton
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  // useEffect(() => {
  //   if (!profile.status) {
  //     router.push("/")
  //     errorToast(MESSAGES.please_login)
  //   }
  // }, [errorToast, profile.status, router])

  // const handleTelegramResponse = () => {
  //   const responseTelegram = (response: TelegramUser) =>
  //     // eslint-disable-next-line no-console
  //     console.log("response", responseTelegram)
  // }

  // eslint-disable-next-line no-undef, react/no-unstable-nested-components
  // const LinkTelegram = () => (
  //   <script
  //     async
  //     src="https://telegram.org/js/telegram-widget.js?22"
  //     data-telegram-login="NakaGameBot"
  //     data-size="large"
  //     data-onauth="onTelegramAuth(user)"
  //     data-request-access="write"
  //   />
  // )

  // const responseTelegram = (user: any) => {
  //   // eslint-disable-next-line no-console
  //   console.log("user", user)
  // }

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
    <>
      {isMobile ? (
        <MobileView>
          <div className="w-full">
            <HeaderForWardBackWardMobile
              label="my_profile"
              onClickBackWard={() => router.back()}
              showForwardIcon={false}
            />
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
            </div>
            <div className="relative">
              <Tagline
                className="!my-2 mb-4 mt-4"
                text={t("simple_tagline")}
                bgColor={
                  platinumCount === 0 ? `bg-neutral-800` : `bg-error-main`
                }
                icon={
                  <ShapeIcon
                    fill={platinumCount === 0 ? `#4E5057` : `#18181C`}
                  />
                }
                textColor={`font-bold text-sm ${
                  platinumCount === 0 ? "text-neutral-600" : "text-neutral-900"
                } `}
                show={false}
              />
              <div className="flex w-full justify-center">
                <div className="absolute bottom-[-50px] z-10 h-[110px] w-[110px] rounded-3xl border-8 border-neutral-900 bg-neutral-700 sm:h-[150px] sm:w-[150px]">
                  <div
                    className="absolute right-[28px] top-[-20px]
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
            <div className="relative flex h-full justify-center">
              <TableIcon className="absolute w-full" />
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
                {t("Joined")} :{" "}
                {dayjs(profileFetched.createdAt).format("MMM YYYY")}
              </Typography>
            </div>
            <Box
              component="div"
              // className="grid place-content-center"
              sx={{
                textAlign: "-webkit-center"
              }}
            >
              {profile && !isMobile && (
                <ButtonLink
                  onClick={handleConnectWallet}
                  text={t("Connect Wallet")}
                  icon={<AccountBalanceWalletIcon />}
                  size="medium"
                  color="secondary"
                  variant="contained"
                  className="my-[1.125rem] h-[50px] w-[293px] justify-between rounded-lg border border-solid border-neutral-700 text-xs uppercase hover:border-secondary-main"
                  disabled={disabledConnectButton}
                />
              )}
              {!hasMetamask && profile && <Metamask />}
              <Link href="/notification">
                <div>
                  <Button
                    variant="contained"
                    className="my-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
                !bg-neutral-800 text-xs uppercase hover:border-secondary-main"
                  >
                    <div className="flex items-center font-neue-machina text-sm font-bold">
                      <span className="absolute left-[15px]">
                        <NotificationsNoneIcon />
                      </span>
                      {t("Notifications")}
                    </div>
                  </Button>
                </div>
              </Link>
              <Link href="/earn-reward">
                <div>
                  <Button
                    variant="contained"
                    className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
                  >
                    <div className="flex items-center font-neue-machina text-sm font-bold">
                      <span className="absolute left-[15px]">
                        <ItemRewardIcon />
                      </span>
                      {t("rewards")}
                    </div>
                  </Button>
                </div>
              </Link>
              <Link href="https://marketplace.naka.im/en/inventory/land">
                <div>
                  <Button
                    variant="contained"
                    className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
                  >
                    <div className="flex items-center font-neue-machina text-sm font-bold">
                      <span className="absolute left-[15px]">
                        <BackPackIcon />
                      </span>
                      {t("Inventory")}
                    </div>
                  </Button>
                </div>
              </Link>
              <Link href="/history">
                <div>
                  <Button
                    variant="contained"
                    className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
                  >
                    <div className="flex items-center font-neue-machina text-sm font-bold">
                      <span className="absolute left-[15px]">
                        <JoinStickIcon />
                      </span>
                      {t("Game Play History")}
                    </div>
                  </Button>
                </div>
              </Link>
              <Link href="/referral">
                <div>
                  <Button
                    variant="contained"
                    className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700
!bg-neutral-800 text-xs uppercase hover:border-secondary-main"
                  >
                    <div className="flex items-center font-neue-machina text-sm font-bold">
                      <span className="absolute left-[15px]">
                        <IReferrals stroke="#E1E2E2" />
                      </span>
                      {t("referral")}
                    </div>
                  </Button>
                </div>
              </Link>

              <Button
                variant="contained"
                className="mb-[1.125rem] h-[50px] w-[293px] rounded-lg border border-solid border-neutral-700 !bg-error-main text-xs uppercase hover:border-secondary-main"
                onClick={() => {
                  onClickLogout()
                  router.push("/login")
                }}
              >
                <div className="flex items-center font-neue-machina text-sm font-bold">
                  <span className="absolute left-[15px]">
                    <PlugIcon />
                  </span>
                  Logout
                </div>
              </Button>
            </Box>
            {profile && (
              <StatProfile
                classNameCardContent="!px-12"
                exp={{
                  level: profile?.level ?? 0,
                  expAmount: profile?.exp,
                  maxExp: profile?.max_exp
                }}
                energy={{
                  staminaPoint: profile?.stamina_point,
                  totalStamina: profile?.total_stamina
                }}
                sx={{
                  maxWidth: 295,
                  minWidth: 265,
                  height: 70
                }}
                type="row"
              />
            )}
          </div>
        </MobileView>
      ) : (
        <div className="login-telegram mt-8 w-full md:mt-0 md:w-[98%] lg:w-[90%]">
          {/* <div className="w-[90%]"> */}
          {/* <button
            className="btn tgme_widget_login_button"
            // eslint-disable-next-line react/jsx-curly-brace-presence
            onClick={() => window?.TWidgetLogin?.auth()}
          >
            <i className="tgme_widget_login_button_icon" />
            Log in with Telegram
          </button> */}
          {/* <div id="login-telegram">
            <Script
              async
              src="https://telegram.org/js/telegram-widget.js?22"
              data-telegram-login="NakaGameBot"
              data-size="large"
              data-onauth="onTelegramAuth(user)"
              data-request-access="write"
              strategy="lazyOnload"
            />
            <Script id="show-banner">
              {`function onTelegramAuth(params) { console.log(params);}`}
            </Script>
          </div> */}
          {/* <ButtonToggleIcon
            handleClick={handleTelegramResponse}
            startIcon={<></>}
            text={t("Link To Telegram")}
            className="z-[2] h-[40px] w-fit bg-secondary-main !text-[8px] font-bold capitalize text-white-default sm:h-[50px] sm:w-[148px] sm:text-sm"
            type="button"
          /> */}

          {/* <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="OdauBot"
          /> */}

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
                    startIcon={<SettingIcon />}
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
                <ShapeIcon fill={platinumCount === 0 ? `#4E5057` : `#18181C`} />
              }
              textColor={`font-bold text-sm ${
                platinumCount === 0 ? "text-neutral-600" : "text-neutral-900"
              } `}
              show={false}
            />
            <div className="flex w-full justify-center">
              <div className="absolute bottom-[-50px] z-10 h-[110px] w-[110px] rounded-3xl border-8 border-neutral-900 bg-neutral-700 sm:h-[150px] sm:w-[150px]">
                <div
                  className="absolute right-[28px] top-[-20px]
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
                  src={Helper.convertAvatar(getProfileInfo.data.avatar)}
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
              {t("Joined")} :{" "}
              {dayjs(profileFetched.createdAt).format("MMM YYYY")}
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
      )}
    </>
  ) : null
}

export default ProfileContent
