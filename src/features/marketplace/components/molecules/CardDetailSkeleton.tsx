import { Skeleton } from "@mui/material"
import React from "react"

const CardDetailSkeleton = () => (
  <div className="flex w-full flex-col gap-x-[120px] gap-y-[60px] px-10 py-4 sm:flex-row sm:gap-y-0 sm:px-0 sm:py-0">
    <div className="h-[626px] w-[623px] rounded-2xl bg-neutral-780 p-3">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={335}
        sx={{ borderRadius: "8px" }}
      />
      <div className="mt-4 flex justify-between">
        <div className="w-full px-8 py-6">
          <div className="grid grid-cols-2">
            <div className="">
              <Skeleton
                variant="text"
                width={88}
                height={20}
              />
              <div className="mb-2 mt-2 flex">
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div className="ml-2 content-end">
                  <Skeleton
                    variant="text"
                    width={108}
                    height={20}
                  />
                  <div className="flex items-center gap-2">
                    <Skeleton
                      variant="text"
                      width={118}
                      height={30}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
              <Skeleton
                variant="text"
                width={108}
                height={20}
              />
            </div>
            <div className="">
              <Skeleton
                variant="text"
                width={88}
                height={20}
              />
              <div className="mb-2 mt-2 flex">
                <Skeleton
                  variant="rectangular"
                  width={60}
                  height={60}
                />
                <div className="ml-2 content-end">
                  <Skeleton
                    variant="text"
                    width={108}
                    height={20}
                  />
                  <div className="flex items-center gap-2">
                    <Skeleton
                      variant="text"
                      width={118}
                      height={30}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
              <Skeleton
                variant="text"
                width={108}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-8 py-2">
        <Skeleton
          variant="text"
          width={88}
          height={20}
        />
        <Skeleton
          variant="text"
          width={108}
          height={20}
        />
      </div>
    </div>
    <div>
      <div className="flex items-center gap-2">
        <Skeleton
          variant="rectangular"
          width={118}
          height={20}
          className="rounded"
        />
        <Skeleton
          variant="rectangular"
          width={20}
          height={20}
          className="rounded"
        />
      </div>
      <div className="my-2 flex gap-2">
        <Skeleton
          variant="text"
          width={198}
          height={50}
        />
        <Skeleton
          variant="text"
          width={58}
          height={50}
        />
      </div>
      <div className="h-[325px] w-[623px] rounded-2xl bg-neutral-780 p-8">
        <div className="flex items-center gap-2">
          <Skeleton
            variant="text"
            width={78}
            height={40}
            className="mr-2"
          />
          <Skeleton
            variant="rectangular"
            width={78}
            height={20}
            className="rounded"
          />
          <Skeleton
            variant="rectangular"
            width={118}
            height={20}
            className="rounded"
          />
        </div>
        <div className="my-2 grid grid-cols-5 gap-4">
          <div className="col-span-3 my-4">
            <Skeleton
              variant="text"
              width={138}
              height={30}
              className="mr-2"
            />
            <div className="my-2 flex">
              <Skeleton
                variant="rectangular"
                width={35}
                height={35}
                className="mr-2 rounded"
              />
              <Skeleton
                variant="rectangular"
                width={205}
                height={35}
                className="mr-2 rounded"
              />
              <Skeleton
                variant="rectangular"
                width={35}
                height={35}
                className="mr-2 rounded"
              />
            </div>
            <Skeleton
              variant="text"
              width={118}
              height={30}
              className="mr-2"
            />
          </div>
          <div className="col-span-2 my-4">
            <Skeleton
              variant="text"
              width={138}
              height={30}
              className="mr-2"
            />
            <Skeleton
              variant="rectangular"
              width={205}
              height={35}
              className="my-2 mr-2 rounded"
            />
            <Skeleton
              variant="text"
              width={118}
              height={30}
              className="mr-2"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Skeleton
            variant="rectangular"
            width={165}
            height={35}
            className="rounded-lg"
          />
          <Skeleton
            variant="rectangular"
            width={165}
            height={35}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>
)

export default CardDetailSkeleton
