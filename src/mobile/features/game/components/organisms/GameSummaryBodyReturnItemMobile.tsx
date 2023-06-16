import React from "react"
import _ from "lodash"
import { ISummaryItemUsedProps } from "@feature/game/containers/components/molecules/SummaryItemUsed"
import CardSummaryMain from "@feature/game/containers/components/molecules/CardSummaryMain"
import GameSummaryRewardFooter from "@feature/game/containers/components/templates/GameSummaryRewardFooter"
import SummaryGameData from "@feature/game/containers/components/molecules/SummaryGameData"

interface IGameSummaryBodyReturnItemMobile extends ISummaryItemUsedProps {
  date: string | Date
  gameImage: string
  gameName: string
  gameURLtoShare?: string
}

const GameSummaryBodyReturnItemMobile = ({
  date,
  gameImage,
  gameName,
  ...props
}: IGameSummaryBodyReturnItemMobile) => (
  <div className="flex-[1_1_100%] overflow-hidden">
    <CardSummaryMain
      title="Return Used Item"
      value={props.usedAmount}
      date={date}
    />
    <GameSummaryRewardFooter gameImage={gameImage}>
      <div className="flex max-w-[310px] flex-1 flex-col gap-[10px]">
        <SummaryGameData
          gameName={gameName}
          itemName={props.itemName}
        />
      </div>
    </GameSummaryRewardFooter>
  </div>
)

export default GameSummaryBodyReturnItemMobile
