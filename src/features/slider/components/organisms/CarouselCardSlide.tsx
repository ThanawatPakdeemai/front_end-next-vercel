import React from "react"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import { CardMedia } from "@mui/material"
import dynamic from "next/dynamic"
import { IImageProps } from "@constants/images"

const ShortDetailsCTA = dynamic(
  () => import("@components/molecules/ShortDetailsCTA"),
  {
    suspense: true,
    ssr: true
  }
)
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

export interface CarouselCardSlideProps {
  video?: boolean
  image: IImageProps | string
  name: string
  index: number
  activeIndex: number
  description: string
  link: string
}
const CarouselCardSlide = ({
  video = false,
  image,
  name,
  index,
  activeIndex,
  description,
  link
}: CarouselCardSlideProps) => {
  const isActive = index === activeIndex
  return (
    <div
      className={`carousel-slide__item relative h-full overflow-hidden rounded-2xl ${
        video ? "border border-neutral-800 " : ""
      } ${isActive ? "carousel-slide__item--active" : ""}`}
    >
      <div className="carousel-slide__item__image h-full">
        {video ? (
          <CardMedia
            className="h-[30vh] md:h-[472px]"
            component={video ? "video" : "img"}
            alt={name}
            height={468}
            src={image as string}
            autoPlay
            controls
          />
        ) : (
          <ImageCustom
            src={(image as IImageProps).src}
            srcWebp={(image as IImageProps).srcWebp}
            width={(image as IImageProps).width}
            height={(image as IImageProps).height}
            alt={(image as IImageProps).alt}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <ShortDetailsCTA
        description={description}
        link={link}
        startIcon={
          <LanguageOutlinedIcon
            color="error"
            className="mr-3"
          />
        }
      />
    </div>
  )
}

export default CarouselCardSlide
