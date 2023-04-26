/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from "react"
import GameSummaryBody from "@feature/game/containers/components/organisms/GameSummaryBody"
import SkeletonSummaryRaward from "@components/atoms/skeleton/SkeletonSummaryRaward"
import GameSummaryContent from "@components/templates/contents/GameSummaryContent"
import useGameSummaryRewardController from "@feature/game/containers/hooks/useGameSummaryRewardController"
import CardBodyList from "@feature/ranking/components/molecules/CardBodyList"
import useGlobal from "@hooks/useGlobal"
import GameSummaryBodyReturnItem from "@feature/game/containers/components/organisms/GameSummaryBodyReturnItem"
import { useRouter } from "next/router"
import { BrowserView, MobileView } from "react-device-detect"
import { Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Image from "next/image"

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
  const router = useRouter()
  const { t } = useTranslation()

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
          <GameSummaryBody
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

  const link = router.asPath.includes("summary")
    ? `${router?.asPath?.split("summary")[0]}roomlist`
    : "/"

  return hydrated ? (
    <GameSummaryContent
      roomTag={gameRoomById?.room_number || summaryDataPlayerId.id_room || ""}
      roomName={gameRoomById?.room_number || summaryDataPlayerId.id_room || ""}
      timer={{
        time: new Date(gameRoomById?.end_time || "")
      }}
      player={{
        currentPlayer: gameRoomById?.amount_current_player || 0,
        maxPlayer: gameRoomById?.max_players || 0
      }}
      onOutRoom={() => router.push(link)}
    >
      <div className="flex w-full flex-col justify-center gap-4 lg:flex-row">
        <BrowserView>
          <CardBodyList
            className="mx-auto max-h-[680px] w-[362px] flex-1 "
            width="auto"
            players={players || []}
            rewardType={notificationItem?.type}
            // maxPlayer={gameRoomById?.max_players || 0}
          />
        </BrowserView>
        {renderContent()}
        <MobileView>
          <div className="grid grid-cols-2 gap-2">
            {players ? (
              players.map((data, index) => (
                <div
                  className="flex items-center justify-between rounded-sm bg-[#151515] p-2 text-xs"
                  key={index}
                >
                  <div
                    className={`rounded-sm px-[14px] py-[12px] text-xs text-white-default ${
                      index === 0
                        ? "bg-red-card text-black-100"
                        : index === 1
                        ? "bg-secondary-main"
                        : index === 2
                        ? "bg-varidian-default  text-black-100"
                        : "bg-[#404040]"
                    }`}
                  >
                    <p>{index + 1}</p>
                  </div>
                  <div className="mx-2 flex flex-col items-center justify-center text-[8px] text-white-default">
                    <p>NAKAMOTO 0{index}</p>
                    <p
                      className={`rounded-[6px] border p-2  uppercase ${
                        index === 0
                          ? "border-red-card"
                          : index === 1
                          ? "border-secondary-main"
                          : index === 2
                          ? "border-varidian-default"
                          : "border-[#404040]"
                      }`}
                    >
                      SCPRE {data.current_score}
                    </p>
                  </div>
                  <Image
                    src={data.avatar}
                    width="20"
                    height="20"
                    alt={data.user_name}
                    className="h-[40px] w-[40px] rounded-sm "
                  />
                </div>
              ))
            ) : (
              <Typography className="rounded-[14px] border border-neutral-800 p-4 text-center text-default uppercase text-neutral-200">
                {t("please_login")}
              </Typography>
            )}
          </div>
        </MobileView>
      </div>
    </GameSummaryContent>
  ) : (
    <SkeletonSummaryRaward />
  )
}

export default GameSummaryRewardPage
