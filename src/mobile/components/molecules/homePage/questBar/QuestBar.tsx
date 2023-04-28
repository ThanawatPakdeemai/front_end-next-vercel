import React from "react"
import { LinearProgress, Typography } from "@mui/material"
import Helper from "@utils/helper"

interface IProps {
  barColor: string
  count: number
  countMax: number
}

const QuestBar = ({ barColor, count, countMax }: IProps) => {
  const percentage = Helper.percentageCalc(count, countMax)

  return (
    <div className="flex h-full w-[150px] flex-row rounded-[13px] bg-neutral-900 ">
      <div className="flex w-[50px] flex-row text-xs font-bold uppercase text-white-default">
        <Typography className={` mr-1 text-xs font-bold uppercase ${barColor}`}>
          {count}
        </Typography>
        <Typography className="mr-1 text-xs font-bold uppercase">
          / {countMax}
        </Typography>
      </div>
      <LinearProgress
        variant="determinate"
        color="error"
        className="mt-[7px] h-[1px] w-[100px] rotate-180 rounded-[2px] bg-neutral-800 "
        value={percentage}
      />
    </div>
  )
}

export default QuestBar
