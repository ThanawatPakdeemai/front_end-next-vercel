import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { Box, SxProps } from "@mui/material"
import React, { useState } from "react"
import Slider, { Settings } from "react-slick"
import VerticalThumbCardSlide from "../organisms/VerticalThumbCardSlide"
import VerticalThumbSmallCardSlide from "../organisms/VerticalThumbSmallCardSlide"

interface IVerticalThumbSlideProps {
  items: IVerticalThumbSlide[]
}

const SlickSlideBoxCSS: SxProps = {
  ".slick-slider, .slick-list, .slick-track": {
    height: "100%"
  }
}

const VerticalThumbSlide = ({ items }: IVerticalThumbSlideProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [nav1, setNav1] = useState<Slider | undefined | null>()
  const [nav2, setNav2] = useState<Slider | undefined | null>()

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

  const settingSlideThumbnail: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    swipeToSlide: true,
    focusOnSelect: true,
    afterChange(currentSlide) {
      setActiveIndex(currentSlide)
    }
  }

  return (
    <div className="my-4 flex w-full items-center justify-between">
      <Box
        sx={SlickSlideBoxCSS}
        className="flex h-[390px] w-full max-w-[592px] flex-col justify-center overflow-hidden rounded-2xl"
      >
        <Slider
          asNavFor={nav2 as Slider}
          ref={(slider1) => setNav1(slider1)}
          {...settings}
          className="banner"
        >
          {items &&
            items.map((item, index) => (
              <VerticalThumbCardSlide
                item={item}
                key={item.id}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
        </Slider>
      </Box>
      <Box className="flex h-[390px] w-[80px] flex-col rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-1">
        <Slider
          asNavFor={nav1 as Slider}
          ref={(slider2) => setNav2(slider2)}
          {...settingSlideThumbnail}
        >
          {items &&
            items.map((item, index) => (
              <VerticalThumbSmallCardSlide
                item={item}
                key={item.id}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
        </Slider>
      </Box>
    </div>
  )
}

export default VerticalThumbSlide
