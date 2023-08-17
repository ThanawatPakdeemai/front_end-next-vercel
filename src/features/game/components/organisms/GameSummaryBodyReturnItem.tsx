import React from "react"
import _ from "lodash"
import dynamic from "next/dynamic"
import { ISummaryItemUsedProps } from "@feature/game/components/molecules/SummaryItemUsed"

const Tagline = dynamic(() => import("@components/molecules/tagline/Tagline"), {
  suspense: true,
  ssr: false
})
const GameSummaryRewardFooter = dynamic(
  () => import("@feature/game/components/templates/GameSummaryRewardFooter"),
  {
    suspense: true,
    ssr: false
  }
)
const SummaryGameAsset = dynamic(
  () => import("@feature/game/components/molecules/SummaryGameData"),
  {
    suspense: true,
    ssr: false
  }
)
const CardSummaryMain = dynamic(
  () => import("@feature/game/components/molecules/CardSummaryMain"),
  {
    suspense: true,
    ssr: false
  }
)
const CardNoReward = dynamic(
  () => import("@feature/game/components/atoms/CardNoReward"),
  {
    suspense: true,
    ssr: false
  }
)

interface IGameSummaryBodyReturnItem extends ISummaryItemUsedProps {
  date: string | Date
  gameImage: string
  gameName: string
  text: string
  gameURLtoShare?: string
}

const GameSummaryBodyReturnItem = ({
  date,
  text,
  gameImage,
  gameName,
  ...props
}: IGameSummaryBodyReturnItem) => (
  <div className="flex-[1_1_100%] overflow-hidden rounded-[14px] bg-neutral-900 sm:flex-[1_1_50%] lg:w-[605px] lg:flex-none">
    <Tagline
      icon={null}
      bgColor="bg-error-main"
      textColor="text-error-contrastText font-bold text-[12px]"
      text={text}
      className="left-[200px] top-10 !my-0 hidden rotate-[30deg] overflow-hidden lg:block"
      show={false}
    />
    <CardSummaryMain
      title="Return Used Item"
      value={props.usedAmount}
      date={date}
    />
    <GameSummaryRewardFooter gameImage={gameImage}>
      <div className="flex max-w-[310px] flex-1 flex-col gap-[10px]">
        <SummaryGameAsset
          gameName={gameName}
          itemName={props.itemName}
        />
        <CardNoReward />
      </div>
    </GameSummaryRewardFooter>
  </div>
)

export default GameSummaryBodyReturnItem
