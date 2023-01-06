import BankIcon from "@components/icons/BankIcon"
import ControllerIcon from "@components/icons/ControllerIcon"
import InvestIcon from "@components/icons/Stats/InvestIcon"
import PlayersIcon from "@components/icons/Stats/PlayersIcon"
import RewardIcon from "@components/icons/Stats/RewardIcon"
import { IGameReportService } from "@feature/game/interfaces/IGameService"
import React from "react"
import StatEstimatedProfit from "./StatEstimatedProfit"
import StatsDetail from "./StatsDetail"
import StatWithIcon from "./StatWithIcon"

interface IProp {
  statsGameById: IGameReportService
}

const StatisticGameDetail = ({ statsGameById }: IProp) => (
  <div className="flex h-[424px] flex-col gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-2 md:flex-row">
    <div className="flex flex-col justify-between">
      <StatWithIcon
        icon={<PlayersIcon className="rotate-0" />}
        className="bg-error-main"
        textColor="text-error-main"
        title="player today"
        amount={statsGameById.data.player_number}
        unit="people"
      />
      <StatWithIcon
        icon={<InvestIcon className="rotate-0" />}
        className="bg-secondary-main"
        textColor="text-secondary-main"
        title="invest today"
        amount={statsGameById.data.invest}
        unit="naka"
      />
      <StatWithIcon
        icon={<RewardIcon className="rotate-0" />}
        className="bg-varidian-default"
        textColor="text-varidian-default"
        title="reward today"
        amount={statsGameById.data.reward_naka}
        unit="naka"
      />
    </div>
    <div className="flex w-full flex-col justify-evenly gap-2 md:w-[269px]">
      <div className="flex gap-2">
        <StatsDetail
          icon={<ControllerIcon />}
          title="game per day"
          type="normal"
          amount={statsGameById.data.numnber_game_play}
          unit="games"
        />
        <StatsDetail
          icon={<BankIcon />}
          title="cost per game"
          type="range"
          amount={statsGameById.data.cost_per_game_doller}
          unit={`= ${statsGameById.data.cost_per_game_naka}`}
        />
      </div>
      <StatEstimatedProfit
        minValue={`+${statsGameById.data.profit_potential_min}%`}
        maxValue={`+${statsGameById.data.profit_potential_max}%`}
      />
    </div>
  </div>
)

export default StatisticGameDetail
