import React, { memo } from "react"

interface IProp extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  fixColor?: boolean
}

const NumberRank = ({ index, fixColor = true, className }: IProp) => (
  <div
    className={`${index === 0 ? "bg-red-card !text-neutral-800" : ""} ${
      index === 1 ? "bg-purple-primary !text-neutral-800" : ""
    } ${index === 2 ? "bg-green-card !text-neutral-800" : ""} ${
      index > 2 ? "border-[2px] bg-neutral-800" : ""
    } text-md font-neue-machina-semi ${
      fixColor ? `${index > 2 ? "text-white-primary" : "text-neutral-900"}` : ""
    } ${className} animation-box flex items-center justify-center rounded-sm border-neutral-700`}
  >
    {index + 1}
  </div>
)

export default memo(NumberRank)
