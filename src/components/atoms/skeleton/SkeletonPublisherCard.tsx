import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonPublisherCard = () => (
  <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
    <div className="absolute top-12">
      <Skeleton
        variant="rectangular"
        width={60}
        height={60}
        className="rounded-[50%]"
      />
    </div>
    <div className="absolute top-0 h-16 w-full">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={80}
        className="rounded-t-md"
      />
    </div>

    <Skeleton
      variant="rectangular"
      width="100%"
      height={200}
      className="rounded-md"
    />
  </div>
)

export default memo(SkeletonPublisherCard)
