import LockIcon from "@components/icons/LockIcon"
import React from "react"

interface IPeriodDate {
  date?: string
  time?: string
  className?: string
}

const PeriodDate = ({ date, time, className }: IPeriodDate) => (
  <div className={`${className}`}>
    <div className="flex h-full w-full items-center justify-between rounded-[10px] bg-primary-main pl-10 pr-8 font-neue-machina-semi text-[22px]">
      <div className="flex items-center">
        <p className="text-red-card">Staking started</p>
        <p className="mx-3 text-neutral-300">{date || "20 SEB 2023"}</p>
        <p className="text-neutral-600">{time || "08:00 pm"}</p>
      </div>

      <div className=" w-fit rounded-lg border border-neutral-700 bg-neutral-800 p-3">
        <LockIcon />
      </div>
    </div>
  </div>
)

export default PeriodDate
