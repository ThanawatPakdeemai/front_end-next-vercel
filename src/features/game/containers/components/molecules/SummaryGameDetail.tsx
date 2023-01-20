import React from "react"

interface IProp {
  title: string
  value: string | number
}

const SummaryGameDetail = ({ title, value }: IProp) => (
  <div className="flex w-[260px] border-b border-neutral-800 py-[10px]">
    <span className="flex-1 uppercase text-neutral-500">{title}</span>
    <span className="uppercase text-neutral-300">{value}</span>
  </div>
)

export default SummaryGameDetail
