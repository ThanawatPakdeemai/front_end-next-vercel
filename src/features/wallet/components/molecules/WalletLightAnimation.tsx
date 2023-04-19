import { Image } from "@components/atoms/image"
import React from "react"
import { IMAGES } from "@constants/images"
import { Box } from "@mui/material"

const WalletLightAnimation = () => (
  <>
    <Box
      component="div"
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
    <div className="absolute left-[-16px] top-[75px] hidden sm:block">
      <Image
        src={IMAGES.RectangleRed.src}
        alt=""
        width={10}
        height={10}
        className="mb-2"
      />
      <Image
        src={IMAGES.RectangleBlack.src}
        alt=""
        width={10}
        height={10}
        className=""
      />
    </div>
  </>
)
export default WalletLightAnimation
