import IconArrowRight from "@components/icons/arrowRightIcon"
import { Skeleton } from "@mui/material"
import { numberWithCommas } from "@src/helpers/addComma"
import { TStaking } from "@src/types/staking"
import React from "react"
import { useTranslation } from "react-i18next"

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
}: IStakingPeriod) => {
  const { t } = useTranslation()
  return (
    <div
      className={`h-full items-center justify-between rounded-[10px] bg-neutral-900 py-5 sm:flex sm:px-3 md:p-5 ${className}`}
    >
      <p className="flex items-center text-neutral-600 max-sm:justify-center">
        {t("period")} &nbsp;
        {startDatetime !== "00:00:00" ? (
          <span className="text-neutral-300 max-sm:text-end">
            {startDatetime}
          </span>
        ) : (
          <Skeleton className="h-[15px] w-[100px] rounded-sm sm:h-[50px]" />
        )}
        <IconArrowRight
          stroke="#4E5057"
          className="mx-2"
        />
        {endDatetime !== "00:00:00" ? (
          <span className="text-neutral-300">{endDatetime}</span>
        ) : (
          <Skeleton className="h-[18px] w-[100px] rounded-sm sm:h-[50px]" />
        )}
      </p>
      <p className="flex items-center text-neutral-600 max-sm:mt-1 max-sm:justify-center">
        {type === "fixed" ? "Fixed APR." : "Est APR."}
        {est !== -1 ? (
          <span className="ml-3 text-sm text-varidian-default">
            {est ? numberWithCommas(est) : est}%
          </span>
        ) : (
          <Skeleton className="ml-2 h-[18px] w-[100px] rounded-sm sm:h-[50px]" />
        )}
      </p>
    </div>
  )
}

export default StakingPeriod
