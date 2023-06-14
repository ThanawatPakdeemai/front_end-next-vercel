import ButtonIcon from "@components/atoms/button/ButtonIcon"
import { iconmotion } from "@components/organisms/Footer"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import { Box, SxProps } from "@mui/material"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import EastIcon from "@mui/icons-material/East"
import WestIcon from "@mui/icons-material/West"
import {
  SlickArrowCSS,
  SlickAvatarThumbnail,
  SlickDefaultThumbnail,
  SlickMainSlideCSS,
  SlickSingleSlideAvatarCSS,
  StyleArrowAvatar,
  StyleArrowDefault
} from "@feature/slider/constants/HorizontalThumbSlide"
import VerticalThumbCardSlide from "../organisms/VerticalThumbCardSlide"
import VerticalThumbSmallCardSlide from "../organisms/VerticalThumbSmallCardSlide"

export type SliderType = "avatar" | "default"

interface IHorizontalThumbSlideProps {
  items: IVerticalThumbSlide[]
  sliderType?: SliderType
  settingSingle?: Settings
  settingThumbnail?: Settings
  currentSelected?: number
  slidesToScrollCustom?: number
}

const HorizontalThumbSlide = ({
  items,
  sliderType = "default",
  settingSingle,
  settingThumbnail,
  currentSelected,
  slidesToScrollCustom
}: IHorizontalThumbSlideProps) => {
  const [nav1, setNav1] = useState<Slider | null>()
  const [nav2, setNav2] = useState<Slider | null>()

  const sliderRef = useRef<Slider>(null)
  const sliderRef1 = useRef<Slider>(null)

  const onSlideTo = useCallback(() => {
    sliderRef?.current?.slickGoTo(Number(currentSelected), false)
    sliderRef1?.current?.slickGoTo(Number(currentSelected), false)
    setNav1(sliderRef?.current)
    setNav2(sliderRef1?.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSelected,
    sliderRef?.current,
    sliderRef1?.current,
    setNav1,
    setNav2
  ])

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
    sliderRef1?.current?.slickNext()
  }

  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
    sliderRef1?.current?.slickPrev()
  }

  useEffect(() => {
    onSlideTo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelected, onSlideTo])

  /**
   * @description Get style for single slide
   * @returns
   */
  const getStyleSingleSlide = (): SxProps => {
    switch (sliderType) {
      case "avatar":
        return SlickSingleSlideAvatarCSS
      default:
        return SlickMainSlideCSS
    }
  }

  const getStyleMultipleSlide = (): SxProps => {
    switch (sliderType) {
      case "avatar":
        return SlickAvatarThumbnail
      default:
        return SlickDefaultThumbnail
    }
  }

  /**
   * @description Slider classes Tailwind
   */
  const getStyleSingleSlideClasses = (): string => {
    switch (sliderType) {
      case "avatar":
        return "flex h-[80px] w-[80px] flex-col justify-center overflow-hidden rounded-2xl p-[6px] border-2 border-[#F42728] rounded-[14px]"
      default:
        return "flex h-[60vw] w-full flex-col justify-center overflow-hidden rounded-2xl md:h-[479px] lg:max-w-[852px]"
    }
  }

  const getStyleArrow = () => {
    switch (sliderType) {
      case "avatar":
        return StyleArrowAvatar
      default:
        return StyleArrowDefault
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
    arrows: false,
    ...settingSingle
  }

  const settingSlideThumbnail: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: sliderType === "avatar" ? 4 : 8,
    slidesToScroll: slidesToScrollCustom || 4,
    arrows: true,
    vertical: false,
    focusOnSelect: true,
    dots: false,
    centerPadding: sliderType === "avatar" ? "0px" : "10px",
    centerMode: false,
    rows: 1,
    variableWidth: true,
    prevArrow: (
      <Box
        component="div"
        sx={getStyleArrow()}
        onClick={() => onSlidePrev()}
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
        sx={getStyleArrow()}
        onClick={() => onSlideNext()}
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
    ),
    ...settingThumbnail
  }

  return (
    <div className="horizontal-thumb-slide my-4 flex w-full flex-col items-center justify-between gap-4">
      <Box
        component="div"
        sx={getStyleSingleSlide()}
        className={getStyleSingleSlideClasses()}
      >
        <Slider
          asNavFor={nav2 as Slider}
          ref={sliderRef}
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
        sx={getStyleMultipleSlide()}
        className="slick-thunbmail__wrapper relative mt-4 flex w-full max-w-[613px] justify-center"
      >
        <Slider
          asNavFor={nav1 as Slider}
          ref={sliderRef1}
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
