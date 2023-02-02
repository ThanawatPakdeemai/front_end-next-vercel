import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const SkeletonTableWallet = () => (
  <div className="h-[660px] w-full gap-4 px-3">
    {items.map((item) => (
      <Skeleton
        key={item}
        variant="rectangular"
        className="my-1 w-full rounded-2xl"
        height={50}
      />
    ))}

    {/* <div className="flex h-full w-[338px] flex-col gap-y-2">
      <Skeleton
        variant="rectangular"
        height={350}
        className="w-full rounded-2xl"
      />
      <Skeleton
        variant="rectangular"
        height={112}
        className="w-full rounded-2xl"
      />
    </div> */}
  </div>
)

export default memo(SkeletonTableWallet)
