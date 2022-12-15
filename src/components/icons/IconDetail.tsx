import React from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

interface IIconHandLeft {
  size?: number
}

export const IconDetail = () => (
  <>
    <div>
      <Image
        src={IMAGES.frontBlogBand.src}
        width={IMAGES.frontBlogBand.width}
        height={IMAGES.frontBlogBand.height}
        alt={IMAGES.frontBlogBand.alt}
      />
    </div>
  </>
)

IconDetail.defaultProps = {
  size: 50
}
