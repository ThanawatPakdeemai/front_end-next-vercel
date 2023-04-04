import React, { useRef } from "react"
import useGetRoomAvailable from "@feature/home/containers/hook/useGetRoomAvailable"
import SkeletonRoombarList from "@components/atoms/skeleton/SkeletonRoombarList"
import { Box } from "@mui/material"
import { v4 as uuid } from "uuid"
import GameCarouselHeader, {
  IHeaderSlide,
  ISlideList
} from "@components/molecules/gameSlide/GameCarouselHeader"
import ControllerIcon from "@components/icons/ControllerIcon"
import { IRoomAvaliableData } from "@feature/home/interfaces/IHomeService"
import Slider, { Settings } from "react-slick"
import { IGetType } from "@feature/game/interfaces/IGameService"
import OnPlayingBody from "./OnPlayingBody"

interface IOnPlayingStyle2 {
  isSlider?: boolean
}

const OnPlayingStyle2 = ({ isSlider = true }: IOnPlayingStyle2) => {
  const { gamesAvailble, isLoading } = useGetRoomAvailable()
  /**
   * @description Slider ref
   */
  const sliderRef = useRef<Slider>(null)
  // const onSlideNext = () => {
  //   sliderRef?.current?.slickNext()
  // }
  // const onSlidePrev = () => {
  //   sliderRef?.current?.slickPrev()
  // }

  /**
   * @description Slider settings
   */
  const settings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  }

  const renderContent = (_game: IRoomAvaliableData[]) => {
    if (isSlider) {
      return (
        <Slider
          ref={sliderRef}
          {...settings}
        >
          {_game.map((itemRoom) => (
            <OnPlayingBody
              key={uuid()}
              gameItem={itemRoom}
            />
          ))}
        </Slider>
      )
    }
    return (
      <div className="flex flex-wrap gap-y-4">
        {_game.map((itemRoom) => (
          <OnPlayingBody
            key={uuid()}
            gameItem={itemRoom}
          />
        ))}
      </div>
    )
  }

  const getURL = (_gameType: string): IGetType => {
    // _gameType is chanel_type from api
    if (_gameType === "free2play") {
      return "free-to-play-games"
    }
    if (_gameType === "survivor") {
      return "play-to-earn-games"
    }
    return "play-to-earn-games"
  }

  return (
    <div className="on-playing__content">
      {gamesAvailble && gamesAvailble.length > 0 && !isLoading ? (
        gamesAvailble.map((game) => (
          <Box
            key={uuid()}
            id={`game-${game.chanel_type}`}
            component="section"
            className="mb-10"
            sx={{
              "p": {
                color: "#70727B"
              },
              ".MuiChip-label": {
                color: "#E1E2E2"
              },
              ".slick-slider, .slick-list, .slick-track": {
                width: "100%"
              }
            }}
          >
            {game.data && game.data.length > 0 && (
              <GameCarouselHeader
                menu={
                  {
                    sticker: <></>,
                    title: "On Playing",
                    menuList: [
                      {
                        id: game.chanel_type,
                        label: game.chanel_type,
                        type: game.chanel_type
                      }
                    ] as ISlideList[],
                    theme: "success",
                    stickerRotate: 15,
                    icon: <ControllerIcon />
                  } as IHeaderSlide
                }
                hideNextPrev
                curType={getURL(game.chanel_type)}
                // onNext={onSlideNext}
                // onPrev={onSlidePrev}
                // setCurType={setCurType}
                // onPlaying={false}
              />
            )}

            {game.data && game.data.length > 0 && renderContent(game.data)}
          </Box>
        ))
      ) : (
        <SkeletonRoombarList />
      )}
    </div>
  )
}
export default OnPlayingStyle2
