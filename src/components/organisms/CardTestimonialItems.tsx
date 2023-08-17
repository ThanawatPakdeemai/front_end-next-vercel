/* eslint-disable no-unused-vars */
import React, { useRef } from "react"
import { Box, SxProps, Theme } from "@mui/material"
import { v4 as uuidv4 } from "uuid"
import Slider, { Settings } from "react-slick"
import { IList } from "@feature/become-developer/interfaces/IWebBecome"
import dynamic from "next/dynamic"

const CardTestimonialItem = dynamic(
  () => import("@components/molecules/CardTestimonialItem")
)
const GameCarouselHeader = dynamic(
  () => import("@components/molecules/gameSlide/GameCarouselHeader")
)

interface IButtonData {
  text: string
  link: string
}

interface ICardTestimonialItemsProps {
  items: IList[]
  sxCustomStyled?: SxProps<Theme>
  isSlider?: boolean
  buttonData?: IButtonData
}
const CardTestimonialItems = ({
  items,
  sxCustomStyled,
  isSlider = false,
  buttonData
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
      image={item.image_url}
      text={item.detail}
      name={item.title}
      position={item.sub_title}
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
