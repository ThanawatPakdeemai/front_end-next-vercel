import React from "react"
import PeriodDate from "../molecules/PeriodDate"
import PeriodLabel from "../molecules/PeriodLabel"

export interface IStakingDate {
  days?: number
  label: string
  date: string
  time: string
  className?: string
  onClick?: () => void
}

const StakingPeriodDate = ({
  days,
  label,
  date,
  time,
  className,
  onClick
}: IStakingDate) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative grid w-full grid-cols-[140px_calc(100%-140px)] items-center rounded-[13px] bg-neutral-800 p-3 uppercase ${className}`}
  >
    <PeriodLabel
      days={days}
      label={label}
    />
    <PeriodDate
      date={date}
      time={time}
      className="ml-3"
    />
  </button>
)

export default StakingPeriodDate
