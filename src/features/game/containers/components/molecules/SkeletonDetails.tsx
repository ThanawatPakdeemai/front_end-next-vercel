import { Skeleton } from "@mui/material"
import React from "react"
import { v4 as uuidv4 } from "uuid"

interface IProp {
  amount?: number
}

const SkeletonDetails = ({ amount }: IProp) => (
  <>
    {[...Array(amount || 6)].map(() => (
      <Skeleton
        key={uuidv4()}
        variant="rectangular"
        className="h-[91px] w-full rounded-[14px]"
      />
    ))}
  </>
)

export default SkeletonDetails
