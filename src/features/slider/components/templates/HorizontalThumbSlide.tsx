import { Box, SxProps, Theme } from "@mui/material"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Slider, { CustomArrowProps, Settings } from "react-slick"
import dynamic from "next/dynamic"
import { IVerticalThumbSlide } from "@feature/slider/interfaces/ISlides"
import {
  SlickAvatarThumbnail,
  SlickDefaultThumbnail,
  SlickMainSlideCSS,
  SlickSingleSlideAvatarCSS,
  StyleArrowAvatar,
  StyleArrowDefault
} from "@feature/slider/constants/HorizontalThumbSlide"
import { Icomoon } from "@components/atoms/icomoon"

const VerticalThumbCardSlide = dynamic(
  () =>
    import("@src/features/slider/components/organisms/VerticalThumbCardSlide")
)
const VerticalThumbSmallCardSlide = dynamic(
  () =>
    import(
      "src/features/slider/components/organisms/VerticalThumbSmallCardSlide"
    )
)

export type SliderType = "avatar" | "default"

interface IHorizontalThumbSlideProps {
  items: IVerticalThumbSlide[]
  sliderType?: SliderType
  settingSingle?: Settings
  settingThumbnail?: Settings
  currentSelected?: number
  slidesToScrollCustom?: number
}

const SlickArrowLeft = ({
  sx,
  ...props
}: CustomArrowProps & { sx?: SxProps<Theme> }) => (
  <Box
    component="button"
    sx={sx}
    onClick={props.onClick}
    className="absolute left-[-70px] top-[10px] h-[40px] w-[40px] rounded-[8px] border-[1px] border-[#232329] bg-[#18181C]"
  >
    <Icomoon className="icon-app icon-Arrow---Left" />
  </Box>
)

const SlickArrowRight = ({
  sx,
  ...props
}: CustomArrowProps & { sx?: SxProps<Theme> }) => (
  <Box
    component="button"
    sx={sx}
    onClick={props.onClick}
    className="absolute right-[-70px] top-[10px] h-[40px] w-[40px] rounded-[8px] border-[1px] border-[#232329] bg-[#18181C]"
  >
    <Icomoon className="icon-app icon-Arrow---Right" />
  </Box>
)

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
        return "flex h-[80px] w-[80px] flex-col justify-center rounded-2xl p-[6px] border-2 border-[#F42728] rounded-[14px]"
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
    arrows: true,
    prevArrow: (
      <SlickArrowLeft
        sx={getStyleArrow()}
        onClick={() => onSlidePrev()}
      />
    ),
    nextArrow: (
      <SlickArrowRight
        sx={getStyleArrow()}
        onClick={() => onSlideNext()}
      />
    ),
    ...settingSingle
  }

  const settingSlideThumbnail: Settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: sliderType === "avatar" ? 4 : 8,
    slidesToScroll: sliderType === "avatar" ? 1 : slidesToScrollCustom || 4,
    // slidesToScroll: 1,
    arrows: false,
    vertical: false,
    focusOnSelect: true,
    dots: false,
    centerPadding: sliderType === "avatar" ? "0px" : "10px",
    centerMode: true,
    rows: 1,
    variableWidth: true,
    ...settingThumbnail
  }

  return (
    <div className="horizontal-thumb-slide my-4 flex w-full flex-col items-center justify-between gap-4">
      <Box
        component="div"
        sx={getStyleSingleSlide()}
        className={getStyleSingleSlideClasses()}
      >
        {items.length && (
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
        )}
      </Box>
      <Box
        component="div"
        sx={getStyleMultipleSlide()}
        className="slick-thumbnail__wrapper relative mt-4 flex w-full justify-center"
      >
        {items.length && (
          <Slider
            asNavFor={nav1 as Slider}
            ref={sliderRef1}
            {...settingSlideThumbnail}
            className="h-[84px] w-full"
          >
            {items &&
              items.map((item) => (
                <VerticalThumbSmallCardSlide
                  key={item.id}
                  item={item}
                />
              ))}
          </Slider>
        )}
      </Box>
    </div>
  )
}

export default HorizontalThumbSlide
