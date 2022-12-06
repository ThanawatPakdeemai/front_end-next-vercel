import useGetGames from "@feature/home/containers/hook/useGetGames"
import React from "react"
import Slider, { Settings } from "react-slick"
import BannerCardSlide from "../../molecules/bannerCardSlide/BannerCardSlide"

const BannerSlide = () => {
  /**
   * @description get slide games
   */
  const { slideGames } = useGetGames()

  /**
   * @description swiper options
   */
  const settings = {
    slidesToShow: 1,
    fade: true,
    swipeToSlide: true
  }

  return (
    <section
      className="w-full"
      // {...props}
    >
      <Slider {...settings}>
        {slideGames &&
          slideGames.slice(0, 11).map((slide, index) => (
            <div key={slide.id}>
              <BannerCardSlide
                slide={slide}
                slideNext={index === 4 ? slideGames[0] : slideGames[index + 1]}
              />
            </div>
          ))}
      </Slider>
    </section>
  )
}

export default BannerSlide
