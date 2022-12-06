import { IGame } from "@feature/game/interfaces/IGameService"
import { Button, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"
import ImageCustom from "@src/components/atoms/image"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import { SlideNextButton } from "@components/molecules/slideNextButton"
import { Tag } from "@components/atoms/tag"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { ButtonLink } from "@components/atoms/buttonLink"

export interface IBannerCardSlide extends React.HTMLAttributes<HTMLDivElement> {
  slide: IGame
  slideNext: IGame
}

const BannerCardSlide = ({ slide, slideNext }: IBannerCardSlide) => (
  <div className="slide-item flex gap-4 bg-black-01 align-middle text-white-default">
    <div className="slide-item--image w-2/5 overflow-hidden rounded-2xl lg:w-3/4">
      <ImageCustom
        src={slide.image_home_banner}
        alt={slide.name}
        width={1920}
        height={1080}
      />
    </div>
    <div className="w-3/5 justify-between md:flex md:flex-col md:gap-4 lg:w-1/4">
      <div className="slide-item--content flex flex-col justify-between rounded-3xl bg-black-02 p-8 md:h-full">
        <section className="slide-item--content-body">
          <div className="slide-item--tags mb-4 flex items-center gap-2">
            <Tag text={slide.category.name} />
            {slide.game_free_status && <Tag text="Free" />}
            {slide.hot_game_status && <Tag text="Hot">Hot</Tag>}
            <Tag text={slide.game_type} />
          </div>
          <Typography
            variant="h1"
            className="py-6 uppercase"
          >
            {slide.name}
          </Typography>

          <Typography
            className="text-black-default line-clamp-4"
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: slide.banner_description
            }}
          />
        </section>
        <footer className="slide-item--footer flex items-center justify-between">
          <ButtonLink
            text="Play Now"
            href={`/game/${slide.id}`}
            icon={<SportsEsportsOutlinedIcon />}
          />
          <div className="slide-item--favorite">
            <button
              type="button"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-black-01"
            >
              <FavoriteBorderIcon className="opacity-80" />
            </button>
          </div>
        </footer>
      </div>
      <SlideNextButton slideNext={slideNext} />
    </div>
  </div>
)

export default BannerCardSlide
