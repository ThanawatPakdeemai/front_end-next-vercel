import GaugeCustom from "@components/atoms/GaugeCustom"
import React from "react"

interface IProp {
  value: number
  maxValue?: number
}

const GaugeStats = ({ value, maxValue }: IProp) => (
  <div className="flex h-[70px] justify-center lg:justify-start">
    <div className="mr-2 flex w-[70px] items-center justify-center rounded-lg border-[1px] border-neutral-700 border-opacity-80">
      <GaugeCustom
        value={value}
        maxValue={maxValue}
      />
    </div>
    <span className="flex h-full w-[108px] flex-1 items-center justify-center rounded-lg bg-neutral-700 text-[14px] text-neutral-300">
      {value} %
    </span>
  </div>
)

export default GaugeStats
