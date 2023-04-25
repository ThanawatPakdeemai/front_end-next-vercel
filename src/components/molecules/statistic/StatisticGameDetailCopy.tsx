import React from "react"
import InvestIcon from "@components/icons/Stats/InvestIcon"
import PlayersIcon from "@components/icons/Stats/PlayersIcon"
import RewardIcon from "@components/icons/Stats/RewardIcon"
import { IGameReportService } from "@feature/game/interfaces/IGameService"
import { useTranslation } from "react-i18next"
import StatWithIconCopy from "./StatWithIconCopy"

interface IProp {
  statsGameById?: IGameReportService
}

// FIXME Boy: เดี๋ยวกลับมาทำ ขอเอาขึ้นก่อน

const StatisticGameDetailCopy = ({ statsGameById }: IProp) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="flex flex-col gap-10 p-2 md:flex-row xl:flex-none">
        <div className="flex flex-auto flex-col justify-between gap-2 md:gap-0">
          <StatWithIconCopy
            icon={<PlayersIcon className="h-10 w-10 rotate-0" />}
            className="bg-error-main"
            textColor="text-error-main"
            title={t("players_today")}
            amount={statsGameById?.data.player_number || 0}
            unit={t("people")}
          />
          <StatWithIconCopy
            icon={<InvestIcon className="h-10 w-10 rotate-0" />}
            className="bg-secondary-main"
            textColor="text-secondary-main"
            title={t("invest_today")}
            amount={statsGameById?.data.invest || 0}
            unit="naka"
          />
          <StatWithIconCopy
            icon={<RewardIcon className="h-10 w-10 rotate-0" />}
            className="bg-varidian-default"
            textColor="text-varidian-default"
            title={t("reward_today")}
            amount={statsGameById?.data.reward_naka || 0}
            unit="naka"
          />
        </div>
      </div>
    </>
  )
}

export default StatisticGameDetailCopy
