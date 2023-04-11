import React from "react"
import GameSummaryBody from "@feature/game/containers/components/organisms/GameSummaryBody"
import SkeletonSummaryRaward from "@components/atoms/skeleton/SkeletonSummaryRaward"
import GameSummaryContent from "@components/templates/contents/GameSummaryContent"
import useGameSummaryRewardController from "@feature/game/containers/hooks/useGameSummaryRewardController"
import CardBodyList from "@feature/ranking/components/molecules/CardBodyList"
import useGlobal from "@hooks/useGlobal"
import GameSummaryBodyReturnItem from "@feature/game/containers/components/organisms/GameSummaryBodyReturnItem"
import { useRouter } from "next/router"

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
  const getSummaryValue = () => {
    switch (notificationItem?.type) {
      case "RETURN_ITEM":
      case undefined:
        return summaryDataPlayerId.current_score

      case "REWARD_WEEKLY":
      case "REWARD_GAME_POOL":
        return summaryDataPlayerIdWeekly.reward
      default:
        return (
          summaryDataPlayerId.naka_for_player ||
          summaryDataPlayerId.current_score
        )
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
        <CardBodyList
          className="mx-auto max-h-[680px] w-[362px] flex-1 "
          width="auto"
          players={players || []}
          rewardType={notificationItem?.type}
          // maxPlayer={gameRoomById?.max_players || 0}
        />
        {renderContent()}
      </div>
    </GameSummaryContent>
  ) : (
    <SkeletonSummaryRaward />
  )
}

export default GameSummaryRewardPage
