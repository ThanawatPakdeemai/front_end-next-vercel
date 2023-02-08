import { TStaking } from "@src/types/staking"
import React from "react"

export interface IPeriodLabel {
  days?: number
  className?: string
  type: TStaking
}

const PeriodLabel = ({ days, className, type }: IPeriodLabel) => (
  <div
    className={`flex h-full flex-col items-center justify-center rounded-[10px] bg-neutral-900 p-3 text-center ${
      className || ""
    }`}
  >
    {days && (
      <p className="text-neutral-30 mb-4 overflow-hidden line-clamp-1">
        {days} days
      </p>
    )}
    <p
      className={`w-max rounded ${
        type === "fixed" ? "bg-error-main" : "bg-secondary-main"
      } px-6 py-1 font-neue-machina-bold text-xs text-neutral-900`}
    >
      {type} APR
    </p>
  </div>
)

export default PeriodLabel
