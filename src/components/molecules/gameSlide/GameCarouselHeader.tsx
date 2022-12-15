import IconDollar from "@components/icons/dollarIcon"
import React, { memo, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import IconArrowRight from "@components/icons/arrowRightIcon"
import IconArrowLeft from "@components/icons/arrowLeftIcon"
import { motion } from "framer-motion"
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"

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
  onView?: () => void
  onNext?: () => void
  onPrev?: () => void
}

const GameCarouselHeader = ({
  icon,
  title,
  menuList,
  theme,
  onView,
  onNext,
  onPrev
}: IHeaderSlide) => {
  const [currentType, setCurrentType] = useState<string>(menuList[0].type)

  const onChangeType = (_type: string) => {
    setCurrentType(_type)
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

  return (
    <div className="slick-header-container relative mb-4 h-[50px] w-full">
      <motion.div
        className="absolute top-[-80px] left-[-80px]"
        initial={{ rotateZ: -15 }}
        animate={{
          rotateZ: [-15, -15, 15, 15, -15],
          transition: {
            duration: 12,
            times: [0, 0.4, 0.425, 0.975, 1],
            repeat: 2
          }
        }}
        whileHover={{ rotateZ: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="flex h-full w-full items-center justify-between">
        <div className="relative flex h-full w-fit items-center justify-between rounded-default border-2 border-neutral-800 bg-[#010101] bg-opacity-40 px-1 text-[10px] capitalize backdrop-blur-[25px]">
          <div className="flex items-center py-1 pl-4 font-bold">
            <IconDollar.Ori className={`slick-header-${theme}-icon`} />
            <p
              className={`slick-header-${theme}-text h-[10px] pl-2 pr-2 font-neue-machina-bold font-bold uppercase`}
            >
              {title}
            </p>
          </div>
          {menuList.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onChangeType(item.type)}
              className={`${item.className} slick-header-${theme}-background-${
                currentType === item.type ? "active" : "default"
              } ml-1 h-10 rounded-sm font-neue-machina text-sm font-bold capitalize text-black-default hover:text-white-primary`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex h-10 w-fit items-center justify-between text-[8px]">
          <ButtonToggleIcon
            startIcon={<AddIcon />}
            text="view all"
            handleClick={onClickedView}
            className="flex h-full w-36 items-center justify-center rounded-md border border-neutral-700 font-neue-machina text-sm font-bold capitalize leading-3 text-white-primary"
          />
          <div className="arrow-slick-container bg-black ml-4 grid h-full w-[100px] grid-cols-2 divide-x divide-neutral-700 rounded-md border border-neutral-700 text-white-primary ">
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
