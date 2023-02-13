import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonCategoryCard = () => (
  <div className="relative flex h-[324px] w-full justify-center">
    <Skeleton
      variant="rectangular"
      width="100%"
      height="100%"
      className="rounded-md"
    />
    <div className="absolute bottom-[10px] h-16 w-[90%]">
      <Skeleton height={70} />
    </div>
  </div>
)

export default memo(SkeletonCategoryCard)
