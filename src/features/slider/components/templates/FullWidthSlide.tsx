import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { Box, SxProps } from "@mui/material"
import dynamic from "next/dynamic"
import React from "react"
import Slider, { Settings } from "react-slick"

const VerticalThumbCardSlide = dynamic(
  () => import("../organisms/VerticalThumbCardSlide"),
  {
    suspense: true,
    ssr: false
  }
)

interface IFullWidthSlideProps {
  items: IVerticalThumbSlide[]
}

const FullWidthSlide = ({ items }: IFullWidthSlideProps) => {
  // const [nav1, setNav1] = useState<Slider | undefined | null>()
  // const [nav2, setNav2] = useState<Slider | undefined | null>()

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
    fade: false,
    pauseOnHover: false,
    dots: false,
    arrows: false
  }

  return (
    <Box
      component="div"
      sx={{
        "&.fullwidth-slide": {
          position: "absolute",
          width: "calc(100% + 2rem)",
          top: "-1rem",
          margin: "0",
          left: "-1rem",
          height: "calc(100% + 2rem)"
        }
      }}
      className="fullwidth-slide my-4 flex w-full flex-col items-center justify-between gap-4"
    >
      <Box
        component="div"
        sx={SlickMainSlideCSS}
        className="flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl"
      >
        {items.length && (
          <Slider
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
        )}
      </Box>
    </Box>
  )
}

export default FullWidthSlide
