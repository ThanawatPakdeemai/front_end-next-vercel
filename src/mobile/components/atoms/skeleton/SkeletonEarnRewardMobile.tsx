import { Box, Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonEarnRewardMobile = () => (
  <Box
    component="div"
    sx={{
      "& .MuiSkeleton-root": {
        transform: "none !important"
      }
    }}
    className="relative flex items-center gap-6"
  >
    <Skeleton
      variant="rectangular"
      width="100%"
      className="w-24 flex-1 rounded-sm pt-[26%]"
    />
    <div className="flex flex-1 flex-col gap-3">
      <Skeleton className="mb-0 h-[30px] rounded-sm" />
      <Skeleton className="mb-0 h-[20px] rounded-sm" />
    </div>
    <Skeleton className="mb-0 h-[30px] w-[30px] flex-1 rounded-sm" />
  </Box>
)

export default memo(SkeletonEarnRewardMobile)
