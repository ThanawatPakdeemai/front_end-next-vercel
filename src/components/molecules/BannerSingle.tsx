import React from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  src: string
  alt: string
}
const BannerSingle = ({ src, alt }: IProp) => (
  <div className="relative mb-3 flex h-[60px] flex-row items-center overflow-hidden rounded-sm border-[1px] border-neutral-800 bg-primary-main uppercase sm:h-[180px] sm:rounded-[24px]">
    <Image
      src={src}
      alt={alt}
      width={1368}
      height={180}
      className="h-full w-full rounded-sm object-cover object-center sm:rounded-[24px]"
    />
  </div>
)
export default BannerSingle
