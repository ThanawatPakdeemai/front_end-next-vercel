import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import NewsCardSlide from "../organisms/NewsCardSlide"

const NewsSlide = () => {
  const mockupNews = [
    {
      title: "Nakama Network",
      description:
        "Nakama Network is a decentralized gaming platform that allows players to earn NAKA tokens by playing games, staking NAKA tokens, and participating in the NAKA ecosystem.",
      image: "/images/home/table-com.svg",
      path: "/"
    },
    {
      title: "Nakama Network",
      description: "Nakama Network is a decentralized gaming platform",
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
    <section className="relative w-full overflow-hidden md:w-[907px]">
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {mockupNews &&
          mockupNews.slice(0, 5).map((slide, index) => (
            <div key={Number(index)}>
              <NewsCardSlide slide={slide} />
            </div>
          ))}
      </Slider>
    </section>
  )
}

export default NewsSlide
