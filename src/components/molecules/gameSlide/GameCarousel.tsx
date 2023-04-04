import React, { memo, useRef, useState } from "react"
import Slider, { Settings } from "react-slick"
import GameCarouselHeader, {
  IHeaderSlide
} from "@components/molecules/gameSlide/GameCarouselHeader"
import { IGame, IGetType } from "@feature/game/interfaces/IGameService"
import GameCard from "@feature/game/components/molecules/GameCard"
import useGlobal from "@hooks/useGlobal"
import { IRoomAvaliableData } from "@feature/home/interfaces/IHomeService"
import useGameStore from "@stores/game"
import useProfileStore from "@stores/profileStore"
import useGamesByGameId from "@feature/gameItem/containers/hooks/useGamesByGameId"

interface IProps {
  menu: IHeaderSlide
  list: IGame[] | IRoomAvaliableData[]
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
  showSlideCurrent,
  onPlaying = false
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
        onPlaying
      />
      <div className="overflow-hidden">
        <Slider
          ref={sliderRef}
          {...settings}
        >
          {list &&
            list.map((item, index) => (
              <GameCard
                key={item?.id ?? item.game_id}
                menu={menu}
                data={item}
                showNo={showNo}
                no={index + 1}
                checkTimer={checkTimer}
                cooldown={cooldown}
                setCooldown={setCooldown}
                staminaRecovery={staminaRecovery}
                href={`/${
                  item.is_NFT ? "arcade-emporium" : getTypeGamePathFolder(item)
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
                  item.is_NFT ? "arcade-emporium" : getTypeGamePathFolder(item)
                }
              />
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default memo(GameCarousel)
