import React, { useRef } from "react"
import Slider, { Settings } from "react-slick"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"

const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

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
          {games.length && (
            <Slider
              ref={sliderRef}
              {...settings}
            >
              {games &&
                games.slice(0, 5).map((item) => (
                  <div key={item.id}>
                    <Image
                      className="h-[204px] w-[908px] rounded-[20px] object-cover object-center"
                      src={item.image_category_list}
                      width={908}
                      height={204}
                      alt={item.name}
                    />
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardGameSlider
