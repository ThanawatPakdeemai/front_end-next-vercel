import React, { memo } from "react"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { IGameReward } from "@src/types/games"
import {
  IRewardWeeklyData,
  IWeeklyPoolByGameIdDataRecord
} from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"
import { RewardType } from "@feature/notification/interfaces/INotificationService"
import { IGameCurrentPlayer } from "@feature/game/interfaces/IGameService"
import useProfileStore from "@stores/profileStore"

const NoData = dynamic(() => import("@components/molecules/NoData"), {
  suspense: true,
  ssr: true
})
const NumberRank = dynamic(() => import("../atoms/NumberRank"), {
  suspense: true,
  ssr: true
})
const PlayerList = dynamic(() => import("./PlayerList"), {
  suspense: true,
  ssr: true
})

interface IProp {
  width: string
  players:
    | IPlayerRanking[]
    | IGameReward[]
    | IRewardWeeklyData[]
    | IGameCurrentPlayer[]
    | IWeeklyPoolByGameIdDataRecord[]
  className?: string
  rewardType?: RewardType
}
const CardBodyList = ({ width, players, className, rewardType }: IProp) => {
  const { profile } = useProfileStore()
  const { t } = useTranslation()

  const renderContent = () => {
    // When data is empty
    if (players.length === 0 || !players.length)
      return (
        <Box
          component="div"
          sx={{
            ".no-data__text": {
              border: "1px solid #232329"
            }
          }}
          className="text-center text-white-primary"
        >
          <NoData />
        </Box>
      )

    // When data is not empty
    switch (rewardType) {
      case "REWARD_WEEKLY":
      case "REWARD_GAME_POOL":
        return profile.data ? (
          (players as IRewardWeeklyData[]).map((item, index: number) => (
            <div
              key={item._id}
              className={`!shadow-none w-${width} ${
                index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"
              } !border-1 top-player !mb-3 !rounded-default !border-neutral-900`}
            >
              <div className="flex flex-1 items-center justify-between p-2">
                <NumberRank index={index} />
                <PlayerList
                  index={index}
                  className="mr-[10px] "
                  avatar={item.avatar}
                  username={item.username}
                  reward={item.reward}
                  rate={item.percentRate}
                />
              </div>
            </div>
          ))
        ) : (
          <Typography className="rounded-[14px] border border-neutral-800 p-4 text-center text-default uppercase text-neutral-200">
            {t("please_login")}
          </Typography>
        )

      default:
        return players.map((item, index: number) => (
          <div
            key={item._id}
            className={`w-full max-w-[100%] !shadow-none ${
              index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"
            } !border-1 top-player !rounded-default !border-neutral-900`}
          >
            <div className="flex flex-1 items-center justify-between p-[5px]">
              <NumberRank index={index} />
              <PlayerList
                avatar={item.avatar}
                username={item.username || item.user_name}
                index={index}
                score={item.current_score}
                reward={item.naka_for_player}
                naka_earn={item.naka_earn}
                id={item._id}
              />
            </div>
          </div>
        ))
    }
  }

  return (
    <div
      className={`${className} ${
        players.length > 9
          ? "custom-scroll flex h-full max-h-[375px] flex-col gap-2 overflow-y-scroll pr-4"
          : ""
      }`}
    >
      {renderContent()}
    </div>
  )
}
export default memo(CardBodyList)
