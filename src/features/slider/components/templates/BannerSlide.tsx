import { TagCircle } from "@components/atoms/tagCircle"
import NewGameIcon from "@components/icons/NewGameIcon"
import useGetGames from "@feature/home/containers/hook/useGetGames"
import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import BannerCardSlide from "../organisms/BannerCardSlide"

const BannerSlide = () => {
  /**
   * @description get slide games
   */
  const { slideGames } = useGetGames()
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
    <section className="relative w-full overflow-hidden">
      <div className="absolute left-4 top-4 z-10">
        <TagCircle
          color="secondary"
          icon={<NewGameIcon />}
        />
      </div>
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {slideGames &&
          slideGames.slice(0, 5).map((slide, index) => (
            <div key={slide.id}>
              {slide[index] !== undefined ? (
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
                  slideNext={slideGames[0]}
                  gotoNext={gotoNext}
                />
              )}
            </div>
          ))}
      </Slider>
    </section>
  )
}

export default BannerSlide
