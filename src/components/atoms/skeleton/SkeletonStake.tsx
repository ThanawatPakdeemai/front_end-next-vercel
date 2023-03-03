import NumberBadge from "@feature/staking/components/atoms/NumberBadge"
import PeriodLabel from "@feature/staking/components/molecules/PeriodLabel"
import StakingPeriod from "@feature/staking/components/molecules/StakingPeriod"
import TotalStaked from "@feature/staking/components/molecules/TotalStaked"
import { t } from "i18next"
import React from "react"

const SkeletonStake = () => (
  <div className="grid grid-flow-row-dense grid-cols-1 gap-3 rounded-[13px] bg-neutral-800 p-3 uppercase sm:grid-cols-4">
    <div className="row-span-2 rounded-lg shadow-xl">
      <PeriodLabel
        days={-1}
        className="h-full"
      />
    </div>
    <div className="sm-max:row-span-2 shadow-xl sm:col-span-3">
      <TotalStaked
        totalPoolStake={-1}
        poolLimit={-1}
      />
    </div>
    <div className="shadow-xl sm:col-span-3">
      <StakingPeriod
        startDatetime="00:00:00"
        endDatetime="00:00:00"
        est={-1}
      />
    </div>
    <div className="shadow-xl sm:col-span-2">
      <NumberBadge
        title={t("your_naka_staked")}
        color="red"
        value={-1}
      />
    </div>
    <div className="shadow-xl sm:col-span-2">
      <NumberBadge
        title={t("your_naka_unclaimed")}
        color="purple"
        value={-1}
      />
    </div>
  </div>
)

export default SkeletonStake
