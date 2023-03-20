import React, { useRef } from "react"
import { Image } from "@components/atoms/image/index"
import Slider, { Settings } from "react-slick"

const CardTournamentSlider = () => {
  // const { slideGames, isLoading } = useGetGames()
  const sliderRef = useRef<Slider>(null)
  // const gotoNext = () => {
  //   sliderRef?.current?.slickNext()
  // }

  const tournamentmock = [
    {
      id: "1",
      img: "/images/banner/tournament.webp"
    },
    {
      id: "1",
      img: "/images/banner/staking.webp"
    },
    {
      id: "1",
      img: "/images/banner/nakamoto.webp"
    },
    {
      id: "1",
      img: "/images/banner/nakaMarket.webp"
    },
    {
      id: "1",
      img: "/images/banner/blog.webp"
    }
  ]

  const settings: Settings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 500,
    draggable: true,
    fade: true,
    pauseOnHover: false,
    dots: true
  }
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-center">
        <div className="mt-5 w-full md:mt-0 xl:w-[908px]">
          <Slider
            ref={sliderRef}
            {...settings}
          >
            {tournamentmock &&
              tournamentmock.slice(0, 5).map((item) => (
                <div key={item.id}>
                  <Image
                    className="h-[204px] w-[908px] rounded-[20px] object-cover"
                    src={item.img}
                    width={908}
                    height={204}
                    alt="alt"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default CardTournamentSlider
