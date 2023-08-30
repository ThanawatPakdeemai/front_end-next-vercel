/* eslint-disable no-nested-ternary */
import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import useGetGames from "@feature/home/containers/hook/useGetGames"

const BannerCardSlide = dynamic(() => import("../organisms/BannerCardSlide"), {
  suspense: true,
  ssr: false
})
const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner"),
  {
    suspense: true,
    ssr: false
  }
)
const TagCircle = dynamic(
  () => import("@components/atoms/tagCircle/TagCircle"),
  {
    suspense: true,
    ssr: false
  }
)
const NewGameIcon = dynamic(() => import("@components/atoms/svg/NewGame"), {
  suspense: true,
  ssr: false
})

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

  // eslint-disable-next-line no-console
  console.log("test-slideGames", slideGames)

  return (
    <section className="relative mb-20 w-full overflow-hidden">
      <div className="absolute left-4 top-4 z-10">
        <TagCircle
          color="secondary"
          icon={<NewGameIcon />}
        />
      </div>
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        <Box
          component="div"
          className="slick-slider-dot-right"
        >
          <Slider
            ref={sliderRef}
            {...settings}
          >
            {slideGames &&
              slideGames.slice(0, 5).map((slide, index) => (
                <div key={slide.id}>
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
