import { Typography } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import React from "react"

interface IProp {
  minValue: number | string
  maxValue: number | string
}

const StatEstimatedProfit = ({ minValue, maxValue }: IProp) => (
  <div className="flex h-[264px] flex-col gap-2 rounded-2xl bg-neutral-800 p-2 uppercase text-neutral-500">
    <div className="flex flex-col items-center justify-center rounded-lg bg-neutral-700 py-6">
      <TrendingUpIcon
        color="success"
        className="h-6 w-6"
      />
      <Typography className="mt-3 whitespace-pre-wrap text-center text-default font-bold text-neutral-300">
        potential profit{"\n"}per game
      </Typography>
    </div>
    <div className="flex gap-2">
      <div className="flex h-[87px] w-full flex-col justify-center rounded-lg border-[1px] border-varidian-default text-varidian-default md:w-[130px]">
        <Typography className="mb-[10px] text-center text-xs font-bold">
          min
        </Typography>
        <Typography className="text-center text-default font-bold">
          {minValue}
        </Typography>
      </div>
      <div className="flex h-[87px] w-full flex-col justify-center rounded-lg bg-varidian-default text-primary-main md:w-[130px]">
        <Typography className="mb-[10px] text-center text-xs font-bold">
          max
        </Typography>
        <Typography className="text-center text-default font-bold">
          {maxValue}
        </Typography>
      </div>
    </div>
    <Typography className="mt-2 text-center text-xs font-bold text-neutral-600">
      Estimated profit
    </Typography>
  </div>
)

export default StatEstimatedProfit
