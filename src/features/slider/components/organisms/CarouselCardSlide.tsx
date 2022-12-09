import ButtonLink from "@components/atoms/button/ButtonLink"
import DownloadIcon from "@components/icons/DownloadIcon"
import { IGameDownloadSlide } from "@feature/slider/interfaces/ISlides"
import { CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"

export interface CarouselCardSlideProps extends IGameDownloadSlide {
  index: number
  activeIndex: number
}
const CarouselCardSlide = ({
  index,
  activeIndex,
  ...props
}: CarouselCardSlideProps) => {
  const isActive = index === activeIndex
  return (
    <div
      className={`carousel-slide__item relative overflow-hidden rounded-2xl ${
        isActive ? "carousel-slide__item--active" : ""
      }`}
    >
      <div className="carousel-slide__item__image">
        <CardMedia
          component="img"
          alt={props.name}
          height={468}
          image={props.image}
        />
      </div>
      <CardContent className="carousel-slide__item__content absolute bottom-0 left-0 z-[1] w-full">
        <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-grey-A100 p-4">
          <Typography
            className="mb-0 text-white-primary line-clamp-1"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: props.description
            }}
          />
          <ButtonLink
            href={props.link}
            text="Download"
            className="carousel-slide__item__content__link !min-w-0 p-0 font-neue-machina"
            icon={<DownloadIcon />}
          />
        </div>
      </CardContent>
    </div>
  )
}

export default CarouselCardSlide
