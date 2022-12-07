import { memo } from "react"

interface IProp {
  index: number
}

const NumberRank = ({ index }: IProp) => (
  <div
    className={`${index === 0 && "bg-red-card"} ${
      index === 1 && "bg-purple-primary"
    } ${index === 2 && "bg-green-card"} ${
      index > 2 && "bg-black-02"
    } text-md font-neue-machina ${
      index > 2 ? "text-white-primary" : "text-black-01"
    } squre-no-player flex h-[58px] w-[58px] items-center justify-center rounded-sm`}
  >
    {index + 1}
  </div>
)

export default memo(NumberRank)
