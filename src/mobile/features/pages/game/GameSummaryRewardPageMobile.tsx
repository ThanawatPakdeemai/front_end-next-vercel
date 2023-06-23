import React from "react"
import SkeletonSummaryRaward from "@components/atoms/skeleton/SkeletonSummaryRaward"
import useGameSummaryRewardController from "@feature/game/containers/hooks/useGameSummaryRewardController"
import useGlobal from "@hooks/useGlobal"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Image } from "@components/atoms/image/index"
import ClockIcon2 from "@components/icons/ClockIcon2"
import RoomListBox from "@components/molecules/roomList/RoomListBox"
import {
  StylePlayerMobile,
  StyleTimerMobile,
  StyleWaitingRoom
} from "@mobile/styles/muiStyleMobile"
import dayjs from "dayjs"
import GameSummaryBodyMobile from "@feature/game/components/organisms/GameSummaryBodyMobile"
import {
  classesAvatar,
  classesImage,
  classesWrapper
} from "@mobile/features/game/components/molecules/PlayerCardMobile"
import Helper from "@utils/helper"
import ArrowBackIcon from "@mobile/components/atoms/icons/ArrowBackIcon"
import { useRouter } from "next/router"
import useProfileStore from "@stores/profileStore"
import useGameStore from "@stores/game"
import GameSummaryBodyReturnItemMobile from "@mobile/features/game/components/organisms/GameSummaryBodyReturnItemMobile"
import useGlobalControllerMobile from "@mobile/features/game/containers/hooks/useGlobalControllerMobile"

const GameSummaryRewardPageMobile = () => {
  const {
    notificationItem,
    playHistoryItem,
    gameRoomById,
    players,
    totalGameReward,
    summaryDataPlayerId,
    summaryDataPlayerIdWeekly,
    shareURL,
    usedItem,
    gameItemBalance
  } = useGameSummaryRewardController()
  const gameData = useGameStore((state) => state.data)
  const { hydrated } = useGlobal()
  const { t } = useTranslation()
  const router = useRouter()
  const profile = useProfileStore((state) => state.profile.data)
  const { handleClickOpenLoading } = useGlobalControllerMobile()

  const getDateUpdated = () => {
    if (notificationItem) {
      return dayjs(notificationItem.createdAt).format("DD MMM YYYY")
    }
    if (playHistoryItem) {
      return dayjs(playHistoryItem.createdAt).format("DD MMM YYYY")
    }
    return ""
  }

  /**
   * @description get summary value
   * @returns
   */
  const getSummaryValue = () => {
    switch (notificationItem?.type) {
      case "RETURN_ITEM":
      case undefined:
        if (summaryDataPlayerId.naka_for_player) {
          // This code will display when
          // 1. Opened url as /[typeGame]/[GameHome]/summary/[room_id]
          // 2. The game already close room and sent reward
          return summaryDataPlayerId.naka_for_player
        }
        return summaryDataPlayerId.current_score

      case "REWARD_WEEKLY":
      case "REWARD_GAME_POOL":
        return summaryDataPlayerIdWeekly.reward
      default:
        return summaryDataPlayerId.naka_for_player
          ? summaryDataPlayerId.naka_for_player
          : summaryDataPlayerId.current_score
    }
  }

  const renderContent = () => {
    if (!gameData) return <></>

    switch (notificationItem?.type) {
      case "RETURN_ITEM":
        return (
          <GameSummaryBodyReturnItemMobile
            gameImage={gameData?.image_category_list || ""}
            gameName={gameData?.name || ""}
            date={notificationItem?.createdAt || ""}
            itemImage={usedItem.images}
            usedAmount={usedItem.usedAmount}
            itemName={usedItem.name}
            itemAmount={gameItemBalance}
          />
        )

      default:
        return (
          <GameSummaryBodyMobile
            gameData={gameData}
            date={
              notificationItem?.createdAt || playHistoryItem?.createdAt || ""
            }
            gameRaward={totalGameReward || 0}
            gameImage={gameData?.image_category_list || ""}
            gameName={gameData?.name || ""}
            value={getSummaryValue()}
            hash={
              summaryDataPlayerId.tx_address ||
              summaryDataPlayerIdWeekly.transaction_hash ||
              ""
            }
            gameURLtoShare={shareURL}
            title={
              notificationItem?.naka_for_player ||
              summaryDataPlayerId.naka_for_player
                ? "Your reward is"
                : "Your score is"
            }
            itemName={usedItem.name}
            itemImage={usedItem.images}
            usedAmount={usedItem.usedAmount}
            itemAmount={gameItemBalance}
          />
        )
    }
  }

  return hydrated ? (
    <Box
      component="div"
      className="flex min-h-[100vh] flex-col bg-[#121212] p-[0_24px_24px]"
      sx={{
        "h2": {
          lineHeight: "1",
          alignItems: "flex-start"
        }
      }}
    >
      <h2
        className="flex items-center gap-4 py-[30px] font-urbanist text-[24px] font-bold text-white-primary"
        onClick={() => {
          // setOpen("")
          handleClickOpenLoading()
          if (profile && gameData) {
            return router.push(`/${gameData.game_mode}/${gameData.path}`)
          }
          return router.push(`/`)
        }}
        aria-hidden="true"
      >
        <ArrowBackIcon />
        {gameData?.name}
      </h2>
      <Box
        component="section"
        className="game-section flex flex-col gap-6 font-urbanist text-white-primary"
      >
        <Box
          component="section"
          className="game-summary__section flex flex-col gap-6"
          sx={{
            ".react-share__ShareButton > div": {
              width: "45px",
              height: "45px",
              background: "#18181C",
              border: "1px solid #35383F",
              borderRadius: "6px",
              "path": {
                fill: "#ffffff"
              }
            }
          }}
        >
          <div className="game-summary__header flex flex-wrap items-center justify-around gap-2">
            {/* Timer */}
            <Box
              component="div"
              className="section--timer ml-2 flex items-center gap-2"
              sx={StyleTimerMobile}
            >
              <ClockIcon2 />
              <RoomListBox
                type="timer"
                timer={{
                  time: new Date(gameRoomById?.end_time || "")
                }}
                color="green"
                shade="lemon"
              />
            </Box>

            {/* Player Count */}
            <Box
              component="div"
              className="section--players ml-2 flex items-center gap-2"
              sx={StylePlayerMobile}
            >
              <RoomListBox
                type="player"
                player={{
                  currentPlayer: gameRoomById?.amount_current_player || 0,
                  maxPlayer: gameRoomById?.max_players || 0
                }}
                color="green"
                shade="lemon"
              />
            </Box>

            {/* Date Updated */}
            <Box
              component="div"
              className="section--updated ml-2 flex h-[40px] items-center gap-2 text-[#F2C94C]"
              sx={StylePlayerMobile}
            >
              {getDateUpdated()}
            </Box>
          </div>

          {/* Content */}
          {renderContent()}

          {/* Players List */}
          <Box
            component="div"
            className="game-summary__players"
            sx={StyleWaitingRoom}
          >
            <Box
              component="div"
              className="waiting-room__content flex flex-col gap-6"
            >
              <div className="custom-scroll overflow-y-auto">
                <div className="grid w-full grid-cols-4 flex-wrap justify-center gap-3 sm:grid-cols-8">
                  {players ? (
                    players.map((data) => (
                      <div
                        key={data._id}
                        className="flex flex-col gap-2 border-secondary-main"
                      >
                        <div className={`${classesAvatar} border-[#F2C94C]`}>
                          <div className={classesWrapper}>
                            <Image
                              src={Helper.convertAvatar(data.avatar)}
                              alt={data.user_name || data.username}
                              width={70}
                              height={70}
                              className={classesImage}
                            />
                          </div>
                        </div>

                        {/* Player Name */}
                        <div className="player-name">
                          <p className="truncate text-center font-urbanist text-sm font-semibold uppercase text-neutral-300">
                            {data.user_name || data.username}
                          </p>
                        </div>

                        {/* Player Score/Reward */}
                        <div className="player-name">
                          <p className="truncate text-center font-urbanist text-sm font-semibold uppercase text-[#F2C94C]">
                            {Helper.formatNumber(
                              data.current_score ||
                                data.naka_for_player ||
                                data.reward,
                              {
                                maximumFractionDigits: 2
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Typography className="rounded-[14px] border border-neutral-800 p-4 text-center text-default uppercase text-neutral-200">
                      {t("please_login")}
                    </Typography>
                  )}
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <SkeletonSummaryRaward />
  )
}

export default GameSummaryRewardPageMobile
