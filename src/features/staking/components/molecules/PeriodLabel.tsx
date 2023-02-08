import { Skeleton } from "@mui/material"
import { TStaking } from "@src/types/staking"
import React from "react"

export interface IPeriodLabel {
  days?: number
  className?: string
  type?: TStaking
}

const PeriodLabel = ({ days, className, type }: IPeriodLabel) => (
  <div
    className={`flex h-full flex-col items-center justify-center rounded-[10px] bg-neutral-900 p-3 text-center ${
      className || ""
    }`}
  >
    {(days && days !== -1) || days === undefined ? (
      <>
        {days !== undefined && (
          <p className="text-neutral-30 mb-4 overflow-hidden text-sm line-clamp-1">
            {days} days
          </p>
        )}

        <p
          className={`w-max rounded ${
            type === "fixed" ? "bg-error-main" : "bg-secondary-main"
          } px-6 py-1 font-neue-machina-bold text-neutral-900`}
        >
          {type} APR
        </p>
      </>
    ) : (
      <Skeleton className="mb-4 h-[100px] w-full rounded-sm" />
    )}
  </div>
)

export default PeriodLabel
