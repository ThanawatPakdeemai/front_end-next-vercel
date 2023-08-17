import React, { useMemo, useRef } from "react"
import { v4 as uuid } from "uuid"
import Slider, { Settings } from "react-slick"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { IRoomAvaliableData } from "@feature/home/interfaces/IHomeService"
import {
  IHeaderSlide,
  ISlideList
} from "@components/molecules/gameSlide/GameCarouselHeader"
import useGetRoomAvailable from "@feature/home/containers/hook/useGetRoomAvailable"
import { TGameType } from "@feature/game/interfaces/IGameService"

const SkeletonRoombarList = dynamic(
  () => import("@components/atoms/skeleton/SkeletonRoombarList"),
  {
    suspense: true,
    ssr: false
  }
)
const OnPlayingBody = dynamic(() => import("./OnPlayingBody"), {
  suspense: true,
  ssr: false
})
const GameCarouselHeader = dynamic(
  () => import("@components/molecules/gameSlide/GameCarouselHeader"),
  {
    suspense: true,
    ssr: false
  }
)
const Icomoon = dynamic(() => import("@components/atoms/icomoon/Icomoon"), {
  suspense: true,
  ssr: false
})

interface IOnPlayingStyle2 {
  isSlider?: boolean
  showTitle?: boolean
}

const OnPlayingStyle2 = ({
  isSlider = true,
  showTitle = true
}: IOnPlayingStyle2) => {
  const { gamesAvailble, isLoading } = useGetRoomAvailable()
  const { t } = useTranslation()
  /**
   * @description Slider ref
   */
  const sliderRef = useRef<Slider>(null)

  const onSlideNext = () => {
    sliderRef?.current?.slickNext()
  }
  const onSlidePrev = () => {
    sliderRef?.current?.slickPrev()
  }

  /**
   * @description Slider settings
   */
  const showSlide = 4
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: showSlide,
    arrows: false,
    variableWidth: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const renderContent = (
    _game: IRoomAvaliableData[],
    _chanelType: TGameType
  ) => {
    if (isSlider && _game.length) {
      return (
        <Slider
          ref={sliderRef}
          {...settings}
        >
          {_game.map((itemRoom) => (
            <OnPlayingBody
              key={uuid()}
              gameItem={itemRoom}
              chanelType={_chanelType}
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
            chanelType={_chanelType}
          />
        ))}
      </div>
    )
  }

  const sort_item_count = (array) => {
    array.sort((a, b) => b.item_list.length - a.item_list.length)
    return array
  }
  // limit 12 sort item
  const mapDataGamesAvailbleItem = useMemo(() => {
    if (gamesAvailble) {
      return gamesAvailble.filter((_game) => {
        if (_game.data.length > 0) {
          const _sort = sort_item_count(_game.data)
          _sort.length = 12

          return {
            ..._game,
            data: _sort
          }
        }
        return null
      })
    }
    return gamesAvailble
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamesAvailble, isLoading])

  return (
    <div className="on-playing__content">
      {mapDataGamesAvailbleItem &&
      mapDataGamesAvailbleItem.length > 0 &&
      !isLoading ? (
        mapDataGamesAvailbleItem.map((game) => (
          <Box
            key={uuid()}
            id={`game-${game.chanel_type}`}
            component="section"
            className="on-playing-carousel-slide mb-10"
            sx={
              game.data.length <= 6
                ? {
                    "p": {
                      color: "#70727B"
                    },
                    ".MuiChip-label": {
                      color: "#E1E2E2"
                    },
                    ".slick-slider, .slick-list, .slick-track": {
                      width: "100%"
                    },
                    "&.on-playing-carousel-slide": {
                      ".slick-track": {
                        marginLeft: "0"
                      },
                      ".slick-slide.slick-cloned": {
                        display: "none"
                      }
                    }
                  }
                : {
                    "p": {
                      color: "#70727B"
                    },
                    ".MuiChip-label": {
                      color: "#E1E2E2"
                    },
                    ".slick-slider, .slick-list, .slick-track": {
                      width: "100%"
                    }
                  }
            }
          >
            {game.data && game.data.length > 0 && (
              <GameCarouselHeader
                menu={
                  {
                    sticker: <></>,
                    title: t("On Playing"),
                    menuList: [
                      {
                        id: game.chanel_type,
                        label: game.chanel_type,
                        type: game.chanel_type
                      }
                    ] as ISlideList[],
                    theme: "success",
                    stickerRotate: 15,
                    icon: <Icomoon className="icon-Joystick" />
                  } as IHeaderSlide
                }
                onNext={onSlideNext}
                onPrev={onSlidePrev}
                hideNextPrev
                hideViewAll
                showTitle={showTitle}
              />
            )}

            {game.data &&
              game.data.length > 0 &&
              renderContent(game.data, game.chanel_type)}
          </Box>
        ))
      ) : (
        <SkeletonRoombarList />
      )}
    </div>
  )
}
export default OnPlayingStyle2
