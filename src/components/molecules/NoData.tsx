import { Typography } from "@mui/material"
import React from "react"
import { Trans } from "react-i18next"

export interface INoData {
  className?: string
  icon?: React.ReactNode
}

const NoData = ({ className, icon }: INoData) => (
  <div className={`${className}`}>
    {icon}
    <Typography className="rounded-[14px] border border-neutral-800 p-4">
      <Trans i18nKey="no_data_available" />
    </Typography>
  </div>
)

export default NoData
