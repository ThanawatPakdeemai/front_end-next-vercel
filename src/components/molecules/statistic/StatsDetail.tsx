import { isMobile } from "@hooks/useGlobal"
import { Typography } from "@mui/material"
import Helper from "@utils/helper"
import React from "react"
import { MobileView } from "react-device-detect"

interface IProp {
  icon: React.ReactNode
  title: string
  amount: number | string
  unit: string
  type: "normal" | "range"
}

const StatsDetail = ({ icon, title, type, amount, unit }: IProp) => (
  <>
    {isMobile ? (
      <MobileView>
        <div className="grid w-full grid-cols-3 items-center gap-2 rounded-2xl bg-neutral-800 p-4 uppercase  text-neutral-500">
          {icon}
          <div className="col-span-2">
            <Typography className="text-[8px] font-bold">{title}</Typography>
            <Typography className="text-default font-bold">
              {type === "normal"
                ? Helper.formatNumber(amount as number)
                : `${amount}`}
            </Typography>
            <Typography className="text-xs font-bold">{unit}</Typography>
          </div>
        </div>
      </MobileView>
    ) : (
      <div className="w-full flex-auto rounded-2xl bg-neutral-800 p-[18px] uppercase text-neutral-500 md:w-[130px]">
        {icon}
        <Typography className="mb-4 text-xs font-bold">{title}</Typography>
        <Typography className="text-default font-bold">
          {type === "normal"
            ? Helper.formatNumber(amount as number)
            : `${amount}`}
        </Typography>
        <Typography className="text-xs font-bold">{unit}</Typography>
      </div>
    )}
  </>
)

export default StatsDetail
