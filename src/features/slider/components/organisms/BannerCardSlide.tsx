import React from "react"
import { Box, Grid } from "@mui/material"
import Link from "next/link"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import { MobileView } from "react-device-detect"
import { IMAGES } from "@constants/images"
import { ICardNextSlide } from "../molecules/CardNextSlide"

const CardContentSlide = dynamic(
  () => import("../molecules/CardContentSlide"),
  {
    suspense: true,
    ssr: true
  }
)
const CardNextSlide = dynamic(() => import("../molecules/CardNextSlide"), {
  suspense: true,
  ssr: true
})
const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

export interface IBannerCardSlide extends ICardNextSlide {
  slide: IGame
}

const BannerCardSlide = ({ slide, ...props }: IBannerCardSlide) => {
  const {
    getGameMode,
    onHandleSetGameStore,
    isRedirectRoomlist,
    isWrongFormatURL,
    isOldPathURL
  } = useGlobal()

  return (
    <>
      {isMobile ? (
        <MobileView>
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
                >
                  <div className="slide-item--image h-full w-full overflow-hidden rounded-2xl">
                    <Link
                      href={`/${getGameMode(slide)}/${
                        slide.path
                      }${isRedirectRoomlist(slide).toString()}`}
                      onClick={() =>
                        onHandleSetGameStore(getGameMode(slide), slide)
                      }
                    >
                      <ImageCustom
                        height={1080}
                        width={1920}
                        src={
                          isWrongFormatURL(slide.image_home_banner) ||
                          isOldPathURL(slide.image_home_banner)
                            ? IMAGES.no_image.srcWebp
                            : slide.image_home_banner
                        }
                        alt={slide.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  </div>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </MobileView>
      ) : (
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
                    href={`/${getGameMode(slide)}/${
                      slide.path
                    }${isRedirectRoomlist(slide).toString()}`}
                    onClick={() =>
                      onHandleSetGameStore(getGameMode(slide), slide)
                    }
                  >
                    <ImageCustom
                      height={1080}
                      width={1920}
                      src={
                        isWrongFormatURL(slide.image_home_banner) ||
                        isOldPathURL(slide.image_home_banner)
                          ? IMAGES.no_image.srcWebp
                          : slide.image_home_banner
                      }
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
      )}
    </>
  )
}

export default BannerCardSlide
