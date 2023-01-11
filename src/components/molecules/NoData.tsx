import { Typography } from "@mui/material"
import React from "react"

export interface INoData {
  className: string
  icon?: React.ReactNode
}

const NoData = ({ className, icon }: INoData) => (
  <div className={`${className}`}>
    {icon}
    <Typography className="mt-4 rounded-[14px] rounded-[14px] border border-neutral-800 p-4">
      No data is currently available.
    </Typography>
  </div>
)

export default NoData
