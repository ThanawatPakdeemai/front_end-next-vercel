import React from "react"
import { IVerticalThumbCardSlideProps } from "@feature/slider/interfaces/ISlides"
import { CardMedia } from "@mui/material"

const VerticalThumbSmallCardSlide = ({
  item,
  index,
  activeIndex
}: IVerticalThumbCardSlideProps) => {
  const isActive = index === activeIndex
  return (
    <div className="verticalSmallThumb-slide__item relative my-[2px]">
      <div className="verticalSmallThumb-slide__item__image cursor-pointer  hover:opacity-70">
        <CardMedia
          className={`block h-[70px] w-[70px] overflow-hidden rounded-sm border-2 object-cover object-center transition-all ${
            isActive ? "border-green-lemon" : "border-neutral-700"
          }`}
          component={item.type === "video" ? "video" : "img"}
          alt="Slide"
          src={item.src}
          autoPlay={false}
          controls={false}
        />
      </div>
    </div>
  )
}

export default VerticalThumbSmallCardSlide
