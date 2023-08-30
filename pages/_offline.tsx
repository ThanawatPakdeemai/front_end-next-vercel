import React from "react"
import dynamic from "next/dynamic"
import { IMAGES } from "@constants/images"

const SystemTemplate = dynamic(
  () => import("@components/templates/SystemTemplate"),
  {
    suspense: true,
    ssr: false
  }
)
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})

const Offline = () => (
  <SystemTemplate
    content={
      <div className="offline-content flex flex-col gap-6 md:gap-[60px]">
        <h2 className="uppercase">
          It looks like we are having trouble connecting.
        </h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    }
    image={
      <ImageCustom
        className="h-full w-full object-cover object-center"
        src={IMAGES.noConnection.src}
        alt="green iguana"
        width={IMAGES.noConnection.width || 500}
        height={IMAGES.noConnection.height || 500}
        srcWebp={IMAGES.noConnection.srcWebp}
      />
    }
  />
)

export default Offline
