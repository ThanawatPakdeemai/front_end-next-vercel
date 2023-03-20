import React, { useRef } from "react"
import CardTestimonialItem from "@components/molecules/CardTestimonialItem"
import { ITestimonialProps } from "@constants/testimonial"
import { Box, SxProps, Theme } from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import Slider, { Settings } from "react-slick"
import GameCarouselHeader from "@components/molecules/gameSlide/GameCarouselHeader"

interface ICardTestimonialItemsProps {
  items: ITestimonialProps[]
  sxCustomStyled?: SxProps<Theme>
  isSlider?: boolean
}
const CardTestimonialItems = ({
  items,
  sxCustomStyled,
  isSlider = false
}: ICardTestimonialItemsProps) => {
  /**
   * @description Slider ref
   */
  const sliderRef = useRef<Slider>(null)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  /**
   * @description Slider settings
   */
  const settings: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    draggable: true,
    pauseOnHover: false,
    variableWidth: false
  }

  const renderContent = items.map((item) => (
    <CardTestimonialItem
      key={uuidv4()}
      image={item.image}
      text={item.text}
      name={item.name}
      position={item.position}
    />
  ))

  return isSlider ? (
    <div className="md:mb-10">
      <GameCarouselHeader
        onNext={onSlideNext}
        onPrev={onSlidePrev}
      />
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {renderContent}
      </Slider>
    </div>
  ) : (
    <Box
      component="div"
      sx={sxCustomStyled}
      className="testimonial-items flex gap-4"
    >
      {renderContent}
    </Box>
  )
}

export default CardTestimonialItems
