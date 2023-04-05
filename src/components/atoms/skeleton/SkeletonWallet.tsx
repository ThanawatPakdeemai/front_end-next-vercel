import IStickerSolid from "@components/icons/StickerSolid"
import { KeyFramesRotate } from "@feature/wallet/components/molecules/WalletBody"
import { Box, Skeleton } from "@mui/material"
import React from "react"
import { IMAGES } from "@constants/images"

const SkeletionWallet = () => (
  <div className="SkeletionWallet relative h-full w-full  p-6">
    <div className="mb-2 flex w-full flex-row items-center justify-between gap-1 whitespace-nowrap rounded-default bg-black-100 py-4 xl:xl:max-w-[390px]">
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
    <div className="relative mb-2 flex w-full flex-col gap-1 rounded-default bg-black-100 p-8 xl:max-w-[390px]">
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
    <div className="mb-4 flex w-full justify-end xl:max-w-[390px]">
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
    <div className="grid w-full grid-cols-2 gap-6 xl:max-w-[390px]">
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

    <Box
      className="absolute bottom-[10px] right-[12px] col-span-2 hidden h-[calc(100%-20px)] w-[137px] xl:flex"
      sx={{
        backgroundImage: `url(${IMAGES.Frame.src})`
      }}
    >
      <div className="absolute right-1 top-0 flex h-full items-center rounded-sm border-4 border-black-900 bg-black-100">
        <div className="loader">
          <div className="loaderBar" />
        </div>
      </div>
    </Box>
  </div>
)

export default SkeletionWallet
