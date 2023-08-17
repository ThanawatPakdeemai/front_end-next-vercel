import React from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { IGameReportService } from "@feature/game/interfaces/IGameService"
import { isMobile } from "@hooks/useGlobal"

const RewardIcon = dynamic(
  () => import("@components/atoms/svg/Stats/RewardIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const InvestIcon = dynamic(
  () => import("@components/atoms/svg/Stats/InvestIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const PlayersIcon = dynamic(
  () => import("@components/atoms/svg/Stats/PlayersIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const StatEstimatedProfit = dynamic(
  () => import("@components/molecules/statistic/StatEstimatedProfit"),
  {
    suspense: true,
    ssr: false
  }
)
const StatsDetail = dynamic(
  () => import("@components/molecules/statistic/StatsDetail"),
  {
    suspense: true,
    ssr: false
  }
)
const StatWithIcon = dynamic(
  () => import("@components/molecules/statistic/StatWithIcon"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IProp {
  statsGameById?: IGameReportService
}

const StatisticGameDetail = ({ statsGameById }: IProp) => {
  const { t } = useTranslation()
  return isMobile ? (
    <div className="flex flex-col gap-10 p-2 md:flex-row xl:flex-none">
      <div className="flex flex-auto flex-col justify-between gap-2 md:gap-0">
        <StatWithIcon
          icon={<PlayersIcon className="h-10 w-10 rotate-0" />}
          className="bg-error-main"
          textColor="text-error-main"
          title={t("players_today")}
          amount={statsGameById?.data.player_number || 0}
          unit={t("people")}
          classNameDiv="!border-0"
        />
        <StatWithIcon
          icon={<InvestIcon className="h-10 w-10 rotate-0" />}
          className="bg-secondary-main"
          textColor="text-secondary-main"
          title={t("invest_today")}
          amount={statsGameById?.data.invest || 0}
          unit="naka"
          classNameDiv="!border-0"
        />
        <StatWithIcon
          icon={<RewardIcon className="h-10 w-10 rotate-0" />}
          className="bg-varidian-default"
          textColor="text-varidian-default"
          title={t("reward_today")}
          amount={statsGameById?.data.reward_naka || 0}
          unit="naka"
          classNameDiv="!border-0"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-[1_1_calc(100%-240px)] flex-col gap-2 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-2 md:flex-row lg:h-[424px] xl:flex-none">
      <div className="xs:max-w-[300px] flex flex-auto flex-col justify-between gap-2 md:gap-0">
        <StatWithIcon
          icon={<PlayersIcon className="rotate-0" />}
          className="bg-error-main"
          textColor="text-error-main"
          title={t("players_today")}
          amount={statsGameById?.data.player_number || 0}
          unit={t("people")}
        />
        <StatWithIcon
          icon={<InvestIcon className="rotate-0" />}
          className="bg-secondary-main"
          textColor="text-secondary-main"
          title={t("invest_today")}
          amount={statsGameById?.data.invest || 0}
          unit="naka"
        />
        <StatWithIcon
          icon={<RewardIcon className="rotate-0" />}
          className="bg-varidian-default"
          textColor="text-varidian-default"
          title={t("reward_today")}
          amount={statsGameById?.data.reward_naka || 0}
          unit="naka"
        />
      </div>
      <div className="flex w-full flex-auto flex-col justify-evenly gap-2 md:w-[269px]">
        <div className="flex gap-2">
          <StatsDetail
            icon={<Icomoon className="icon-Joystick" />}
            title={t("games_per_day")}
            type="normal"
            amount={statsGameById?.data.numnber_game_play || 0}
            unit={t("Games")}
          />
          <StatsDetail
            icon={<Icomoon className="icon-ATM-Dollar" />}
            title={t("costs_per_game")}
            type="range"
            amount={statsGameById?.data.cost_per_game_doller || 0}
            unit={`= ${statsGameById?.data.cost_per_game_naka || 0}`}
          />
        </div>
        <StatEstimatedProfit
          minValue={`+${statsGameById?.data.profit_potential_min || 0}%`}
          maxValue={`+${statsGameById?.data.profit_potential_max || 0}%`}
        />
      </div>
    </div>
  )
}

export default StatisticGameDetail
