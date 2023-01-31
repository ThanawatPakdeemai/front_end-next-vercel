import CheckBoxNaka from "@components/atoms/checkBox/CheckBoxNaka"
import CrumbCustom from "@components/atoms/CrumbCustom"
import TooltipsCustom from "@components/atoms/TooltipsCustom"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import IconArrowRight from "@components/icons/arrowRightIcon"
import useGetBadge from "@feature/badge/containers/hook/useGetBadge"
import { Divider } from "@mui/material"
import Image from "next/image"
import React, { useMemo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import { v4 as uuid } from "uuid"
import { motion } from "framer-motion"
import BadgesPlacrhoder from "@components/icons/Banner/BadgesPlacrhoder"
import { IBadge } from "@src/types/profile"
import SupportIcon from "@components/icons/MenunIcon/SupportIcon"
import ButtonSticky from "../ButtonSticky"

interface IProp {
  _playerId: string
}
const SliderBadges = ({ _playerId }: IProp) => {
  const [openBadges, setOpenBadges] = useState<boolean>(false)
  const { getBadgeData } = useGetBadge(_playerId)
  // const { getBadgeData } = useGetBadge("61d51db5e64c9751321a8ecc")

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
    variableWidth: false
  }

  const [slideArray, setSlideArray] = useState<IBadge[] | React.ReactElement[]>(
    new Array(5).fill(
      <TooltipsCustom
        className="uppercase"
        placement="top"
        title="emblem info"
        color="warning"
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 4
          }}
        >
          <BadgesPlacrhoder key={uuid()} />
        </motion.div>
      </TooltipsCustom>
    )
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
      <div className="relative mt-[90px] flex items-center justify-between">
        <div className="flex">
          <CrumbCustom
            text="My emblems are more than just symbols"
            background="text-neutral-400 border border-solid border-neutral-700 p-[20px] mr-4"
          />
          {getBadgeData && (
            <CrumbCustom
              text={`${
                getBadgeData.badges.length > 1
                  ? `${getBadgeData.badges.length} Badges`
                  : `${getBadgeData.badges.length} Badge`
              } `}
              background=" bg-error-main"
            />
          )}
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
        <div className="absolute top-[180%] right-[-24%] z-[5] flex flex-col items-center justify-center">
          <ButtonSticky icon={<SupportIcon />} />
          <ButtonSticky
            multi
            notify
          />
        </div>
      </div>

      {openBadges ? null : (
        <>
          <div className="mt-[30px] flex h-[216px]  items-center rounded-lg border border-neutral-700 bg-neutral-800">
            <Slider
              ref={sliderRef}
              {...settings}
              className="h-[200px] !w-[1050px]"
            >
              {slideArray
                ? slideArray.map((item) => {
                    if ("name" in item) {
                      return (
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 4
                          }}
                          key={uuid()}
                          className="m-auto !grid h-[210px] content-center justify-center"
                        >
                          <TooltipsCustom
                            placement="top"
                            title={item.name}
                            color="warning"
                          >
                            <Image
                              className="p-2"
                              key={uuid()}
                              src={item.image}
                              alt={item.name}
                              width={150}
                              height={128}
                            />
                          </TooltipsCustom>
                        </motion.div>
                      )
                    }
                    return item
                  })
                : null}
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
