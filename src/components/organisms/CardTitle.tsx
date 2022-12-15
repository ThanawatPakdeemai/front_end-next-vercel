/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card, CardHeader } from "@mui/material"

interface Iprop {
  width: string
  icon: string | React.ReactNode
  title: string | React.ReactNode
  rightTitle?: React.ReactNode
  background?: "purple" | "red"
}
const CardTitle = ({
  width,
  icon,
  title,
  rightTitle,
  background = "purple"
}: Iprop) => (
  <>
    <Card
      sx={{ maxWidth: width ?? "auto" }}
      className={`card-title-page mb-3 ${
        background === "purple" && "!bg-purple-primary"
      } ${background === "red" && "!bg-red-card"}`}
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
  </>
)

export default memo(CardTitle)
