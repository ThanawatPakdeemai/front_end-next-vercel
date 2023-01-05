import React, { memo } from "react"
import { Card, CardHeader, Divider } from "@mui/material"

interface Iprop {
  width: string
  icon: string | React.ReactNode
  title: string | React.ReactNode
  rightTitle?: React.ReactNode
  background?: "purple" | "red" | "neutral"
  subtitle?: boolean
  elevation?: number
}
const CardTitle = ({
  width,
  icon,
  title,
  rightTitle,
  background = "purple",
  subtitle = false,
  elevation
}: Iprop) => (
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
      <CardHeader
        title={
          <div className="flex items-center">
            <div>{icon}</div>
            <div>{title}</div>
          </div>
        }
        action={rightTitle ?? ""}
      />
    </Card>
    {subtitle ? (
      <>
        <div className="grid grid-cols-8 gap-1 p-4 text-[10px] uppercase">
          <h1 className="col-span-1">Rank</h1>
          <h1 className="col-span-3">Player</h1>
          <h1 className="col-span-2">Prize pool EST. %</h1>
          <h1 className="col-span-2">
            Total naka : <span className="text-info-main"> 300,000</span>
          </h1>
        </div>
        <Divider />
      </>
    ) : (
      <></>
    )}
  </>
)

export default memo(CardTitle)
