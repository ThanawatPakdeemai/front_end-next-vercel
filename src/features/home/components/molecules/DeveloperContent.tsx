import { memo } from "react"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

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
