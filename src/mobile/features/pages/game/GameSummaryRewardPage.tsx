import React from "react"
import SkeletonSummaryRaward from "@components/atoms/skeleton/SkeletonSummaryRaward"
import useGameSummaryRewardController from "@feature/game/containers/hooks/useGameSummaryRewardController"
import useGlobal from "@hooks/useGlobal"
import GameSummaryBodyReturnItem from "@feature/game/containers/components/organisms/GameSummaryBodyReturnItem"
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
import { IGameReward } from "@src/types/games"

const GameSummaryRewardPage = () => {
  const {
    notificationItem,
    playHistoryItem,
    gameRoomById,
    players,
    totalGameReward,
    gameDataState,
    summaryDataPlayerId,
    summaryDataPlayerIdWeekly,
    shareURL,
    usedItem,
    gameItemBalance
  } = useGameSummaryRewardController()
  const { hydrated } = useGlobal()
  const { t } = useTranslation()

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
    switch (notificationItem?.type) {
      case "RETURN_ITEM":
        return (
          <GameSummaryBodyReturnItem
            text={notificationItem.detail}
            gameImage={gameDataState?.image_category_list || ""}
            gameName={gameDataState?.name || ""}
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
            date={
              notificationItem?.createdAt || playHistoryItem?.createdAt || ""
            }
            gameRaward={totalGameReward || 0}
            gameImage={gameDataState?.image_category_list || ""}
            gameName={gameDataState?.name || ""}
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
                (players as IGameReward[]).map((data) => (
                  <div
                    key={data._id}
                    className="flex flex-col gap-2 border-secondary-main"
                  >
                    <div className={`${classesAvatar} border-[#F2C94C]`}>
                      <div className={classesWrapper}>
                        <Image
                          src={data.avatar}
                          alt={data.user_name}
                          width={70}
                          height={70}
                          className={classesImage}
                        />
                      </div>
                    </div>

                    {/* Player Name */}
                    <div className="player-name">
                      <p className="truncate text-center font-urbanist text-sm font-semibold uppercase text-neutral-300">
                        {data.user_name}
                      </p>
                    </div>

                    {/* Player Score/Reward */}
                    <div className="player-name">
                      <p className="truncate text-center font-urbanist text-sm font-semibold uppercase text-[#F2C94C]">
                        {data.current_score || data.naka_for_player}
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
  ) : (
    <SkeletonSummaryRaward />
  )
}

export default GameSummaryRewardPage