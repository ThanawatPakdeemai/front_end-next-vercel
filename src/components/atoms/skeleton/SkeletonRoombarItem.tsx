import React, { memo } from "react"
import { Box, Skeleton } from "@mui/material"

const SkeletonRoombarItem = () => (
  <Box
    component="div"
    className="flex flex-col gap-2"
  >
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px]"
    />
    <Skeleton
      variant="rounded"
      className="h-[24px] w-full rounded-[6px]"
    />
  </Box>
)

export default memo(SkeletonRoombarItem)
