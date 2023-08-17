import useGetGames from "@feature/home/containers/hook/useGetGames"
import dynamic from "next/dynamic"
import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"

const SkeletonBanner = dynamic(
  () => import("@components/atoms/skeleton/SkeletonBanner")
)
const GameCardSlide = dynamic(
  () => import("@src/features/slider/components/organisms/GameCardSlide")
)

const GameSlide = () => {
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
  const gotoPrev = () => {
    sliderRef?.current?.slickPrev()
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
    dots: false
  }

  return (
    <section className="relative w-full overflow-hidden">
      {isLoading ? (
        <SkeletonBanner />
      ) : (
        slideGames?.length && (
          <Slider
            ref={sliderRef}
            {...settings}
          >
            {slideGames &&
              slideGames.slice(0, 5).map((slide, index) => (
                <div key={slide.id}>
                  {slide[index] !== undefined ? (
                    <GameCardSlide
                      slide={slide}
                      slideNext={
                        index === 4 ? slideGames[0] : slideGames[index + 1]
                      }
                      gotoNext={gotoNext}
                      gotoPrev={gotoPrev}
                    />
                  ) : (
                    <GameCardSlide
                      slide={slide}
                      slideNext={slideGames[index + 1]}
                      gotoNext={gotoNext}
                      gotoPrev={gotoPrev}
                    />
                  )}
                </div>
              ))}
          </Slider>
        )
      )}
    </section>
  )
}

export default GameSlide
