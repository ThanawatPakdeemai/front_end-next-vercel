import { Typography } from "@mui/material"
import React from "react"
import Helper from "@utils/helper"

interface IProp {
  className?: string
  variant: "naka" | "busd" | "vault"
}

const BalanceVault = ({ className, variant }: IProp) => {
  /* mock data */
  const profile = ["mockupName"]
  const balance: number = 256235
  const busdBalance: number = 466264
  const nakaBalance: number = 1235446

  switch (variant) {
    case "busd":
      return (
        <Typography
          id="amount"
          className={className}
        >
          {profile && busdBalance
            ? Helper.formatNumber(Helper.number4digit(busdBalance))
            : 0}
        </Typography>
      )
    case "vault":
      return (
        <Typography
          id="amount"
          className={className}
        >
          {profile &&
          balance !== 0 &&
          !Number.isNaN(parseFloat(balance.toString()))
            ? Helper.number4digit(balance)
            : 0}
        </Typography>
      )
    case "naka":
      return (
        <Typography
          id="amount"
          className={className}
        >
          {profile && nakaBalance
            ? Helper.formatNumber(Helper.number4digit(nakaBalance))
            : 0}
        </Typography>
      )
    default:
      return null
  }
}
export default BalanceVault
