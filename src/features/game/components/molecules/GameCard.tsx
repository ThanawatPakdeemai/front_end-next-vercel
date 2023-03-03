import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { TColor } from "@components/molecules/gameSlide/GameCarousel"
import { IHeaderSlide } from "@components/molecules/gameSlide/GameCarouselHeader"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Chip } from "@mui/material"
import { motion } from "framer-motion"
import React, { memo, useEffect, useState } from "react"
import { Image } from "@components/atoms/image"
import IconHourglass from "@components/icons/hourglassIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import { IGame, IGameFav } from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { IMAGES } from "@constants/images"

interface IProps {
  menu: IHeaderSlide
  data?: IGame | IGameFav
  partnerdata?: IPartnerGameData
  imgPartner?: string | undefined
  showNo?: boolean
  no?: number
  checkTimer?: boolean
  cooldown?: boolean
  staminaRecovery?: Date
  setCooldown?: (_value: boolean) => void
  onHandleClick?: () => void
}

const GameCard = ({
  menu,
  data,
  partnerdata,
  imgPartner,
  showNo,
  no,
  checkTimer,
  cooldown,
  staminaRecovery,
  setCooldown,
  onHandleClick
}: IProps) => {
  const [imageSrc, setImageSrc] = useState<string>(IMAGES.no_image.src)
  const [chipLable, setChipLable] = useState<string>("")
  const [theme, setTheme] = useState<string>("")
  const [lableButton, setLableButton] = useState<string>("play now")
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

  useEffect(() => {
    if (imgPartner && imgPartner !== undefined) {
      setImageSrc(imgPartner)
    } else if (
      !imgPartner &&
      imgPartner === undefined &&
      data &&
      data.image_category_list
    ) {
      setImageSrc(data.image_category_list)
    }
  }, [imgPartner, data])

  useEffect(() => {
    if (partnerdata) {
      setChipLable("partner")
      setTheme("warning")
      setLableButton("view detail")
    } else if (!partnerdata && menu.title && menu.theme) {
      setChipLable(menu.title)
      setTheme(menu.theme)
    }
  }, [menu, partnerdata, data])

  return (
    <motion.div
      className="slick-card-container flex flex-col justify-center blur-none"
      initial="init"
      whileHover="onHover"
      animate="animate"
    >
      <motion.div className="relative flex w-full items-center justify-center overflow-hidden px-1 xl:h-[218px]">
        {showNo && no ? (
          <NumberRank
            index={no - 1}
            fixColor={false}
            className="slick-card-number absolute top-2 right-1 z-[3] m-[10px] h-10 w-10 text-default text-white-primary"
          />
        ) : null}
        <Image
          src={imageSrc}
          alt="home-slide"
          width={218}
          height={218}
          className={`slick-card-content rounded-md ${
            partnerdata ? " sm:h-2/4 lg:h-4/6 xl:h-full" : ""
          }`}
        />
        <motion.div
          variants={btnCard}
          className="absolute bottom-0 flex w-full justify-center text-white-primary"
        >
          <ButtonToggleIcon
            startIcon={
              cooldown ? <IconHourglass /> : <SportsEsportsOutlinedIcon />
            }
            text={cooldown ? "cooldown..." : lableButton}
            handleClick={onHandleClick}
            className={`btn-rainbow-theme z-[2] w-[198px] ${
              cooldown ? "bg-error-main" : "bg-secondary-main "
            } capitalize`}
            type="button"
          />
        </motion.div>
      </motion.div>
      <div className="relative z-[3]">
        <div className="slick-card-desc flex h-10 w-full items-center">
          <p className="relative truncate uppercase hover:text-clip">
            {data?.name ? data.name : partnerdata?.name}
          </p>
        </div>
        <div className="relative grid w-full grid-cols-2 gap-2 text-xs uppercase">
          <Chip
            label={chipLable}
            size="small"
            color={onChipColor(theme)}
            className="font-bold"
          />
          {partnerdata ? (
            <Chip
              label={
                partnerdata.genres &&
                partnerdata.genres.map((el) => `${el.name}, `)
              }
              size="small"
              color={onChipColor("default")}
              className="font-bold"
            />
          ) : (
            ""
          )}

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
