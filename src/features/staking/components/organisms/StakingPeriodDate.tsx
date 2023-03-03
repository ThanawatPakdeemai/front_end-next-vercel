import { TStaking, TStakingStatus } from "@src/types/staking"
import Link from "next/link"
import React from "react"
import PeriodDate from "../molecules/PeriodDate"
import PeriodLabel from "../molecules/PeriodLabel"

export interface IStakingDate {
  days?: number
  type: TStaking
  datetime: string
  className?: string
  link?: string
  lockStatus: TStakingStatus
}

const StakingPeriodDate = ({
  days,
  type,
  datetime,
  className,
  link,
  lockStatus
}: IStakingDate) => {
  const stakeContent = () => (
    <div
      className={`relative w-full grid-cols-[140px_calc(100%-140px)] items-center rounded-[13px] bg-neutral-800 p-3 font-neue-machina-semi text-[10px] uppercase sm:grid ${className}`}
    >
      <PeriodLabel
        days={days}
        type={type}
      />
      <PeriodDate
        datetime={datetime}
        className="max-sm:mt-3 sm:ml-3"
        lockStatus={lockStatus}
      />
    </div>
  )

  return link ? <Link href={link}>{stakeContent()}</Link> : stakeContent()
}

export default StakingPeriodDate
