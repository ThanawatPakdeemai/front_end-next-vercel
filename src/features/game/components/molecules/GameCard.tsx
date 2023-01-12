import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { ISlide, TColor } from "@components/molecules/gameSlide/GameCarousel"
import { IHeaderSlide } from "@components/molecules/gameSlide/GameCarouselHeader"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Chip } from "@mui/material"
import { motion } from "framer-motion"
import React, { memo } from "react"
import ImageCustom from "@components/atoms/image/Image"
import IconHourglass from "@components/icons/hourglassIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import TimerStamina from "@components/atoms/timer/TimerStamina"

interface IProps {
  menu: IHeaderSlide
  data: ISlide
  showNo?: boolean
  no?: number
  checkTimer?: boolean
  cooldown?: boolean
  staminaRecovery?: Date
  setCooldown?: (_value: boolean) => void
  onHandleClick: () => void
}

const GameCard = ({
  menu,
  data,
  showNo,
  no,
  checkTimer,
  cooldown,
  staminaRecovery,
  setCooldown,
  onHandleClick
}: IProps) => {
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
    <motion.div
      className="slick-card-container flex flex-col justify-center blur-none"
      initial="init"
      whileHover="onHover"
      animate="animate"
    >
      <motion.div className="relative flex h-[218px] w-full items-center justify-center overflow-hidden">
        {showNo && no ? (
          <NumberRank
            index={no}
            fixColor={false}
            className="slick-card-number absolute top-0 right-0 z-[3] m-[10px] h-10 w-10 text-default text-white-primary"
          />
        ) : null}
        <ImageCustom
          src={data.image}
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
              cooldown ? <IconHourglass /> : <SportsEsportsOutlinedIcon />
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
            {data.desc}
          </p>
        </div>
        <div className="relative grid w-full grid-cols-2 gap-2 text-xs uppercase">
          <Chip
            label={menu.title}
            size="small"
            color={onChipColor(menu.theme)}
            className="font-bold"
          />
          {checkTimer && staminaRecovery && cooldown && setCooldown ? (
            <TimerStamina
              time={staminaRecovery}
              show={cooldown}
              setShow={setCooldown}
            />
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(GameCard)
