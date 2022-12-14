import { IGame } from "@feature/game/interfaces/IGameService"
import { CardMedia } from "@mui/material"
import React from "react"
import CardContentSlide from "../molecules/CardContentSlide"
import CardNextSlide, { ICardNextSlide } from "../molecules/CardNextSlide"

export interface IBannerCardSlide extends ICardNextSlide {
  slide: IGame
}

const BannerCardSlide = ({ slide, ...props }: IBannerCardSlide) => (
  <div className="slide-item relative gap-4 align-middle text-white-default md:flex">
    <div className="slide-item--image w-full overflow-hidden rounded-2xl md:w-3/5 xl:w-3/4">
      <CardMedia
        component="img"
        height={1080}
        image={slide.image_home_banner}
        alt={slide.name}
      />
    </div>
    <div className="w-full justify-between md:flex md:w-3/5 md:flex-col md:gap-4 xl:w-1/4">
      <CardContentSlide slide={slide} />
      <CardNextSlide
        slideNext={props.slideNext}
        gotoNext={props.gotoNext}
      />
    </div>
  </div>
)

export default BannerCardSlide