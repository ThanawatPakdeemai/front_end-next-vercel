import { Skeleton } from "@mui/material"
import React from "react"

const SkeletonGamePartner = () => (
  <div className="relativew h-[468px] w-full gap-4">
    <Skeleton
      variant="rectangular"
      className="h-12 w-full max-w-[1016px] rounded-2xl"
    />
    <div className="mt-5 flex h-[calc(100%-50px)] justify-between gap-3">
      <Skeleton
        variant="rectangular"
        className="h-full w-4/5 max-w-[1016px] rounded-2xl"
      />
      <Skeleton
        variant="rectangular"
        className="h-full w-3/12 max-w-[1016px] rounded-2xl"
      />
    </div>
  </div>
)

export default SkeletonGamePartner
