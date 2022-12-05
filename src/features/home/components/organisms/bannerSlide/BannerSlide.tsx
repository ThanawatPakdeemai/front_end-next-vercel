import useGetGames from "@feature/home/containers/hook/useGetGames"
import React from "react"
import {
  SwiperOptions,
  Navigation,
  Pagination,
  EffectFade,
  Autoplay
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
// eslint-disable-next-line import/no-unresolved
import "swiper/css"
// eslint-disable-next-line import/no-unresolved
import "swiper/css/autoplay"

import BannerCardSlide from "../../molecules/bannerCardSlide/BannerCardSlide"

const BannerSlide = () => {
  /**
   * @description get slide games
   */
  const { slideGames } = useGetGames()

  /**
   * @description swiper options
   */
  const settings: SwiperOptions = {
    slidesPerView: 1,
    // effect: "fade",
    navigation: true,
    autoplay: {
      delay: 4500
    },
    speed: 1000,
    loop: true
  }

  return (
    <section
      className="w-full"
      // {...props}
    >
      <Swiper
        {...settings}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
      >
        {slideGames &&
          slideGames.slice(0, 11).map((slide, index) => (
            <SwiperSlide
              id={`slide--${index}`}
              key={slide.id}
            >
              <BannerCardSlide
                slide={slide}
                slideNext={index === 4 ? slideGames[0] : slideGames[index + 1]}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

export default BannerSlide
