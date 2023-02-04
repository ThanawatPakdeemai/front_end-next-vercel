import LockIcon from "@components/icons/LockIcon"
import React from "react"

interface IPeriodDate {
  date: string
  time: string
  className?: string
}

const PeriodDate = ({ date, time, className }: IPeriodDate) => (
  <div className={`${className} whitespace-nowrap`}>
    <div className="flex h-full min-h-[68px] w-full items-center justify-between rounded-[10px] bg-primary-main pl-10 pr-8 font-neue-machina-semi text-lg">
      <div className="flex items-center">
        <p className="text-red-card">Staking started</p>
        <p className="mx-3 text-neutral-300">{date}</p>
        <p className="text-neutral-600">{time}</p>
      </div>

      <div className=" w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3">
        <LockIcon />
      </div>
    </div>
  </div>
)

export default PeriodDate
