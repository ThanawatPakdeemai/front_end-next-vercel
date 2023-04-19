import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { iconmotion } from "@components/organisms/Footer"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { Box, SxProps } from "@mui/material"
import React, { useState } from "react"
import Slider, { Settings } from "react-slick"
import EastIcon from "@mui/icons-material/East"
import WestIcon from "@mui/icons-material/West"
import VerticalThumbCardSlide from "../organisms/VerticalThumbCardSlide"
import VerticalThumbSmallCardSlide from "../organisms/VerticalThumbSmallCardSlide"

interface IHorizontalThumbSlideProps {
  items: IVerticalThumbSlide[]
}

const HorizontalThumbSlide = ({ items }: IHorizontalThumbSlideProps) => {
  const [nav1, setNav1] = useState<Slider | undefined | null>()
  const [nav2, setNav2] = useState<Slider | undefined | null>()

  const SlickArrowCSS =
    "m-1 flex h-[50px] w-[50px] items-center justify-center rounded-lg  bg-neutral-800/60"

  const StyleArrow = {
    ".MuiSvgIcon-root": {
      fill: "white"
    },
    "&.slick-arrow": {
      top: "22px",
      "&.slick-prev": {
        "left": "-70px"
      },
      "&.slick-next": {
        "right": "-30px"
      },
      "&:before": {
        display: "none"
      }
    }
  }

  const SlickMainSlideCSS: SxProps = {
    ".slick-slider, .slick-list, .slick-track": {
      height: "100%"
    },
    ".slick-slide": {
      "& > div": {
        height: "100%",
        "& > .verticalThumb-slide__item": {
          height: "100%",
          "& > .verticalThumb-slide__item__image": {
            height: "100%",
            "& > img": {
              height: "100%"
            }
          }
        }
      }
    }
  }

  const SlickThumbnailSlideCSS: SxProps = {
    ".slick-list": {
      height: "70px",
      overflow: "hidden"
    },
    ".slick-slider": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      "& > .slick-list": {
        width: "100%"
      }
    },
    ".slick-slide": {
      opacity: 0.5,
      ".verticalSmallThumb-slide__item": {
        margin: "0 4px"
      },
      "&.slick-current.slick-active": {
        opacity: 1,
        ".MuiCardMedia-root": {
          borderColor: "#A0ED61"
        }
      }
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
    autoplay: false,
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
    slidesToShow: 8,
    arrows: true,
    vertical: false,
    focusOnSelect: true,
    dots: false,
    centerPadding: "10px",
    centerMode: false,
    rows: 1,
    variableWidth: true,
    prevArrow: (
      <Box
        component="div"
        sx={StyleArrow}
      >
        <ButtonIcon
          variants={iconmotion}
          whileHover="hover"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 4
          }}
          icon={<WestIcon />}
          className={SlickArrowCSS.toString()}
        />
      </Box>
    ),
    nextArrow: (
      <Box
        component="div"
        sx={StyleArrow}
      >
        <ButtonIcon
          variants={iconmotion}
          whileHover="hover"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 4
          }}
          icon={<EastIcon />}
          className={SlickArrowCSS.toString()}
        />
      </Box>
    )
  }

  return (
    <div className="horizontal-thumb-slide my-4 flex w-full flex-col items-center justify-between gap-4">
      <Box
        component="div"
        sx={SlickMainSlideCSS}
        className="flex h-[60vw] w-full flex-col justify-center overflow-hidden rounded-2xl md:h-[479px] lg:max-w-[852px]"
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
        className="relative mt-4 flex w-full max-w-[613px] justify-center"
      >
        <Slider
          asNavFor={nav1 as Slider}
          ref={(slider2) => setNav2(slider2)}
          {...settingSlideThumbnail}
          className="h-[84px] w-full rounded-2xl border-[1px] border-neutral-700 border-opacity-80 p-1"
        >
          {items &&
            items.map((item) => (
              <VerticalThumbSmallCardSlide
                key={item.id}
                item={item}
              />
            ))}
        </Slider>
      </Box>
    </div>
  )
}

export default HorizontalThumbSlide
