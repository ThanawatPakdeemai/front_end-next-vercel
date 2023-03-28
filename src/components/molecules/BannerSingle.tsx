import React from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  src: string
  alt: string
}
const BannerSingle = ({ src, alt }: IProp) => (
  <div className="relative mb-3 flex h-[180px] flex-row items-center overflow-hidden rounded-sm border-[1px] border-neutral-800 bg-primary-main uppercase sm:rounded-[24px]">
    <div className="absolute">
      <Image
        src={src}
        alt={alt}
        width={1368}
        height={180}
        className="rounded-[24px] object-cover object-center"
      />
    </div>
  </div>
)
export default BannerSingle
