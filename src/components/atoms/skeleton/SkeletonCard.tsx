import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonCard = () => (
  <div className="relative h-[282px] w-[218px]">
    <Skeleton
      variant="rectangular"
      width={218}
      height={218}
      className="rounded-md"
    />
    <Skeleton />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton />
      <Skeleton />
    </div>
  </div>
)

export default memo(SkeletonCard)
