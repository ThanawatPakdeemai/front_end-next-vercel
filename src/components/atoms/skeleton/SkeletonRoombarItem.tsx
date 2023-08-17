import React, { memo } from "react"
import { Box, Skeleton } from "@mui/material"

const SkeletonRoombarItem = () => (
  <Box
    component="div"
    className="flex flex-col gap-3"
  >
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px] bg-[rgba(0,0,0,0.5)]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px] bg-[rgba(0,0,0,0.5)]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px] bg-[rgba(0,0,0,0.5)]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px] bg-[rgba(0,0,0,0.5)]"
    />
  </Box>
)

export default memo(SkeletonRoombarItem)
