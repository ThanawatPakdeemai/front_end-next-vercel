import { Skeleton } from "@mui/material"
import React from "react"

const SkeletonItem = () => (
  <div className="h-[305px] w-[218px] rounded-2xl bg-neutral-780 p-2">
    <Skeleton
      variant="rectangular"
      width={200}
      height={200}
      sx={{ borderRadius: "8px" }}
    />
    <div className="mt-4 flex justify-between">
      <Skeleton
        variant="text"
        width={88}
        height={20}
      />
      <Skeleton
        variant="rectangular"
        width={60}
        height={20}
      />
    </div>
    <div className="mt-4 flex justify-between">
      <Skeleton
        variant="rectangular"
        width={60}
        height={20}
      />
      <Skeleton
        variant="rectangular"
        width={75}
        height={20}
      />
    </div>
  </div>
)

export default SkeletonItem
