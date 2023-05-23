import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonCard = () => (
  <div className="relative h-full w-full flex-1">
    <Skeleton
      variant="rectangular"
      width="100%"
      height={218}
      className="rounded-sm"
    />
    <Skeleton className="mb-0 h-[50px] rounded-sm" />
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="h-[50px] rounded-sm" />
      <Skeleton className="h-[50px] rounded-sm" />
    </div>
  </div>
)

export default memo(SkeletonCard)
