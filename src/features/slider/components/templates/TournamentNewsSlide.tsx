import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import TournamentNewsCardSlide from "../organisms/TournamentNewsCardSlide"

const TournamentNewsSlide = () => {
  const mockupNews = [
    {
      title: "HEAVEN FOR DEVELOPERS: UNLIMITED OPPORTUNITIES YOUR WAY 👀",
      description:
        "Just like mobile app developers deploy their applications on the Google Play Store, gaming developers now have access to the Nakamoto User Base - an all-in-one exclusive platform to launch their very own Play to Earn games. Now monetize your game in any way you want with our versatile platform and explore the array of interesting possibilities that Nakamoto Games has on board for skilled developers like you!",
      image: "/images/home/table-com.svg",
      path: "/"
    },
    {
      title: "HEAVEN FOR DEVELOPERS: UNLIMITED OPPORTUNITIES YOUR WAY 👀",
      description:
        "Just like mobile app developers deploy their applications on the Google Play Store, gaming developers now have access to the Nakamoto User Base - an all-in-one exclusive platform to launch their very own Play to Earn games. Now monetize your game in any way you want with our versatile platform and explore the array of interesting possibilities that Nakamoto Games has on board for skilled developers like you!",
      image: "/images/home/table-com.svg",
      path: "/"
    }
  ]
  /**
   * @description Slider ref
   */
  const sliderRef = useRef<Slider>(null)
  /**
   * @description Slider settings
   */
  const settings: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    draggable: true,
    fade: true,
    pauseOnHover: false,
    dots: true
  }

  return (
    <section className="relative w-full overflow-hidden lg:w-[907px]">
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {mockupNews &&
          mockupNews.slice(0, 5).map((slide, index) => (
            <div key={Number(index)}>
              <TournamentNewsCardSlide slide={slide} />
            </div>
          ))}
      </Slider>
    </section>
  )
}

export default TournamentNewsSlide
