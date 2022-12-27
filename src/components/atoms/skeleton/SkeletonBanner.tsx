import { Skeleton } from "@mui/material"
import React from "react"

const SkeletonBanner = () => (
  <div className="relativew flex h-[468px] w-full items-center justify-center gap-4">
    <Skeleton
      variant="rectangular"
      className="h-full w-full max-w-[1016px] rounded-2xl"
    />
    <div className="flex h-full w-[338px] flex-col gap-y-2">
      <Skeleton
        variant="rectangular"
        height={350}
        className="w-full rounded-2xl"
      />
      <Skeleton
        variant="rectangular"
        height={112}
        className="w-full rounded-2xl"
      />
    </div>
  </div>
)

export default SkeletonBanner
