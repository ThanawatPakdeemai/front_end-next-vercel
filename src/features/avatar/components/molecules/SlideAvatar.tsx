/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import { Box } from "@mui/material"
import React, { memo, useEffect, useMemo, useRef } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { IAvatar } from "@feature/avatar/interfaces/IAvatarService"

const ArrowBackIcon = dynamic(() => import("@mui/icons-material/ArrowBack"), {
  suspense: true,
  ssr: false
})
const ArrowForwardIcon = dynamic(
  () => import("@mui/icons-material/ArrowForward"),
  {
    suspense: true,
    ssr: false
  }
)
const AvatarProfile = dynamic(
  () => import("@components/atoms/avatar/AvatarProfile"),
  {
    suspense: true,
    ssr: false
  }
)

interface IProp {
  avatar: IAvatar[]
  defaultAvatar: string
  slideTo: () => void
  setDefaultAvatar: (value: string) => void
}

const SlideAvatar = ({
  avatar,
  defaultAvatar,
  slideTo,
  setDefaultAvatar
}: IProp) => {
  const sliderRef = useRef<Slider>(null)

  const indexAvatar = useMemo(
    () => avatar.findIndex((item) => item.value === defaultAvatar),
    [avatar, defaultAvatar]
  )
  const onSlideTo = () => {
    slideTo()
    sliderRef?.current?.slickGoTo(Number(indexAvatar), false)
  }

  const valueAvatar = useMemo(
    () => avatar.find((item) => item.value === defaultAvatar)?.value,
    [avatar, defaultAvatar]
  )

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }

  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  useEffect(() => {
    onSlideTo()
  }, [onSlideTo, valueAvatar])

  const settings = {
    infinite: true,
    lazy: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: indexAvatar,
    beforeChange: (current, next) => {
      if (avatar) {
        const _avatar = avatar.find((item, index) => index === next)
        if (_avatar) {
          setDefaultAvatar(_avatar.value)
          const element = document.getElementById(_avatar?.name)
          if (element) element.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    // afterChange: (current) => {
    //   setAction({ ...action, prev: current + 1 })
    // },
    prevArrow: (
      <>
        <Box
          component="div"
          onClick={() => onSlidePrev()}
          className="cursor-pointer rounded-xl !border-neutral-700 !bg-neutral-800 p-3"
        >
          <ArrowBackIcon className="   !text-neutral-200" />
        </Box>
      </>
    ),
    nextArrow: (
      <>
        <Box
          component="div"
          onClick={() => onSlideNext()}
          className="cursor-pointer rounded-xl !border-neutral-700 !bg-neutral-800 p-3"
        >
          <ArrowForwardIcon className="  !text-neutral-200" />
        </Box>
      </>
    )
  }

  return (
    <>
      {avatar.length && (
        <Slider
          ref={sliderRef}
          {...settings}
          className="!flex w-[350px] items-center justify-center gap-3"
        >
          {avatar &&
            avatar.map((item, index) => (
              <AvatarProfile
                key={Number(index)}
                borderColor="border-error-main"
                src={item.value}
              />
            ))}
        </Slider>
      )}
    </>
  )
}
export default memo(SlideAvatar)
