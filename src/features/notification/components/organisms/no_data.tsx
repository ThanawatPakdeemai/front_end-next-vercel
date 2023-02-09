import React, { memo } from "react"
import { Skeleton } from "@mui/material"
import { INotification } from "../../interfaces/INotificationService"

interface IProps {
  isLoading: boolean
  data: INotification[]
}

const Nodata = ({ data, isLoading }: IProps) => (
  <div>
    {data[0] && data && !isLoading ? (
      <div className="mb-10 bg-neutral-800 p-2">
        <div className="w-full bg-neutral-800 p-2 text-[10px]">
          <div className="h-10 pl-2 uppercase text-neutral-600">
            <div className="flex">
              <div className="flex w-40 flex-initial pt-3 font-neue-machina">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={80}
                  height={30}
                />
              </div>
              <div className="relative flex w-32 flex-initial pt-3 font-neue-machina">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={80}
                  height={30}
                />
              </div>
              <div className="relative flex w-32 flex-initial pt-3 font-neue-machina">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={80}
                  height={30}
                />
              </div>
              <div className="flex w-44 flex-initial pt-3 font-neue-machina">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={80}
                  height={30}
                />
              </div>
              <div className="flex w-fit pt-3 text-end font-neue-machina">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={50}
                  height={30}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 divide-y divide-neutral-800 rounded-lg bg-neutral-900 p-3">
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="mb-10 w-full rounded-2xl bg-[#101013] p-5 text-[10px] uppercase">
        no data
      </div>
    )}
  </div>
)

export default memo(Nodata)
