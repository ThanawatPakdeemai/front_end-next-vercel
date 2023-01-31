import React from "react"

interface IPeriodLabel {
  days: number
  label: string
  className?: string
}

const PeriodLabel = ({ days, label, className }: IPeriodLabel) => (
  <div className={`rounded-[10px] bg-neutral-900 p-5 ${className}`}>
    <p className="text-neutral-300">{days || 180} days</p>
    <p className="mt-4 w-max rounded bg-red-card px-6 py-1 font-neue-machina-bold text-[14px] text-neutral-900">
      {label}
    </p>
  </div>
)

export default PeriodLabel
