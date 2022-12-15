import IconDollar from "@components/icons/dollarIcon"
import React, { memo, useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import IconArrowRight from "@components/icons/arrowRightIcon"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import { motion, useAnimation } from "framer-motion"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { Chip } from "@mui/material"

export interface ISlideList extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  label: string
  type: string
}

export interface IHeaderSlide {
  icon: React.ReactNode
  title: string
  menuList: ISlideList[]
  theme: string
  stickerRotate: number
}

interface IProps extends IHeaderSlide {
  curType: string
  setCurType: (_type: string) => void
  onView?: () => void
  onNext?: () => void
  onPrev?: () => void
}

const GameCarouselHeader = ({
  icon,
  title,
  menuList,
  theme,
  stickerRotate,
  curType,
  setCurType,
  onView,
  onNext,
  onPrev
}: IProps) => {
  const animateControls = useAnimation()

  const rotateSticker = async (_rotate: number) => {
    await animateControls.start({
      rotateZ: _rotate,
      transition: {
        duration: 2,
        type: "spring",
        stiffness: 300
      }
    })
  }
  const onChangeType = (_type: string) => {
    setCurType(_type)
  }

  const onClickedView = () => {
    if (onView) {
      return onView()
    }
  }

  const onClickedNext = () => {
    if (onNext) {
      return onNext()
    }
  }

  const onClickedPrev = () => {
    if (onPrev) {
      return onPrev()
    }
  }

  useEffect(() => {
    let rotate = stickerRotate
    const delay = 4
    const interval = setInterval(() => {
      rotateSticker(rotate)
      rotate *= -1
    }, (delay + 1) * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="slick-header-container relative mb-4 h-[50px] w-full">
      <motion.div
        className="absolute top-[-80px] left-[-80px]"
        initial={{ rotateZ: stickerRotate }}
        animate={animateControls}
        whileHover={{ rotateZ: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 300
        }}
      >
        {icon}
      </motion.div>
      <div className="flex h-full w-full items-center justify-between">
        <div className="relative flex h-full w-fit items-center justify-between rounded-default border-2 border-grey-A100 bg-[#010101] bg-opacity-40 px-1 text-[10px] capitalize backdrop-blur-[25px]">
          <div className="flex items-center py-1 pl-4 font-bold ">
            <IconDollar.Ori className={`slick-header-${theme}-icon`} />
            <p
              className={`text-${theme}-main h-[10px] pl-2 pr-2 font-neue-machina-bold font-bold uppercase`}
            >
              {title}
            </p>
          </div>
          {menuList.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`${item.className} ml-1 !cursor-pointer`}
              onClick={() => onChangeType(item.type)}
            >
              <Chip
                label={item.label}
                size="medium"
                className={`h-full w-full cursor-pointer font-bold hover:bg-${theme}-main font-bold capitalize hover:text-white-primary ${
                  curType === item.type
                    ? `bg-${theme}-main text-white-primary`
                    : "bg-grey-A100 text-black-default "
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex h-10 w-fit items-center justify-between text-[8px]">
          <ButtonToggleIcon
            startIcon={<AddIcon />}
            text="view all"
            handleClick={onClickedView}
            className="flex h-full w-36 items-center justify-center rounded-md border border-grey-900 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
          />
          <div className="arrow-slick-container bg-black ml-4 grid h-full w-[100px] grid-cols-2 divide-x divide-grey-900 rounded-md border border-grey-900 text-white-primary ">
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={() => onClickedPrev()}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="flex h-full w-full items-center justify-center"
              onClick={() => onClickedNext()}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(GameCarouselHeader)
