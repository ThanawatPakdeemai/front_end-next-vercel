import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import GameCarouselHeader, {
  IHeaderSlide
} from "@components/molecules/gameSlide/GameCarouselHeader"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import GameCard from "@feature/game/components/molecules/GameCard"
import useGlobal, { isMobile } from "@hooks/useGlobal"
import { IRoomAvaliableData } from "@feature/home/interfaces/IHomeService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"
import { Box } from "@mui/material"

interface IProps {
  menu: IHeaderSlide
  list: IGame[] | IRoomAvaliableData[] | unknown[]
  showNo?: boolean
  checkTimer?: boolean
  curType: IGetType
  setCurType: (_type: IGetType) => void
  showSlideCurrent?: number
  onPlaying?: boolean
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
  onPlaying = false
}: IProps) => {
  const staminaRecovery = new Date("2023-01-07T22:24:00.000Z")

  const breakPointMobileSite = isMobile
    ? [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2, // list.length < 3 ? 2 : 3,
            slidesToScroll: 2 // list.length < 3 ? 1 : 3
          }
        }
      ]
    : [
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
          breakpoint: 640,
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
  const showSlide = list.length < 5 ? list.length : 6
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false,
    responsive: breakPointMobileSite
  }
  const { onHandleSetGameStore, getTypeGamePathFolder, isRedirectRoomlist } =
    useGlobal()
  const { onSetGameItemSelectd } = useGameStore()
  const profile = useProfileStore((state) => state.profile.data)
  const game = useGameStore((state) => state.data)
  const { gameItemList } = useGamesByGameId({
    _playerId: profile ? profile.id : "",
    _gameId: game ? game._id : ""
  })
  const sliderRef = useRef<Slider>(null)
  const [cooldown, setCooldown] = useState<boolean>(false)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  return (
    <div className="md:mb-10">
      <GameCarouselHeader
        menu={menu}
        curType={curType}
        onNext={onSlideNext}
        onPrev={onSlidePrev}
        setCurType={setCurType}
      />

      <Box
        component="div"
        className={`game-carousel-slide overflow-hidden max-[420px]:pt-6 ${
          list.length < 5 && "slick-slider-w-auto"
        }`}
        sx={
          list.length <= 6
            ? {
                "&.game-carousel-slide": {
                  ".slick-track": {
                    marginLeft: "0",
                    gap: "10px",
                    display: "flex"
                  },
                  ".slick-slide.slick-cloned": {
                    display: "none"
                  }
                }
              }
            : {
                ".slick-track": {
                  gap: "10px",
                  display: "flex"
                }
              }
        }
      >
        <Slider
          ref={sliderRef}
          {...settings}
        >
          {list &&
            list.map((item, index) => (
              <Box
                component="div"
                className={`${list.length < 3 && "px-1"}`}
                key={item.id}
              >
                <GameCard
                  key={item?.id ?? item.game_id}
                  menu={menu}
                  data={item}
                  showNo={showNo}
                  classNameImage="h-40 w-40"
                  no={index + 1}
                  checkTimer={checkTimer}
                  cooldown={cooldown}
                  setCooldown={setCooldown}
                  staminaRecovery={staminaRecovery}
                  href={`/${
                    item.is_NFT
                      ? "arcade-emporium"
                      : getTypeGamePathFolder(item)
                  }/${item.path}${isRedirectRoomlist(item).toString()}`}
                  onPlaying={onPlaying}
                  onHandleClick={() => {
                    onHandleSetGameStore(
                      item.is_NFT ? "arcade-emporium" : curType,
                      item
                    )
                    if (onPlaying && item?.play_to_earn_status !== "free") {
                      const itemSelect = gameItemList?.find(
                        (ele) => ele.item_size === item.item_size
                      )
                      if (itemSelect) onSetGameItemSelectd(itemSelect)
                    }
                  }}
                  gameType={
                    item.is_NFT
                      ? "arcade-emporium"
                      : getTypeGamePathFolder(item)
                  }
                  play_total_count={game?.play_total_count}
                  room_available={game?.game_room_available}
                />
              </Box>
            ))}
        </Slider>
      </Box>
    </div>
  )
}

export default memo(GameCarousel)
