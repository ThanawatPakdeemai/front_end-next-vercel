import { Skeleton } from "@mui/material"
import React, { memo } from "react"

interface IProps {
  className?: string
}

const SkeletonTopPlayer = ({ className }: IProps) => (
  <div
    className={`${className} mb-2 flex h-[68px] w-full items-center justify-between rounded-sm bg-neutral-800 px-1`}
  >
    <Skeleton
      variant="rectangular"
      width={58}
      height={58}
      className="grow-1 rounded-sm"
    />
    <div className="flex items-center gap-2">
      <div className="flex h-full w-[144px] flex-col justify-center gap-2">
        <Skeleton
          variant="rectangular"
          className="rounded-sm"
        />
        <Skeleton
          variant="rectangular"
          className="rounded-sm"
        />
      </div>
      <Skeleton
        variant="rectangular"
        width={58}
        height={58}
        className="rounded-sm"
      />
    </div>
  </div>
)

export default memo(SkeletonTopPlayer)
