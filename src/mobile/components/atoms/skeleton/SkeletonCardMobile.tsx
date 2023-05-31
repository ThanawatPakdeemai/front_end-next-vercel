import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonCardMobile = () => (
  <div className="relative h-full w-full flex-1">
    <Skeleton
      variant="rectangular"
      width="100%"
      className="rounded-sm pt-[84%]"
    />
    <Skeleton className="mb-0 h-[50px] rounded-sm" />
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="h-[50px] rounded-sm" />
      <Skeleton className="h-[50px] rounded-sm" />
    </div>
  </div>
)

export default memo(SkeletonCardMobile)
