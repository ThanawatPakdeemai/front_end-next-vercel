import BankIcon from "@components/icons/BankIcon"
import ControllerIcon from "@components/icons/ControllerIcon"
import InvestIcon from "@components/icons/Stats/InvestIcon"
import PlayersIcon from "@components/icons/Stats/PlayersIcon"
import RewardIcon from "@components/icons/Stats/RewardIcon"
import React from "react"
import StatEstimatedProfit from "./StatEstimatedProfit"
import StatsDetail from "./StatsDetail"
import StatWithIcon from "./StatWithIcon"

const StatisticGameDetail = () => (
  <div className="flex h-[424px] flex-col gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-2 md:flex-row">
    <div className="flex flex-col justify-between">
      <StatWithIcon
        icon={<PlayersIcon className="rotate-0" />}
        className="bg-error-main"
        textColor="text-error-main"
        title="player today"
        amount="3345"
        unit="people"
      />
      <StatWithIcon
        icon={<InvestIcon className="rotate-0" />}
        className="bg-secondary-main"
        textColor="text-secondary-main"
        title="invest today"
        amount="876345.867"
        unit="naka"
      />
      <StatWithIcon
        icon={<RewardIcon className="rotate-0" />}
        className="bg-varidian-default"
        textColor="text-varidian-default"
        title="reward today"
        amount="902345.867"
        unit="naka"
      />
    </div>
    <div className="flex w-full flex-col justify-evenly gap-2 md:w-[269px]">
      <div className="flex gap-2">
        <StatsDetail
          icon={<ControllerIcon />}
          title="game per day"
          type="normal"
          amount={3456}
          unit="games"
        />
        <StatsDetail
          icon={<BankIcon />}
          title="cost per game"
          type="range"
          amount={`${2} - ${12}`}
          unit={`= ${0.3} - ${0.5} naka`}
        />
      </div>
      <StatEstimatedProfit
        minValue={`+${10}%`}
        maxValue={`+${456}%`}
      />
    </div>
  </div>
)

export default StatisticGameDetail
