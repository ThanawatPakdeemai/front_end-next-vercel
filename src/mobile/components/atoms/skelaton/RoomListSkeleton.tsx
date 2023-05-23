import { Skeleton } from "@mui/material"
import { uniqueId } from "lodash"

const RoomListSkeleton = () => (
  <>
    {new Array(10).fill(1).map(() => (
      <div
        className="mb-2 flex items-center gap-2 px-1"
        key={uniqueId()}
      >
        <Skeleton
          variant="rectangular"
          width={70}
          height={70}
        />
        <div className="flex w-full flex-col items-center gap-2">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={10}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={50}
          />
        </div>
      </div>
    ))}
  </>
)
export default RoomListSkeleton
