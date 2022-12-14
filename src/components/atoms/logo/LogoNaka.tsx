import { IMAGES } from "@constants/images"
import { memo } from "react"
import { Image } from "@components/atoms/image"

const LogoNaka = () => (
  <Image
    src={IMAGES.nakaBand.src}
    width={IMAGES.nakaBand.width}
    height={IMAGES.nakaBand.height}
    alt={IMAGES.nakaBand.alt}
  />
)
export default memo(LogoNaka)
