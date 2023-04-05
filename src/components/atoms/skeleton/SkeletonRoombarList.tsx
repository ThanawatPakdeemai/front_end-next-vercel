import React from "react"
import { Box, Skeleton } from "@mui/material"
import SkeletonRoombarItem from "./SkeletonRoombarItem"

const SkeletonRoombarList = () => (
  <div className="on-playing-body__wrapper max-w-[333px]">
    <Box
      component="div"
      className="flex h-[156px] w-full flex-auto overflow-hidden rounded-2xl border-[1px] border-neutral-800 bg-neutral-780"
    >
      <div className="h-[156px] w-[156px]">
        <Skeleton
          variant="rounded"
          className="h-full w-full rounded-[6px]"
        />
      </div>
      <div className="custom-scroll flex w-[calc(100%-156px)] flex-col p-3">
        <SkeletonRoombarItem />
      </div>
    </Box>
  </div>
)

export default SkeletonRoombarList
