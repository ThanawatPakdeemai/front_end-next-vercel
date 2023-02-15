import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonTableWallet = () => (
  <div className="w-full gap-4 px-3">
    <Skeleton
      variant="rectangular"
      className="my-1 w-full rounded-2xl"
      height={50}
    />
  </div>
)

export default memo(SkeletonTableWallet)
