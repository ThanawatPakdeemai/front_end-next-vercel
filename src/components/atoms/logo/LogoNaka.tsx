import { IMAGES } from "@constants/images"
import { memo } from "react"
import Image from "next/image"

const LogoNaka = () => (
  <Image
    src={IMAGES.nakaBand.src}
    width={IMAGES.nakaBand.width}
    height={IMAGES.nakaBand.height}
    alt={IMAGES.nakaBand.alt}
    loading="eager"
    priority
  />
)
export default memo(LogoNaka)
