import { Skeleton, TableBody } from "@mui/material"
import React, { memo } from "react"

const SkeletonTableWallet = () => (
  <TableBody className="w-full gap-4 px-3">
    <Skeleton
      component="tr"
      variant="rectangular"
      className="my-1 w-full rounded-2xl"
      height={50}
    />
  </TableBody>
)

export default memo(SkeletonTableWallet)
