import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { Box, SxProps } from "@mui/material"
import React, { useState } from "react"
import Slider, { Settings } from "react-slick"
import VerticalThumbCardSlide from "../organisms/VerticalThumbCardSlide"
import VerticalThumbSmallCardSlide from "../organisms/VerticalThumbSmallCardSlide"

interface IVerticalThumbSlideProps {
  items: IVerticalThumbSlide[]
}

const VerticalThumbSlide = ({ items }: IVerticalThumbSlideProps) => {
  const [nav1, setNav1] = useState<Slider | undefined | null>()
  const [nav2, setNav2] = useState<Slider | undefined | null>()

  const SlickMainSlideCSS: SxProps = {
    ".slick-slider, .slick-list, .slick-track": {
      height: "100%"
    }
  }

  const SlickThumbnailSlideCSS: SxProps = {
    ".slick-vertical .slick-current .card-media": {
      borderColor: "#A0ED61"
    },
    ".slick-vertical .slick-cloned": {
      display: `${items && items.length > 5 ? "block" : "none"}`
    }
  }

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
    dots: false,
    arrows: false
  }

  const settingSlideThumbnail: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    arrows: false,
    vertical: true,
    focusOnSelect: true,
    dots: false
  }

  return (
    <div className="my-4 flex w-full items-center justify-between gap-4 xl:min-w-[688px]">
      <Box
        component="div"
        sx={SlickMainSlideCSS}
        className="flex h-[60vw] w-full flex-col justify-center overflow-hidden rounded-2xl md:h-[390px] lg:max-w-[592px]"
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
              />
            ))}
        </Slider>
      </Box>
      <Box
        component="div"
        sx={SlickThumbnailSlideCSS}
        className="relative flex h-[60vw] w-[80px] flex-col overflow-hidden rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-1 md:h-[390px]"
      >
        <Slider
          asNavFor={nav1 as Slider}
          ref={(slider2) => setNav2(slider2)}
          {...settingSlideThumbnail}
        >
          {items &&
            items.map((item) => (
              <VerticalThumbSmallCardSlide
                item={item}
                key={item.id}
              />
            ))}
        </Slider>
        <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-neutral-900/0 to-neutral-900" />
      </Box>
    </div>
  )
}

export default VerticalThumbSlide
