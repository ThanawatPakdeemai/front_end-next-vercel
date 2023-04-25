import { IGameDownloadSlide } from "@feature/slider/interfaces/ISlides"
import { Box, Skeleton } from "@mui/material"
import React from "react"
import Slider, { Settings } from "react-slick"
import { useTranslation } from "react-i18next"
import CarouselCardSlide from "../organisms/CarouselCardSlide"

interface ICarouselSlideProps {
  slideGames: IGameDownloadSlide[]
  isLoading: boolean
}

const CarouselSlide = ({ slideGames, isLoading }: ICarouselSlideProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const { t } = useTranslation()

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
          <Box
            component="div"
            sx={{
              height: "476px"
            }}
            key={item.id}
          >
            <CarouselCardSlide
              src={item.image}
              name={item.name}
              description={t(item.description)}
              link={item.download_link}
              index={index}
              activeIndex={activeIndex}
            />
          </Box>
        ))}
    </Slider>
  )
}

export default CarouselSlide
