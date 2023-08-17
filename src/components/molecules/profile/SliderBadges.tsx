import { Divider } from "@mui/material"
import React, { useMemo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import { v4 as uuid } from "uuid"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { IBadge } from "@src/types/profile"
import useGetBadge from "@feature/badge/containers/hook/useGetBadge"

const BadgePlaceholder = dynamic(
  () => import("@components/atoms/svg/BadgePlaceholder"),
  {
    suspense: true,
    ssr: false
  }
)
const ButtonSticky = dynamic(
  () => import("@components/molecules/ButtonSticky"),
  {
    suspense: true,
    ssr: false
  }
)
const CheckBoxNaka = dynamic(
  () => import("@components/atoms/checkBox/CheckBoxNaka"),
  {
    suspense: true,
    ssr: false
  }
)
const CrumbCustom = dynamic(() => import("@components/atoms/CrumbCustom"), {
  suspense: true,
  ssr: false
})
const TooltipsCustom = dynamic(
  () => import("@components/atoms/TooltipsCustom"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})
const Image = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: true
})

interface IProp {
  _playerId: string
}
const SliderBadges = ({ _playerId }: IProp) => {
  const [openBadges, setOpenBadges] = useState<boolean>(false)
  const { getBadgeData } = useGetBadge(_playerId)
  // const { getBadgeData } = useGetBadge("61d51db5e64c9751321a8ecc")
  const [isLoading] = useState<boolean>(false)
  const { t } = useTranslation()

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
  const showSlide = 5
  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    draggable: true,
    dots: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const [slideArray, setSlideArray] = useState<IBadge[] | React.ReactElement[]>(
    Array.from(Array(5), (_) => (
      <motion.div
        key={uuid()}
        className="!grid !h-[250px] !content-center !justify-center"
        whileHover={{ rotate: 15 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 4
        }}
      >
        <BadgePlaceholder key={uuid()} />
      </motion.div>
    ))
  )

  useMemo(() => {
    if (getBadgeData && getBadgeData.badges.length <= 5) {
      getBadgeData.badges.map((data, index) => {
        slideArray[index] = data
        const newData = slideArray
        return setSlideArray(newData)
      })
    } else if (getBadgeData && getBadgeData.badges) {
      setSlideArray(getBadgeData.badges)
    }
  }, [getBadgeData, slideArray])

  return (
    <>
      <div className="relative mt-[90px] grid md:flex md:items-center md:justify-between">
        <div className="flex ">
          <CrumbCustom
            text={t("my_emblems_are_more")}
            className="mr-4 cursor-default border border-solid border-neutral-700 p-[20px] text-neutral-400"
          />
          {getBadgeData && (
            <CrumbCustom
              text={`${
                getBadgeData.badges.length > 1
                  ? `${getBadgeData.badges.length} ${t("Badges")}`
                  : `${getBadgeData.badges.length} ${t("Badge")}`
              } `}
              className="cursor-default bg-error-main"
            />
          )}
        </div>
        <Divider className="w-[40%]" />
        <div className="my-4 flex items-center md:my-0">
          <CheckBoxNaka
            value={openBadges}
            onHandle={handleOnExpandClick}
            text={t("hide_my_emblems")!}
            className="mr-4 items-center self-center uppercase"
            fontStyle="text-xs text-black-default"
          />
          <CrumbCustom
            text={t("view_emblems_info")}
            className="cursor-default bg-purple-primary"
          />
        </div>
        <div className="bottom-[20px] right-[20px] z-[5] flex flex-col items-center justify-center md:fixed">
          <ButtonSticky icon={<Icomoon className="icon-Headset" />} />
          <ButtonSticky
            multi
            notify
          />
        </div>
      </div>

      {openBadges ? null : (
        <>
          <div className="mt-[30px] flex h-[216px] !max-w-[280] items-center rounded-lg border border-neutral-700 bg-neutral-800 md:!max-w-[400] lg:!max-w-[1050px] ">
            {isLoading
              ? "loading"
              : slideArray.length && (
                  <Slider
                    ref={sliderRef}
                    {...settings}
                    className="!w-full"
                  >
                    {slideArray &&
                      slideArray.map((badge) => {
                        if ("name" in badge) {
                          return (
                            <TooltipsCustom
                              placement="top"
                              title={badge.name}
                              color="error"
                              key={uuid()}
                            >
                              <motion.div
                                className="!grid !h-[250px] !content-center !justify-center"
                                key={uuid()}
                                whileHover={{ rotate: 15 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 4
                                }}
                              >
                                <Image
                                  src={badge.image}
                                  alt={badge.name}
                                  width={120}
                                  height={150}
                                />
                              </motion.div>
                            </TooltipsCustom>
                          )
                        }
                        return badge as React.ReactElement
                      })}
                  </Slider>
                )}
          </div>
          <div className="arrow-slick-container bg-black mt-8 grid h-10 w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary">
            <button
              type="button"
              aria-label="Previous Slide"
              className="flex h-full w-full items-center justify-center"
              onClick={onSlidePrev}
            >
              <Icomoon className="icon-Full-Arrow-Left" />
            </button>
            <button
              type="button"
              aria-label="Previous Slide"
              className="flex h-full w-full items-center justify-center"
              onClick={onSlideNext}
            >
              <Icomoon className="icon-Full-Arrow-Right" />
            </button>
          </div>
        </>
      )}
      <div />
    </>
  )
}

export default SliderBadges
