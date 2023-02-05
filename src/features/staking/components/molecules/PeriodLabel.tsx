import React from "react"

export interface IPeriodLabel {
  days?: number
  label: string
  className?: string
}

const PeriodLabel = ({ days, label, className }: IPeriodLabel) => (
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
    <p className="w-max rounded bg-red-card px-6 py-1 font-neue-machina-bold text-xs text-neutral-900">
      {label} APR
    </p>
  </div>
)

export default PeriodLabel
