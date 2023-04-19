import { IGame } from "@feature/game/interfaces/IGameService"
import React from "react"
import { Box, CardMedia, Grid } from "@mui/material"
import useGlobal from "@hooks/useGlobal"
import Link from "next/link"
import CardContentSlide from "../molecules/CardContentSlide"
import CardNextSlide, { ICardNextSlide } from "../molecules/CardNextSlide"

export interface IBannerCardSlide extends ICardNextSlide {
  slide: IGame
}

const BannerCardSlide = ({ slide, ...props }: IBannerCardSlide) => {
  const { getTypeGamePathFolder, onHandleSetGameStore, isRedirectRoomlist } =
    useGlobal()
  return (
    <Box component="div">
      <Grid
        container
        component="main"
      >
        <Box
          component="div"
          className="slide-item relative w-full gap-4 align-middle text-white-default md:flex"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={9}
          >
            <div className="slide-item--image h-full w-full overflow-hidden rounded-2xl">
              <Link
                href={`/${getTypeGamePathFolder(slide)}/${
                  slide.path
                }${isRedirectRoomlist(slide).toString()}`}
                onClick={() =>
                  onHandleSetGameStore(getTypeGamePathFolder(slide), slide)
                }
              >
                <CardMedia
                  component="img"
                  height={1080}
                  image={slide.image_home_banner}
                  alt={slide.name}
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
          >
            <div className="w-full justify-between md:flex md:flex-col md:gap-4">
              <CardContentSlide slide={slide} />
              <CardNextSlide
                slideNext={props.slideNext}
                gotoNext={props.gotoNext}
              />
            </div>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

export default BannerCardSlide
