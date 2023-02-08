import IconArrowRight from "@components/icons/arrowRightIcon"
import { Skeleton } from "@mui/material"
import { numberWithCommas } from "@src/helpers/addComma"
import { TStaking } from "@src/types/staking"
import React from "react"

interface IStakingPeriod {
  startDatetime: string
  endDatetime: string
  est: number
  className?: string
  type?: TStaking
}

const StakingPeriod = ({
  startDatetime,
  endDatetime,
  est,
  type,
  className
}: IStakingPeriod) => (
  <div
    className={`flex h-full items-center justify-between rounded-[10px] bg-neutral-900 p-5 ${className}`}
  >
    <p className="flex items-center text-neutral-600">
      Period &nbsp;
      {startDatetime !== "00:00:00" ? (
        <span className="text-neutral-300">{startDatetime}</span>
      ) : (
        <Skeleton className="h-[50px] w-[100px] rounded-sm" />
      )}
      <IconArrowRight
        stroke="#4E5057"
        className="mx-2"
      />
      {endDatetime !== "00:00:00" ? (
        <span className="text-neutral-300">{endDatetime}</span>
      ) : (
        <Skeleton className="h-[50px] w-[100px] rounded-sm" />
      )}
    </p>
    <p className="flex items-center text-neutral-600">
      {type === "fixed" ? "Fixed APR." : "Est APR."}
      {est !== -1 ? (
        <span className="ml-3 text-sm text-varidian-default">
          {est ? numberWithCommas(est) : est}%
        </span>
      ) : (
        <Skeleton className="ml-2 h-[50px] w-[100px] rounded-sm" />
      )}
    </p>
  </div>
)

export default StakingPeriod
