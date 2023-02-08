import React from "react"
import { Image } from "@components/atoms/image"

interface IProp {
  src: string
  alt: string
}
const BannerSingle = ({ src, alt }: IProp) => (
  <div className="mb-12 flex h-[180px] flex-row rounded-[24px] border-[1px] border-neutral-800 bg-primary-main uppercase">
    <div className="absolute">
      <Image
        src={src}
        alt={alt}
        width={1368}
        height={180}
        className="h-[180px] rounded-[24px] object-cover object-center"
      />
    </div>
  </div>
)
export default BannerSingle
