import { Skeleton } from "@mui/material"
import React from "react"

const SkeletonItemMobile = () => (
  <div className="h-[224px] w-[164px] justify-self-center rounded-2xl bg-neutral-780 p-2">
    <Skeleton
      variant="rectangular"
      width={148}
      height={148}
      sx={{ borderRadius: "8px" }}
    />
    <div className="mt-2 flex justify-between">
      <Skeleton
        variant="text"
        width={68}
        height={20}
      />
      <Skeleton
        variant="rectangular"
        width={60}
        height={20}
      />
    </div>
    <div className="mt-2 flex justify-between">
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

export default SkeletonItemMobile
