// some-inner-component.jsx
import { Typography } from "@mui/material"
import React from "react"
import { useSwiper, useSwiperSlide } from "swiper/react"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ImageCustom from "@src/components/atoms/image"
import { IGame } from "@feature/game/interfaces/IGameService"

export interface IBannerCardSlide extends React.HTMLAttributes<HTMLDivElement> {
  slideNext: IGame
}

export default function SlideNextButton({ slideNext }: IBannerCardSlide) {
  const swiper = useSwiper()
  const swiperSlide = useSwiperSlide()

  return (
    <button
      type="button"
      onClick={() => swiper.slideNext()}
      className={`slide-next flex items-center gap-4 rounded-3xl border-[1px] border-white-default/20 p-4 text-left ${
        swiperSlide.isActive ? "opacity-100" : "opacity-0"
      }"}`}
    >
      <div className="slide-next--image w-1/3">
        <ImageCustom
          src={slideNext.image_category_list}
          alt={slideNext.name}
          width={200}
          height={200}
        />
      </div>
      <div className="slide-next--content relative w-3/4">
        <p className="mb-4 mt-1 text-[70%] uppercase text-white-default/50">
          Next
        </p>
        <span className="absolute right-0 top-0">
          <ArrowForwardIcon
            fontSize="small"
            className="opacity-50"
          />
        </span>
        <Typography variant="h3">{slideNext.name}</Typography>
        <div className="slide-next--bar relative mt-4 h-[1px] w-full bg-white-default/20">
          <span
            className={`absolute top-0 left-0 h-full w-0 bg-white-default ${
              swiperSlide.isActive ? "animate-time-progress" : ""
            }`}
          />
        </div>
      </div>
    </button>
  )
}
