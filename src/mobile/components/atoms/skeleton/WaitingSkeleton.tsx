import { classesWrapper } from "@mobile/features/game/components/molecules/PlayerCardMobile"
import { Skeleton } from "@mui/material"
import { uniqueId } from "lodash"

const WaitingSkeleton = () => (
  <div className="grid w-full grid-cols-4 flex-wrap justify-center gap-3 sm:grid-cols-8">
    {new Array(8).fill(1).map(() => (
      <div
        key={uniqueId()}
        className="relative pt-6"
      >
        <div className="rounded-[10px] border-2 border-[#18181C] p-[2px]">
          <div className={classesWrapper}>
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#18181C]">
              <Skeleton
                variant="rectangular"
                width={50}
                height={50}
                className="scale-0 bg-[#18181C]"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <Skeleton
            variant="rounded"
            width={210}
            height={15}
            className="bg-[#18181C]"
          />
        </div>
        <div className="mt-2 flex items-center justify-center">
          <Skeleton
            variant="rounded"
            width={210}
            height={10}
            className="bg-[#18181C]"
          />
        </div>
      </div>
    ))}
  </div>
)
export default WaitingSkeleton
