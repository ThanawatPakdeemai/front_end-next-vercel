/* eslint-disable no-console */
import ButtonToggleIcon from "@components/molecules/gameSlide/ButtonToggleIcon"
import { IHeaderSlide } from "@components/molecules/gameSlide/GameCarouselHeader"
import NumberRank from "@feature/ranking/components/atoms/NumberRank"
import { Chip } from "@mui/material"
import { motion } from "framer-motion"
import React, { memo, useEffect, useState } from "react"
import { Image } from "@components/atoms/image"
import IconHourglass from "@components/icons/hourglassIcon"
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined"
import TimerStamina from "@components/atoms/timer/TimerStamina"
import {
  IGame,
  IGameFav,
  IGetType
} from "@feature/game/interfaces/IGameService"
import { IPartnerGameData } from "@feature/game/interfaces/IPartnerGame"
import { IMAGES } from "@constants/images"
import Link from "next/link"
import { IRoomAvaliableData } from "@feature/home/interfaces/IHomeService"
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined"
import useGameStore from "@stores/game"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import useProfileStore from "@stores/profileStore"
import useGlobal from "@hooks/useGlobal"
import { TColor } from "@components/molecules/gameSlide/GameCarousel"
import CountOnPlaying from "@components/atoms/CountOnPlaying"
import { useTranslation } from "react-i18next"

interface IProps {
  gameType: IGetType
  href?: string
  menu: IHeaderSlide
  data?: IGame | IGameFav | IPartnerGameData | IRoomAvaliableData
  partnerdata?: IPartnerGameData
  imgPartner?: string | undefined
  showNo?: boolean
  no?: number
  checkTimer?: boolean
  cooldown?: boolean
  staminaRecovery?: Date
  setCooldown?: (_value: boolean) => void
  onHandleClick?: () => void
  onPlaying?: boolean
  play_total_count?: number
}

const GameCard = ({
  gameType,
  href,
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
  onHandleClick,
  onPlaying = false,
  play_total_count
}: IProps) => {
  const [imageSrc, setImageSrc] = useState<string>(IMAGES.no_image.src)
  const [chipLable, setChipLable] = useState<string>("")
  const [theme, setTheme] = useState<string>("")
  const [lableButton, setLableButton] = useState<string>("play now")

  const { t } = useTranslation()
  const gameTypeSplit = gameType
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(" Games", "")

  const profile = useProfileStore((state) => state.profile.data)
  const game = useGameStore((state) => state.data)
  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })
  const { onSetGameItemSelectd } = useGameStore()

  // hooks
  const { getColorChipByGameType, getTypeGamePartnerPathFolder } = useGlobal()

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
    let load = false

    if (!load) {
      if (imgPartner && imgPartner !== undefined) {
        setImageSrc(imgPartner)
      } else if ((data as IRoomAvaliableData)?.game_image) {
        setImageSrc((data as IRoomAvaliableData)?.game_image)
      } else if (
        !imgPartner &&
        imgPartner === undefined &&
        data &&
        (data as IGame).image_category_list
      ) {
        setImageSrc((data as IGame).image_category_list)
      }
    }

    return () => {
      load = true
    }
  }, [imgPartner, data])

  useEffect(() => {
    let load = false

    if (!load) {
      // Duplicate code from useGlobal.ts
      if (partnerdata) {
        setChipLable("partner")
        setTheme("warning")
        setLableButton("view detail")
      } else if (!partnerdata && menu.title && menu.theme) {
        setChipLable(menu.title)
        setTheme(menu.theme)
      }
      if (onPlaying) {
        if ((data as IRoomAvaliableData)?.game_free_play) {
          setChipLable("Free To Play")
          setTheme("secondary")
        } else {
          setChipLable("Play To Earn")
          setTheme("error")
        }
      }
    }

    return () => {
      load = true
    }
  }, [menu, partnerdata, data, onPlaying])

  const setItemSelect = (ele) => {
    if (profile) {
      if (gameItemList) {
        const itemSelcte = gameItemList.find(
          (elem) => elem.item_size === ele.item_size
        )
        if (itemSelcte) onSetGameItemSelectd(itemSelcte)
      }
    }
  }

  const renderCardContent = () => (
    <motion.div
      className="slick-card-container flex h-full flex-col justify-center blur-none"
      initial="init"
      whileHover="onHover"
      animate="animate"
      onClick={() => {
        setItemSelect({})
        if (onHandleClick) onHandleClick()
      }}
    >
      <motion.div className="relative flex h-full w-full items-center justify-center overflow-hidden px-1 xl:h-[218px]">
        {showNo && no && (
          <NumberRank
            index={no - 1}
            fixColor={false}
            className="slick-card-number absolute top-2 right-1 z-[3] m-[10px] h-10 w-10 text-default text-white-primary"
          />
        )}
        <Image
          src={imageSrc}
          alt="home-slide"
          width={218}
          height={218}
          className={`slick-card-content h-full rounded-md object-cover ${
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
            text={cooldown ? `${t("cooldown")}...` : t(lableButton)}
            className={`btn-rainbow-theme z-[2] w-[198px] ${
              cooldown ? "bg-error-main" : "bg-secondary-main "
            } capitalize`}
            type="button"
          />
        </motion.div>
      </motion.div>
      <div className="relative z-[3]">
        <div className="slick-card-desc flex h-10 w-[95%] items-center justify-between">
          <p className="relative truncate uppercase hover:text-clip">
            {(data as IGame)
              ? (data as IGame).story
              : (data as IGame)?.story ?? (data as IGame)?.name}
            {(data as IRoomAvaliableData)
              ? (data as IRoomAvaliableData)?.game_name
              : (data as IGame)?.name ?? partnerdata?.name}
          </p>
        </div>
        <div className="relative flex w-full flex-wrap items-center gap-2 text-xs uppercase">
          {(data as IRoomAvaliableData) &&
          "game_free_play" in (data as IRoomAvaliableData) ? (
            // Display for Gameroom only
            <Chip
              label={t(chipLable)}
              size="small"
              color={onChipColor(theme)}
              className="w-full font-bold md:w-auto"
            />
          ) : (
            // Display for a;; game page list
            <Chip
              label={t(gameTypeSplit)}
              size="small"
              className={`w-full font-bold md:w-auto ${getColorChipByGameType(
                gameType
              )}`}
            />
          )}
          {partnerdata && (
            <Chip
              label={partnerdata.genres?.map((el) => `${el.name}, `)}
              size="small"
              // color={getColorChipByGameType("default")}
              className={`w-full font-bold md:w-auto ${getColorChipByGameType(
                getTypeGamePartnerPathFolder(partnerdata)
              )}`}
            />
          )}
          {
            onPlaying && (
              // (data as IRoomAvaliableData)?
              // .map(
              // (el) =>
              // el?.room_list?.map((ele) => (
              <>
                <Chip
                  key={(data as IRoomAvaliableData)?.game_id}
                  label={`${
                    (data as IRoomAvaliableData)?.item_list?.[0]?.item_name
                  }`}
                  size="small"
                  className="w-fit !bg-neutral-400 font-bold !text-neutral-700"
                />
              </>
            )
            // )
            // ))
          }

          {checkTimer && staminaRecovery && cooldown && setCooldown && (
            <TimerStamina
              time={staminaRecovery}
              show={cooldown}
              setShow={setCooldown}
            />
          )}
        </div>
        {onPlaying && (
          <div className="relative mt-2 flex w-full flex-wrap items-center gap-2 text-xs uppercase">
            <LocalActivityOutlinedIcon className=" text-[18px] font-thin" />
            {(data as IRoomAvaliableData)?.item_list?.map((el) =>
              el?.room_list?.map((room) => (
                <>
                  <Link
                    // href=""
                    href={`/${room.game_type}-games/${room.game_path}/roomlist`}
                    key={el.item_size}
                  >
                    <Chip
                      onClick={() => setItemSelect(el)}
                      label={`${
                        !(data as IRoomAvaliableData)?.game_free_play
                          ? `${el.item_size} / `
                          : ""
                      }  rooms ${room?.room_number}`}
                      size="small"
                      className=" w-fit cursor-pointer !border border-solid !border-neutral-700 !bg-primary-main font-bold !text-primary-contrastText"
                    />
                  </Link>
                </>
              ))
            )}
          </div>
        )}
        {play_total_count && <CountOnPlaying count={play_total_count} />}
      </div>
    </motion.div>
  )

  return href ? (
    <Link href={href}>{renderCardContent()}</Link>
  ) : (
    renderCardContent()
  )
}

export default memo(GameCard)
