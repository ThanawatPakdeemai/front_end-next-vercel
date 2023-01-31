import React from "react"
import PeriodDate from "../molecules/PeriodDate"
import PeriodLabel from "../molecules/PeriodLabel"

export interface IStakingDate {
  days?: number
  label: string
  date?: string
  time?: string
  className?: string
}

const StakingPeriodDate = ({
  days,
  label,
  date,
  time,
  className
}: IStakingDate) => (
  <div
    className={`relative flex w-full flex-row rounded-[13px] bg-neutral-800 p-3 uppercase ${className}`}
  >
    <PeriodLabel
      days={days || 180}
      label={label}
    />
    <PeriodDate
      date={date}
      time={time}
      className="ml-3 w-full"
    />
  </div>
)

export default StakingPeriodDate
