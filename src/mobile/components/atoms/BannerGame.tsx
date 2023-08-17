import React from "react"
import dynamic from "next/dynamic"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProps {
  imageBanner: string
}
const BannerGame = (props: IProps) => {
  const { imageBanner } = props
  return (
    <Image
      src={`${imageBanner}`}
      alt="image-banner"
      width={500}
      height={51}
      className="h-[51px] w-full object-cover object-center"
    />
  )
}
export default BannerGame
