import { Skeleton } from "@mui/material"
import React, { memo } from "react"

const SkeletonCardPlayers = () => (
  <div
    className={`xs:grid-cols-2 m-auto mt-2 grid h-[345px] w-max grid-cols-3 gap-3 px-4 sm:w-[520px] sm:grid-cols-3 sm:px-0 md:mt-10
          md:grid-cols-4 ${""}`}
  >
    {[...Array(8)].map((ele) => (
      <>
        <div key={ele}>
          <Skeleton
            variant="rectangular"
            width={92}
            height={92}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={92}
            height={10}
            className="mt-3 rounded-md"
          />
        </div>
      </>
    ))}
  </div>
)

export default memo(SkeletonCardPlayers)
