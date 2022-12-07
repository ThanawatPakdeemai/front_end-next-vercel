import { IGame } from "@feature/game/interfaces/IGameService"
import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import BannerCardSlide from "../../molecules/bannerCardSlide/bannerCardSlide"

interface IBannerSlide extends React.HTMLAttributes<HTMLDivElement> {
  slides: IGame[]
}

const BannerSlide = ({ slides }: IBannerSlide) => {
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
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {slides.slice(0, 5).map((slide, index) => (
          <div key={slide.id}>
            <BannerCardSlide
              slide={slide}
              slideNext={index === 4 ? slides[0] : slides[index + 1]}
              gotoNext={gotoNext}
            />
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default BannerSlide
