import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import ImageCustom from "@components/atoms/image/Image"
import { Chip } from "@mui/material"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import GameCarouselHeader, {
  ISlideList
} from "@components/molecules/gameSlide/GameCarouselHeader"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import { motion } from "framer-motion"
import IconHourglass from "@components/icons/hourglassIcon"
import ButtonToggleIcon from "./ButtonToggleIcon"

export interface ISlide {
  id: number
  image: string
  desc: string
}

interface IProps {
  list: ISlide[]
  tag: string
  showNo?: boolean
  headerIcon: React.ReactNode
  headerMenu: ISlideList[]
  theme: string
  checkTimer?: boolean
}

type TColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

const GameCarousel = ({
  list,
  showNo = false,
  tag,
  headerIcon,
  headerMenu,
  theme,
  checkTimer = false
}: IProps) => {
  const staminaRecovery = new Date("2022-12-14T22:24:00.000Z")

  const [cooldown, setCooldown] = useState<boolean>(false)

  const orderColor = (_no: number) => {
    if (_no === 1) {
      return "bg-red-card"
    }
    if (_no === 2) {
      return "bg-polygon-default"
    }
    if (_no === 3) {
      return "bg-green-card"
    }
    return "bg-neutral-800 border-2 border-neutral-700"
  }

  const showSlide = list && list.length > 6 ? 6 : list.length

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false
  }

  const sliderRef = useRef<Slider>(null)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  const onViewAll = () => {}

  const onHandleClick = () => {}

  const cardImg = {
    init: {
      scale: 1
    },
    onHover: {
      scale: [1, 0.94, 0.96, 0.94],
      transition: {
        duration: 0.4
      }
    }
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
        icon={headerIcon}
        title={tag}
        menuList={headerMenu}
        onView={onViewAll}
        onNext={onSlideNext}
        onPrev={onSlidePrev}
        theme={theme}
      />
      <Slider
        ref={sliderRef}
        {...settings}
      >
        {list &&
          list.map((item, index) => (
            <motion.div
              key={`${item.id}_game`}
              className="slick-card-container"
              initial="init"
              whileHover="onHover"
              animate="animate"
            >
              <motion.div
                className="relative flex h-[218px] w-full overflow-hidden"
                variants={cardImg}
              >
                {showNo ? (
                  <div
                    className={`${orderColor(
                      index + 1
                    )} absolute top-0 right-0 m-[10px] flex h-10 w-10 items-center justify-center rounded-sm font-neue-machina text-default font-bold text-white-primary`}
                  >
                    {index + 1}
                  </div>
                ) : null}
                <ImageCustom
                  src={item.image}
                  alt="home-slide"
                  width={218}
                  height={218}
                  className="rounded-md"
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
                    label={tag}
                    size="small"
                    color={onChipColor(theme)}
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
