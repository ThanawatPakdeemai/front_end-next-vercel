import React from "react"
import _ from "lodash"
import { ISummaryItemUsedProps } from "@feature/game/components/molecules/SummaryItemUsed"
import dynamic from "next/dynamic"

const CardSummaryMain = dynamic(
  () => import("@feature/game/components/molecules/CardSummaryMain"),
  {
    suspense: true,
    ssr: true
  }
)

const GameSummaryRewardFooter = dynamic(
  () => import("@feature/game/components/templates/GameSummaryRewardFooter"),
  {
    suspense: true,
    ssr: true
  }
)

const SummaryGameData = dynamic(
  () => import("@feature/game/components/molecules/SummaryGameData"),
  {
    suspense: true,
    ssr: true
  }
)

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
