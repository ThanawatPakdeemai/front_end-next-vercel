import React, { memo } from "react"
import { Card, CardHeader, Divider } from "@mui/material"
// import Dropdown from "@components/atoms/DropdownCustom"
import Helper from "@utils/helper"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

interface Iprop {
  width: string
  icon: string | React.ReactNode
  title: string | React.ReactNode
  rightTitle?: React.ReactNode
  background?: "purple" | "red" | "neutral"
  subtitle?: boolean
  elevation?: number
  sumTotal: number
}
const CardTitle = ({
  width,
  icon,
  title,
  rightTitle,
  background = "purple",
  subtitle = false,
  elevation,
  sumTotal
}: Iprop) => {
  const week = dayjs().startOf("week")

  const formattedWeek = week.format("DD MMM YYYY")
  const formattedEndWeek = week.endOf("week").format("DD MMM YYYY")

  return (
    <>
      <Card
        elevation={elevation}
        sx={{ maxWidth: width ?? "auto" }}
        className={`card-title-page mb-3 ${
          background === "purple" && "!bg-purple-primary"
        } ${background === "red" && "!bg-red-card"}
       ${background === "neutral" && "!bg-neutral-800"}
      `}
      >
        {subtitle ? (
          <>
            <div className="flex justify-between rounded-2xl bg-neutral-800 p-4">
              <div className="uppercase">
                <h1 className="col-span-2 text-[14px]">
                  weekly prize pool :{" "}
                  <span className="text-info-main">
                    {Helper.formatNumber(sumTotal, {
                      maximumFractionDigits: 2
                    })}{" "}
                    naka
                  </span>
                </h1>
                <h1 className="pt-2 text-[10px] text-neutral-600">
                  {formattedWeek} - {formattedEndWeek}
                </h1>
              </div>
              <div>
                {/* may be wait for weekly pool */}
                {/* <Dropdown
                  title="Currently Week"
                  className=""
                /> */}
              </div>
            </div>
          </>
        ) : (
          <CardHeader
            title={
              <div className="flex items-center">
                <div>{icon}</div>
                <div>{title}</div>
              </div>
            }
            action={rightTitle ?? ""}
          />
        )}
      </Card>
      {subtitle ? (
        <>
          <div className="grid grid-cols-8 gap-1 p-4 text-[10px] uppercase">
            <h1 className="col-span-1">Rank</h1>
            <h1 className="col-span-3">Player</h1>
            <h1 className="col-span-2">Prize pool EST. %</h1>
            <h1 className="col-span-2">
              Total naka :{" "}
              <span className="text-info-main">
                {Helper.formatNumber(sumTotal, { maximumFractionDigits: 2 })}
              </span>
            </h1>
          </div>
          <Divider />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default memo(CardTitle)
