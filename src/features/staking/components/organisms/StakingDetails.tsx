import React from "react"
import { IStakingAll } from "@src/types/staking"
import PeriodLabel from "../molecules/PeriodLabel"
import StakingTitle from "../atoms/StakingTitle"
import TotalStaked from "../molecules/TotalStaked"
import StakingPeriod from "../molecules/StakingPeriod"
import NumberBadge from "../atoms/NumberBadge"
import ActionBar from "../molecules/ActionBar"

export interface IStakingDetails {
  dataStaking: IStakingAll
  className?: string
}

const StakingDetails = ({ dataStaking, className = "" }: IStakingDetails) => (
  <div className={`${className}`}>
    <StakingTitle title={dataStaking.title} />
    <div className="grid grid-flow-row-dense grid-cols-4 gap-3 rounded-[13px] bg-neutral-800 p-3 uppercase">
      <div className="row-span-2 rounded-lg shadow-xl">
        <PeriodLabel
          days={30}
          label={dataStaking.type}
          className="h-full"
        />
      </div>
      <div className="col-span-3 shadow-xl">
        <TotalStaked />
      </div>
      <div className="col-span-3 shadow-xl">
        <StakingPeriod />
      </div>
      <div className="col-span-2 shadow-xl">
        <NumberBadge
          title="Your NAKA Staked"
          color="red"
        />
      </div>
      <div className="col-span-2 shadow-xl">
        <NumberBadge
          title="Your rewards Unclaimed"
          color="purple"
        />
      </div>
    </div>

    <ActionBar
      label="Redemption date"
      date="20 SEB 2023"
      time="08:00 pm"
      textColor="purple"
      className="flex w-full justify-end"
    />
  </div>
)

export default StakingDetails
