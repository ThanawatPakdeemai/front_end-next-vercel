import IStickerSolid from "@components/icons/StickerSolid"
import { KeyFramesRotate } from "@feature/wallet/components/molecules/WalletBody"
import { Skeleton } from "@mui/material"
import React from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

const SkeletionWallet = () => (
  <div className="SkeletionWallet relative m-6 pr-[100px]">
    <div className="mb-2 flex w-full flex-row items-center justify-between gap-1 whitespace-nowrap rounded-default bg-black-100 py-4">
      <Skeleton
        variant="rectangular"
        height={20}
        className="mx-3 w-[40%] rounded-2xl"
      />
      <Skeleton
        variant="rectangular"
        height={20}
        className="mx-3 w-[40%] rounded-2xl"
      />
    </div>
    <div className="relative mb-2 flex w-full flex-col gap-1 rounded-default bg-black-100 p-8">
      <p className="text-sm uppercase text-neutral-600">
        <Skeleton
          variant="rectangular"
          height={20}
          className="w-[200px] rounded-2xl"
        />
      </p>
      <div className="my-4 flex w-[250px] items-center uppercase">
        <Skeleton
          variant="rectangular"
          height={40}
          className="w-full rounded-2xl"
        />
      </div>
      <Skeleton
        variant="rectangular"
        height={20}
        className="w-[100px] rounded-2xl"
      />
      <div className="absolute top-2 right-2">
        <KeyFramesRotate>
          <IStickerSolid
            width="70"
            height="70"
          />
        </KeyFramesRotate>
      </div>
    </div>
    <div className="mb-4 flex w-full justify-end">
      <Skeleton
        variant="rectangular"
        height={45}
        className="w-[40%] rounded-3xl"
      />
      <Skeleton
        variant="rectangular"
        height={45}
        className="ml-4 w-[40%] rounded-3xl"
      />
    </div>
    <div className="grid w-full grid-cols-2 gap-6">
      <Skeleton
        variant="rectangular"
        height={30}
        className="rounded-2xl"
      />
      <Skeleton
        variant="rectangular"
        height={30}
        className="rounded-2xl"
      />
    </div>

    <div className="absolute right-[-35px] top-[-10px] col-span-2 m-2 flex w-[100px]">
      <Image
        src={IMAGES.Frame.src}
        alt=""
        width={120}
        height={80}
        className="mr-2"
      />
      <div className="mr-2 flex h-[365px] justify-center rounded-sm border-4 border-black-900 bg-black-100 p-[2px]">
        <div className="loader">
          <div className="loaderBar" />
        </div>
      </div>
    </div>
  </div>
)

export default SkeletionWallet
