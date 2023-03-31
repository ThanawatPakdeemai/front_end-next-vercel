import { memo } from "react"
import { Image } from "@components/atoms/image"
import { IMAGES } from "@constants/images"

const DeveloperContent = () => (
  <>
    <div className="relative">
      <Image
        src={IMAGES.tableCom.src}
        width={IMAGES.tableCom.width}
        height={IMAGES.tableCom.height}
        alt={IMAGES.tableCom.alt}
        className="m-auto"
      />
      <Image
        src={IMAGES.nakaLogo.src}
        width={IMAGES.nakaLogo.width}
        height={IMAGES.nakaLogo.height}
        alt={IMAGES.nakaLogo.alt}
        className="duration-150hover:rotate-0 absolute top-5 right-5 rotate-12 text-red-default ease-linear"
      />
    </div>
  </>
)

export default memo(DeveloperContent)
