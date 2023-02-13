import { IGameDownloadSlide } from "@feature/slider/interfaces/ISlides"
import { Skeleton } from "@mui/material"
import React from "react"
import Slider, { Settings } from "react-slick"
import CarouselCardSlide from "../organisms/CarouselCardSlide"

interface ICarouselSlideProps {
  slideGames: IGameDownloadSlide[]
  isLoading: boolean
}

const CarouselSlide = ({ slideGames, isLoading }: ICarouselSlideProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  /**
   * @description Slider settings
   */
  const settings: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    fade: true,
    pauseOnHover: false,
    dots: true,
    arrows: false,
    afterChange(currentSlide) {
      setActiveIndex(currentSlide)
    }
  }

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        className="h-[476px] w-full rounded-md"
      />
    )
  }

  return (
    <Slider {...settings}>
      {slideGames &&
        slideGames.slice(0, 5).map((item, index) => (
          <div key={item.id}>
            <CarouselCardSlide
              // video={index === 1}
              // src={index === 1 ? "" : item.image_home_banner}
              src={item.image}
              name={item.name}
              description={item.description}
              link={item.download_link}
              index={index}
              activeIndex={activeIndex}
            />
          </div>
        ))}
    </Slider>
  )
}

export default CarouselSlide
