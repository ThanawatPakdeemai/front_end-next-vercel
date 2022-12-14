import { memo } from "react"

interface IProp {
  index: number
}

const NumberRank = ({ index }: IProp) => (
  <div
    className={`${index === 0 && "bg-red-card"} ${
      index === 1 && "bg-purple-primary"
    } ${index === 2 && "bg-green-card"} ${
      index > 2 && "bg-grey-A100"
    } text-md font-neue-machina ${
      index > 2 ? "text-white-primary" : "text-grey-A200"
    } animation-box flex items-center justify-center rounded-sm`}
  >
    {index + 1}
  </div>
)

export default memo(NumberRank)