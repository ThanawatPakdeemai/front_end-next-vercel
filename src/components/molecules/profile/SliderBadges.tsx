import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import CrumbCustom from "@components/atoms/CrumbCustom"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import { Divider } from "@mui/material"
import React, { useRef, useState } from "react"
import Slider, { Settings } from "react-slick"

const SliderBadges = () => {
  const [openBadges, setOpenBadges] = useState<boolean>(false)
  const handleOnExpandClick = () => {
    setOpenBadges(!openBadges)
  }
  const sliderRef = useRef<Slider>(null)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    draggable: true,
    dots: true
  }
  return (
    <>
      <div className="mt-[90px] flex items-center justify-between">
        <div className="flex">
          <CrumbCustom
            text="My emblems are more than just symbols"
            background="text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-4"
          />
          <CrumbCustom
            text="3 Badges"
            background=" bg-error-main"
          />
        </div>
        <Divider className="w-[40%]" />
        <div className="flex items-center">
          <CheckBoxNaka
            value={openBadges}
            onHandle={handleOnExpandClick}
            text="Hide my emblems"
            className="mr-4 items-center self-center uppercase"
            fontStyle="text-xs text-black-default"
          />
          <CrumbCustom
            text="View Emblems info"
            background="bg-purple-primary"
          />
        </div>
      </div>
      {openBadges ? null : (
        <>
          <div className="mt-[30px] h-[216px] rounded-lg bg-neutral-700">
            <Slider
              ref={sliderRef}
              {...settings}
              className="!w-[1080px]"
            >
              <div className="h-[220px]">text</div>
              <IconArrowLeft />
              <IconArrowLeft />
              <IconArrowLeft />
              <IconArrowLeft />
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowLeft />
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowRight />
              <IconArrowRight />
            </Slider>
          </div>
          <div className="arrow-slick-container bg-black mt-8 grid h-10 w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary">
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={onSlidePrev}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={onSlideNext}
            >
              <IconArrowRight />
            </button>
          </div>
        </>
      )}
      <div />
    </>
  )
}

export default SliderBadges
