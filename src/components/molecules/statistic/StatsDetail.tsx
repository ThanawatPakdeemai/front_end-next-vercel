import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"

interface IProp {
  icon: React.ReactNode
  title: string
  amount: number | string
  unit: string
  type: "normal" | "range"
}

const StatsDetail = ({ icon, title, type, amount, unit }: IProp) => (
  <div className="w-full rounded-2xl bg-neutral-800 p-[18px] uppercase text-neutral-500 md:w-[130px]">
    {icon}
    <Typography className="mb-4 text-xs font-bold">{title}</Typography>
    <Typography className="text-default font-bold">
      {type === "normal" ? Helper.formatNumber(amount as number) : `${amount}`}
    </Typography>
    <Typography className="text-xs font-bold">{unit}</Typography>
  </div>
)

export default StatsDetail
