import React, { memo } from "react"
import { Card } from "@mui/material"
import { IPlayerRanking } from "@feature/ranking/interfaces/IRanking"
import { IGameReward } from "@src/types/games"
import { IRewardWeeklyData } from "@feature/rewardWeekly/interfaces/IRewardWeeklyService"
import { RewardType } from "@feature/notification/interfaces/INotificationService"
import NumberRank from "../atoms/NumberRank"
import PlayerList from "./PlayerList"

interface IProp {
  width: string
  players: IPlayerRanking[] | IGameReward[] | IRewardWeeklyData[]
  className?: string
  rewardType?: RewardType
}
const CardBodyList = ({ width, players, className, rewardType }: IProp) => {
  const renderContent = () => {
    switch (rewardType) {
      case "REWARD_WEEKLY":
      case "REWARD_GAME_POOL":
        return (players as IRewardWeeklyData[]).map((item, index: number) => (
          <Card
            key={item._id}
            sx={{
              maxWidth: width ?? "auto",
              backgroundImage: "none !important"
            }}
            className={`!shadow-none ${
              index > 2 ? "!bg-neutral-780" : "!bg-neutral-900"
            } !border-1 top-player !mb-3 !rounded-default !border-neutral-900`}
          >
            <div className="flex max-w-[340px] items-center justify-between p-2">
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
          </Card>
        ))

      default:
        return players.map((item, index: number) => (
          <Card
            key={item._id}
            sx={{
              maxWidth: width ?? "auto",
              backgroundImage: "none !important"
            }}
            className={`!shadow-none ${
              index > 2 ? "!bg-neutral-780" : "!bg-neutral-900"
            } !border-1 top-player !mb-3 !rounded-default !border-neutral-900`}
          >
            <div className="flex max-w-[340px] items-center justify-between p-2">
              <NumberRank index={index} />
              <PlayerList
                avatar={item.avatar}
                username={item.username || item.user_name}
                index={index}
                className="mr-[10px]"
                score={item.current_score}
                reward={item.naka_for_player}
              />
            </div>
          </Card>
        ))
    }
  }

  return (
    <div
      className={`${className} ${
        players.length > 9
          ? "custom-scroll h-[375px] overflow-y-scroll pr-4"
          : ""
      }`}
    >
      {renderContent()}
    </div>
  )

  // return (
  //   <div
  //     className={`custom-scroll h-[375px] overflow-y-scroll pr-4 ${className}`}
  //   >
  //     {players.map((item, index: number) => (
  //       <Card
  //         key={item._id}
  //         sx={{ maxWidth: width ?? "auto" }}
  //         className={` ${
  //           index > 2 ? "!bg-neutral-700" : "!bg-neutral-900"
  //         } !border-1 top-player !mb-3 !rounded-default !border-neutral-900 `}
  //       >
  //         <div className=" flex items-center justify-between p-2">
  //           <NumberRank index={index} />
  //           <PlayerList
  //             index={index}
  //             className="mr-[10px] "
  //             avatar={item.avatar}
  //             username={item.username || item.user_name}
  //             reward={item.naka_for_player}
  //             score={item.current_score}
  //           />
  //         </div>
  //       </Card>
  //     ))}
  //   </div>
  // )
}
export default memo(CardBodyList)
