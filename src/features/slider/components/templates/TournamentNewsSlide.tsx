import React from "react"
import Slider, { Settings } from "react-slick"
import TournamentNewsCardSlide from "../organisms/TournamentNewsCardSlide"

const TournamentNewsSlide = () => {
  const mockupNews = [
    {
      title:
        "APPLY YOUR SKILLS IN A GROWING MARKET. COUNTLESS OPPORTUNITIES TO EARN AND LEARN.",
      description:
        "Deploy your skills in a way that matters. Web3 is rapidly growing and there are abundant opportunties to enter early. Developers can deploy games in the Nakamoto Games marketplace and earn in perpetutity. The marketplace functions similarly to the Google Play Store but with developers holding complete control over monetization. Start building today.",
      image: "/images/tounament/Thumbnail_Sqaure.png",
      path: "/"
    },
    {
      title:
        "APPLY YOUR SKILLS IN A GROWING MARKET. COUNTLESS OPPORTUNITIES TO EARN AND LEARN.",
      description:
        "Deploy your skills in a way that matters. Web3 is rapidly growing and there are abundant opportunties to enter early. Developers can deploy games in the Nakamoto Games marketplace and earn in perpetutity. The marketplace functions similarly to the Google Play Store but with developers holding complete control over monetization. Start building today.",
      image: "/images/home/table-com.svg",
      path: "/"
    }
  ]

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
      <Slider {...settings}>
        {mockupNews &&
          mockupNews.map((slide, index) => (
            <div key={Number(index)}>
              <TournamentNewsCardSlide slide={slide} />
            </div>
          ))}
      </Slider>
    </section>
  )
}

export default TournamentNewsSlide
