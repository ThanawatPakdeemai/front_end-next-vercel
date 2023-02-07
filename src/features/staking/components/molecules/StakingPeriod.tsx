import IconArrowRight from "@components/icons/arrowRightIcon"
import { numberWithCommas } from "@src/helpers/addComma"
import { TStaking } from "@src/types/staking"
import React from "react"

interface IStakingPeriod {
  startDatetime: string
  endDatetime: string
  est: number
  className?: string
  type: TStaking
}

const StakingPeriod = ({
  startDatetime,
  endDatetime,
  est,
  type,
  className
}: IStakingPeriod) => (
  <div
    className={`flex h-full items-center justify-between rounded-[10px] bg-neutral-900 p-5 text-[13px] ${className}`}
  >
    <p className="flex items-center text-neutral-600">
      Period &nbsp;
      <span className="text-neutral-300">{startDatetime}</span>
      <IconArrowRight
        stroke="#4E5057"
        className="mx-2"
      />
      <span className="text-neutral-300">{endDatetime}</span>
    </p>
    <p className="text-neutral-600">
      {type === "fixed" ? "Fixed APR." : "Est APR."}
      <span className="ml-3 text-[15px] text-varidian-default">
        {est ? numberWithCommas(est) : est}%
      </span>
    </p>
  </div>
)

export default StakingPeriod
