import IconArrowRight from "@components/icons/arrowRightIcon"
import React from "react"

interface IStakingPeriod {
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  est?: number
  className?: string
}

const StakingPeriod = ({
  startDate,
  startTime,
  endDate,
  endTime,
  est,
  className
}: IStakingPeriod) => (
  <div
    className={`flex h-full items-center items-center justify-between rounded-[10px] bg-neutral-900 p-5 text-[13px] ${className}`}
  >
    <p className="flex items-center text-neutral-600">
      Period &nbsp;
      <span className="text-neutral-300">
        {startDate || "20 SEB 2023"} {startTime || "08:00 pm"}
      </span>
      <IconArrowRight
        stroke="#4E5057"
        className="mx-2"
      />
      <span className="text-neutral-300">
        {endDate || "20 SEB 2023"} {endTime || "08:00 pm"}
      </span>
    </p>
    <p className="text-neutral-600">
      Est apr.{" "}
      <span className="text-[15px] text-varidian-default">
        {est || "6,916.02%"}
      </span>
    </p>
  </div>
)

export default StakingPeriod
