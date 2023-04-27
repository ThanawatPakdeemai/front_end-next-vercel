import React, { memo } from "react"

interface IProp extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  fixColor?: boolean
}

const NumberRank = ({ index, fixColor = true, className }: IProp) => (
  <div
    className={`${index === 0 && "bg-red-card"} ${
      index === 1 && "bg-purple-primary"
    } ${index === 2 && "bg-green-card"} ${
      index > 2 && "bg-neutral-800"
    } text-md font-neue-machina-semi ${
      fixColor ? `${index > 2 ? "text-white-primary" : "text-neutral-900"}` : ""
    } animation-box flex items-center justify-center rounded-sm ${className}`}
  >
    {index + 1}
  </div>
)

export default memo(NumberRank)
