/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react"
import { Card, CardHeader } from "@mui/material"

interface Iprop {
  width: string
  icon: string | React.ReactNode
  title: string | React.ReactNode
  rightTitle?: React.ReactNode
}
const CardTitle = ({ width, icon, title, rightTitle }: Iprop) => (
  <>
    <Card
      sx={{ maxWidth: width ?? "auto" }}
      className="card-title-page mb-3"
    >
      <CardHeader
        title={
          <div className="flex items-center">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
        }
        action={rightTitle ?? ""}
      />
    </Card>
  </>
)

export default memo(CardTitle)
