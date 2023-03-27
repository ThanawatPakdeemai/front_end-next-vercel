import { Skeleton } from "@mui/material"
import React from "react"

const SkeletonSummaryRaward = () => (
  <div className="max-h-[740px] flex-row gap-3 md:flex">
    <div className="flex h-[740] w-full flex-col rounded-md border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-4/6">
      <div className="flex gap-4">
        <div className="mb-5 h-[40px] w-2/3">
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-[16px]"
          />
        </div>
        <div className="h-[40px] w-2/6">
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-[16px]"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-[600px] w-2/6">
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-[16px]"
          />
        </div>
        <div className="h-[600px] w-2/3">
          <Skeleton
            variant="rectangular"
            className="h-full w-full rounded-[16px]"
          />
        </div>
      </div>
    </div>
    <div className="h-[740] rounded-md border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-2/6">
      <div className="mb-5 h-[40px] w-full">
        <Skeleton
          variant="rectangular"
          className="h-full w-full rounded-[16px]"
        />
      </div>
      <div className="h-[600px] w-full">
        <Skeleton
          variant="rectangular"
          className="h-full w-full rounded-[16px]"
        />
      </div>
    </div>
  </div>
)

export default SkeletonSummaryRaward
