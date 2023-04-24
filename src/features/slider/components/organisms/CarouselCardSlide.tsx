import ShortDetailsCTA from "@components/molecules/ShortDetailsCTA"
import React from "react"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import { CardMedia } from "@mui/material"
import { ImageCustom } from "@components/atoms/image/Image"

export interface CarouselCardSlideProps {
  video?: boolean
  src: string
  name: string
  index: number
  activeIndex: number
  description: string
  link: string
}
const CarouselCardSlide = ({
  video = false,
  src,
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
            src={src}
            autoPlay
            controls
          />
        ) : (
          <ImageCustom
            src={src}
            alt={name}
            width={678}
            height={678}
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
