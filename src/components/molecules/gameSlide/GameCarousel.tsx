import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import GameCarouselHeader, {
  IHeaderSlide
} from "@components/molecules/gameSlide/GameCarouselHeader"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import { useRouter } from "next/router"
import { MESSAGES } from "@constants/messages"
import { useToast } from "@feature/toast/containers"
import GameCard from "@feature/game/components/molecules/GameCard"

interface IProps {
  menu: IHeaderSlide
  list: IGame[]
  showNo?: boolean
  checkTimer?: boolean
  curType: IGetType
  setCurType: (_type: IGetType) => void
  showSlideCurrent?: number
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
  setCurType,
  showSlideCurrent
}: IProps) => {
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")
  const showSlide = showSlideCurrent ?? 6
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
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
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }
  const profile = useProfileStore((state) => state.profile.data)
  const { onSetGameData } = useGameStore()
  const router = useRouter()
  const { errorToast } = useToast()

  const sliderRef = useRef<Slider>(null)
  const [cooldown, setCooldown] = useState<boolean>(false)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  const onViewAll = () => {
    switch (curType) {
      case "play-to-earn":
        router.push(`/play-to-earn-games`)
        break
      case "free-to-play":
        router.push(`/free-to-play-games`)
        break
      case "story-mode":
        router.push(`/story-mode-games`)
        break
      default:
        router.push(`/play-to-earn-games`)
    }
  }

  const onHandleClick = (_gameUrl: string, _gameData: IGame) => {
    if (profile) {
      if (_gameData.play_to_earn && _gameData.play_to_earn_status === "free") {
        router.push(`/${curType}-games/${_gameUrl}/roomlist`)
      } else {
        router.push(`/${curType}-games/${_gameUrl}`)
      }

      onSetGameData(_gameData)
    } else {
      errorToast(MESSAGES.please_login)
    }
  }

  return (
    <div className="md:mb-10">
      <GameCarouselHeader
        menu={menu}
        curType={curType}
        onView={onViewAll}
        onNext={onSlideNext}
        onPrev={onSlidePrev}
        setCurType={setCurType}
      />
      <div className="overflow-hidden">
        <Slider
          ref={sliderRef}
          {...settings}
        >
          {list &&
            list.map((item, index) => (
              <GameCard
                key={item.id}
                menu={menu}
                data={item}
                showNo={showNo}
                no={index + 1}
                checkTimer={checkTimer}
                cooldown={cooldown}
                setCooldown={setCooldown}
                staminaRecovery={staminaRecovery}
                onHandleClick={() => onHandleClick(item.path, item)}
              />
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default memo(GameCarousel)
