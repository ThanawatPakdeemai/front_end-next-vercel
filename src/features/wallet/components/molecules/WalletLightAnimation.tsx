import { Image } from "@components/atoms/image"
import React from "react"
import { IMAGES } from "@constants/images"

const WalletLightAnimation = () => (
  <>
    <div className="col-span-2 m-2 flex">
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
    <div className="absolute top-[75px] left-[-16px]">
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
