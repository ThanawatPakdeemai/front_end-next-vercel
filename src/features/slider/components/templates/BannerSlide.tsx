/* eslint-disable no-nested-ternary */
import React, { useRef } from "react"
import SkeletonBanner from "@components/atoms/skeleton/SkeletonBanner"
import { TagCircle } from "@components/atoms/tagCircle"
import NewGameIcon from "@components/icons/NewGameIcon"
import useGetGames from "@feature/home/containers/hook/useGetGames"
import Slider, { Settings } from "react-slick"
import { Box } from "@mui/material"
import { isMobile } from "@hooks/useGlobal"
import BannerCardSlide from "../organisms/BannerCardSlide"

const BannerSlide = () => {
  /**
   * @description get slide games
   */
  const { slideGames, isLoading } = useGetGames()
  /**
   * @description Slider ref
   */
  const sliderRef = useRef<Slider>(null)
  const gotoNext = () => {
    sliderRef?.current?.slickNext()
  }
  /**
   * @description Slider settings
   */
  const settings: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    fade: true,
    pauseOnHover: false,
    dots: true
  }

  return (
    <section
      className={`relative w-full overflow-hidden ${!isMobile && "mb-10"}`}
    >
      {!isMobile && (
        <div className="absolute left-4 top-4 z-10">
          <TagCircle
            color="secondary"
            icon={<NewGameIcon />}
          />
        </div>
      )}
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        <Box
          component="div"
          className={`${isMobile && "slick-slider-dot-right"}`}
        >
          <Slider
            ref={sliderRef}
            {...settings}
          >
            {slideGames &&
              slideGames.slice(0, 5).map((slide, index) => (
                <div key={slide.id}>
                  {/* {slide[index] !== undefined ? (
                    <BannerCardSlide
                      slide={slide}
                      slideNext={
                        index === 4 ? slideGames[0] : slideGames[index + 1]
                      }
                      gotoNext={gotoNext}
                    />
                  ) : (
                    <BannerCardSlide
                      slide={slide}
                      slideNext={slideGames[index + 1]}
                      gotoNext={gotoNext}
                    />
                  )} */}
                  {/* <BannerCardSlide
                    slide={slide}
                    slideNext={
                      slide[index + 1] !== undefined
                        ? slideGames[0]
                        : index >= slideGames.length - 1
                        ? slideGames[0]
                        : slideGames[index + 1]
                    }
                    gotoNext={gotoNext}
                  /> */}
                  <BannerCardSlide
                    slide={slide}
                    slideNext={slideGames[index + 1] || slideGames[0]}
                    gotoNext={gotoNext}
                  />
                </div>
              ))}
          </Slider>
        </Box>
      )}
    </section>
  )
}

export default BannerSlide
