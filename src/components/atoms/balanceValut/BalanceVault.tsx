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

  const renderAmount = (amount: number) => (
    <Typography
      id="amount"
      className={className}
    >
      {profile && amount ? Helper.formatNumber(Helper.number4digit(amount)) : 0}
    </Typography>
  )

  switch (variant) {
    case "busd":
      return renderAmount(busdBalance)
    case "vault":
      return renderAmount(balance)
    case "naka":
      return renderAmount(nakaBalance)
    default:
      return null
  }
}

export default BalanceVault
