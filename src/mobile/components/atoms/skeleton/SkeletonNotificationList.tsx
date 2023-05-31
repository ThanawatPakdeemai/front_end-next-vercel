import { Box, Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonNotificationList = () => (
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
      className="h-28 w-28 rounded-sm"
    />
    <div className="flex flex-auto flex-col gap-3">
      <Skeleton className="mb-0 h-[30px] rounded-sm" />
      <Skeleton className="mb-0 h-[20px] rounded-sm" />
    </div>
  </Box>
)

export default memo(SkeletonNotificationList)
