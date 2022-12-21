import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import ImageCustom from "@components/atoms/image/Image"
import { Chip } from "@mui/material"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import GameCarouselHeader, {
  IHeaderSlide
} from "@components/molecules/gameSlide/GameCarouselHeader"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import { motion } from "framer-motion"
import IconHourglass from "@components/icons/hourglassIcon"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import ButtonToggleIcon from "./ButtonToggleIcon"

export interface ISlide {
  id: number
  image: string
  desc: string
}

interface IProps {
  menu: IHeaderSlide
  list: ISlide[]
  showNo?: boolean
  checkTimer?: boolean
  curType: string
  setCurType: (_type: string) => void
}

export type TColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

const GameCarousel = ({
  menu,
  list,
  showNo = false,
  checkTimer = false,
  curType,
  setCurType
}: IProps) => {
  const staminaRecovery = new Date("2022-12-18T22:24:00.000Z")
  const showSlide = list && list.length > 6 ? 6 : list.length
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false
  }
  const btnCard = {
    init: {
      y: 40,
      opacity: 0
    },
    onHover: {
      y: -8,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 600
      }
    }
  }

  const sliderRef = useRef<Slider>(null)
  const [cooldown, setCooldown] = useState<boolean>(false)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  const onViewAll = () => {}

  const onHandleClick = () => {}

  const onChipColor = (_theme: string | undefined) => {
    let chip: TColor = "default"
    const chipThemeList: Array<TColor> = [
      "default",
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning"
    ]
    const chipThemeMapping = chipThemeList.find((v) => v === _theme)
    if (chipThemeMapping) {
      chip = chipThemeMapping
    }
    return chip
  }

  return (
    <div className="mb-10">
      <GameCarouselHeader
        menu={menu}
        curType={curType}
        onView={onViewAll}
        onNext={onSlideNext}
        onPrev={onSlidePrev}
        setCurType={setCurType}
      />
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {list &&
          list.map((item, index) => (
            <motion.div
              key={`${item.id}_game`}
              className="slick-card-container flex flex-col justify-center blur-none"
              initial="init"
              whileHover="onHover"
              animate="animate"
            >
              <motion.div className="relative flex h-[218px] w-full items-center justify-center overflow-hidden">
                {showNo ? (
                  <NumberRank
                    index={index}
                    fixColor={false}
                    className="slick-card-number absolute top-0 right-0 z-[3] m-[10px] h-10 w-10 text-default text-white-primary"
                  />
                ) : null}
                <ImageCustom
                  src={item.image}
                  alt="home-slide"
                  width={218}
                  height={218}
                  className="slick-card-content rounded-md"
                />
                <motion.div
                  variants={btnCard}
                  className="absolute bottom-0 flex w-full justify-center text-white-primary"
                >
                  <ButtonToggleIcon
                    startIcon={
                      cooldown ? (
                        <IconHourglass />
                      ) : (
                        <SportsEsportsOutlinedIcon />
                      )
                    }
                    text={cooldown ? "cooldown..." : "play now"}
                    handleClick={onHandleClick}
                    className={`btn-rainbow-theme z-[2] w-[198px] ${
                      cooldown ? "bg-error-main" : "bg-secondary-main "
                    } capitalize`}
                  />
                </motion.div>
              </motion.div>
              <div className="relative z-[3]">
                <div className="slick-card-desc flex h-10 w-full items-center">
                  <p className="relative truncate uppercase hover:text-clip">
                    {item.desc}
                  </p>
                </div>
                <div className="relative grid w-full grid-cols-2 gap-2 text-xs uppercase">
                  <Chip
                    label={menu.title}
                    size="small"
                    color={onChipColor(menu.theme)}
                    className="font-bold"
                  />
                  {checkTimer ? (
                    <TimerStamina
                      time={staminaRecovery}
                      show={cooldown}
                      setShow={setCooldown}
                    />
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
      </Slider>
    </div>
  )
}

export default memo(GameCarousel)
