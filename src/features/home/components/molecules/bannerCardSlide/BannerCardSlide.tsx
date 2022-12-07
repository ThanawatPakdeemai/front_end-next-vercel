import { IGame } from "@feature/game/interfaces/IGameService"
import { Button, Chip, IconButton, Stack, Typography } from "@mui/material"
import React from "react"
import ImageCustom from "@src/components/atoms/image"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import { SlideNextButton } from "@components/molecules/slideNextButton"
import { ButtonLink } from "@components/atoms/buttonLink"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

export interface IBannerCardSlide extends React.HTMLAttributes<HTMLDivElement> {
  slide: IGame
  slideNext: IGame
  gotoNext?: () => void
}

const BannerCardSlide = ({ slide, slideNext, gotoNext }: IBannerCardSlide) => (
  <div className="slide-item relative gap-4 bg-black-01 align-middle text-white-default md:flex">
    <div className="slide-item--image w-full overflow-hidden rounded-2xl md:w-3/5 xl:w-3/4">
      <ImageCustom
        src={slide.image_home_banner}
        alt={slide.name}
        width={1920}
        height={1080}
      />
    </div>
    <div className="w-full justify-between md:flex md:w-3/5 md:flex-col md:gap-4 xl:w-1/4">
      <div className="slide-item--content my-4 flex flex-col justify-between rounded-2xl bg-black-02 p-6 md:my-0 md:h-full md:rounded-3xl md:p-8">
        <section className="slide-item--content-body">
          <div className="slide-item--tags mb-4 flex items-center gap-2">
            <Chip
              label={slide.category.name}
              variant="outlined"
              size="small"
              className="uppercase"
            />
            {slide.game_free_status && (
              <Chip
                label="Free"
                variant="outlined"
                size="small"
                className="uppercase"
              />
            )}
            {slide.hot_game_status && (
              <Chip
                label="Hot"
                variant="outlined"
                size="small"
                className="uppercase"
              />
            )}
            <Chip
              label={slide.game_type}
              variant="outlined"
              size="small"
              className="uppercase"
            />
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
        <footer className="slide-item--footer mt-4 flex items-center justify-between">
          <div className="w-[calc(100%-80px)]">
            <ButtonLink
              text="Play Now"
              href={`/game/${slide.path}`}
              icon={<SportsEsportsOutlinedIcon />}
              size="large"
              color="secondary"
              variant="contained"
              className="w-full"
            />
          </div>

          <div className="slide-item--favorite">
            <Button className="flex h-14 w-14 !min-w-0 items-center justify-center !rounded-full !bg-black-01">
              <IconButton aria-label="delete">
                <FavoriteBorderIcon />
              </IconButton>
            </Button>
          </div>
        </footer>
      </div>
      <SlideNextButton
        slideNext={slideNext}
        gotoNext={gotoNext}
      />
    </div>
  </div>
)

export default BannerCardSlide
