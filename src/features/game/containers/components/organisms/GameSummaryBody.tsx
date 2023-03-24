import Tagline from "@components/molecules/tagline/Tagline"
import React from "react"
import dayjs from "dayjs"
import _ from "lodash"
import SummaryItemUsed, {
  ISummaryItemUsedProps
} from "../molecules/SummaryItemUsed"
import CardSummaryMain from "../molecules/CardSummaryMain"
import GameSummaryRewardFooter from "../templates/GameSummaryRewardFooter"
import SummaryGameData from "../molecules/SummaryGameData"
import CardSummaryReward from "../molecules/CardSummaryReward"
import CardNoReward from "../atoms/CardNoReward"

interface IProp extends ISummaryItemUsedProps {
  date: string | Date
  gameRaward: number
  gameImage: string
  gameName: string
  gameURLtoShare: string
  value: number
  hash: string
  title: string
}

const GameSummaryBody = ({
  date,
  gameRaward,
  gameImage,
  gameName,
  gameURLtoShare,
  value,
  hash,
  title,
  ...props
}: IProp) => (
  <div className="flex-[1_1_100%] overflow-hidden rounded-[14px] bg-neutral-900 sm:flex-[1_1_50%] lg:w-[605px] lg:flex-none">
    <Tagline
      icon={null}
      bgColor="bg-error-main"
      textColor="text-error-contrastText font-bold text-[12px]"
      text="Thanks for playing Nanamoto.games with us. It was a lot of fun!"
      className="left-[200px] top-10 !my-0 hidden rotate-[30deg] overflow-hidden lg:block"
    />
    <CardSummaryMain
      value={value}
      date={dayjs(date).format("DD MMM YYYY")}
      gameName={gameName}
      gameURLtoShare={gameURLtoShare}
      title={title}
    />

    {props.usedAmount && props.usedAmount > 0 ? (
      <SummaryItemUsed
        usedAmount={props.usedAmount}
        itemAmount={props.itemAmount}
        itemName={props.itemName}
        itemImage={props.itemImage}
      />
    ) : null}

    <GameSummaryRewardFooter gameImage={gameImage}>
      <div className="flex max-w-[310px] flex-1 flex-col gap-[10px]">
        <SummaryGameData
          gameName={gameName}
          gameRaward={gameRaward}
          itemName={props.itemName}
        />
        {hash ? (
          <CardSummaryReward
            myReward={value}
            hash={hash}
          />
        ) : (
          <CardNoReward />
        )}
      </div>
    </GameSummaryRewardFooter>
  </div>
)

export default GameSummaryBody
