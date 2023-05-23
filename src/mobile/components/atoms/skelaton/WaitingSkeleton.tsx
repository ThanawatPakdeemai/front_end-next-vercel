import { Skeleton } from "@mui/material"
import { uniqueId } from "lodash"

const WaitingSkeleton = () => (
  <>
    <div className="grid w-full grid-cols-4 flex-wrap items-center justify-center px-3">
      {new Array(8).fill(1).map(() => (
        <div
          key={uniqueId()}
          className="mb-2 flex items-center justify-center rounded-md"
        >
          <Skeleton
            variant="rectangular"
            width={50}
            height={50}
          />
        </div>
      ))}
    </div>
    <div className="my-5 flex items-center justify-center">
      <Skeleton
        variant="rounded"
        width={210}
        height={50}
      />
    </div>
  </>
)
export default WaitingSkeleton
