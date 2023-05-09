import { memo } from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

const DeveloperContent = () => (
  <div className="developer-content relative">
    <Image
      src={IMAGES.tableCom.src}
      srcWebp={IMAGES.tableCom.srcWebp}
      width={IMAGES.tableCom.width}
      height={IMAGES.tableCom.height}
      alt={IMAGES.tableCom.alt}
      className="m-auto"
    />
  </div>
)

export default memo(DeveloperContent)
