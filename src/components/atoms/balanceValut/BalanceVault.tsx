import { Typography } from "@mui/material"
import React from "react"
import Helper from "@utils/helper"
import useProfileStore from "@stores/profileStore"
import useWalletStore from "@stores/wallet"

interface IProp {
  className?: string
  variant: "naka" | "busd" | "vault" | string
}

const BalanceVault = ({ className, variant }: IProp) => {
  const profile = useProfileStore((state) => state.profile.data)
  const vaultBalance = useWalletStore((state) => state.vaultBalance)
  const nakaBalance = useWalletStore((state) => state.nakaBalance)
  const busdBalance = useWalletStore((state) => state.busdBalance)

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
      return renderAmount(vaultBalance)
    case "naka":
      return renderAmount(nakaBalance)
    default:
      return null
  }
}

export default BalanceVault
