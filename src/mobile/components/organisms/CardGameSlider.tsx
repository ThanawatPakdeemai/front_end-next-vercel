import React, { useRef } from "react"
import { Image } from "@components/atoms/image/index"
import Slider, { Settings } from "react-slick"
import { IGame } from "@feature/game/interfaces/IGameService"

interface IProps {
  games: IGame[]
}
const CardGameSlider = ({ games }: IProps) => {
  const sliderRef = useRef<Slider>(null)

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
            {games &&
              games.slice(0, 5).map((item) => (
                <div key={item.id}>
                  <Image
                    className="h-[204px] w-[908px] rounded-[20px] object-cover"
                    src={item.image_banner}
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

export default CardGameSlider
