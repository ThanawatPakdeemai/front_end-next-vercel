import React, { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Image from "next/image"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Chip, Typography } from "@mui/material"
import GameTags from "@feature/slider/components/atoms/GameTags"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"

const StoryLobby = () => {
  const { t } = useTranslation()
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()

  useEffect(() => {
    if (data) setGameData(data)
  }, [data])

  const gameTags: IGameTag[] = []
  /**
   * @description Push game tags to array
   */
  // TODO: change slide.category.id to slide.category.slug
  gameData &&
    gameTags.push(
      {
        name: gameData.category.name,
        link: `category/${gameData.category.id}`
      },
      {
        name: gameData.game_type,
        link: `/play-to-earn-games`
      },
      {
        name: gameData.game_free_status ? "Free" : "",
        link: `/free-to-play-games`
      },
      {
        name: gameData.hot_game_status ? "Hot" : "",
        link: `/play-to-earn-games`
      }
    )

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-[578px]">
        <div className="mb-4 flex gap-4">
          <div className="h-[230px] w-full justify-center overflow-hidden rounded-3xl border-[1px] border-neutral-700 border-opacity-80 sm:w-[230px] md:justify-start">
            <Image
              src={
                gameData
                  ? gameData.image_category_list
                  : "/images/gameDetails/nakamoto-wars.webp"
              }
              alt={gameData ? gameData.name : "nakamoto-wars"}
              width={230}
              height={230}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="w-full rounded-3xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 sm:w-[calc(100%-230px)]">
            <Chip
              label={gameData?.game_type}
              size="small"
              color="info"
              className="mb-4 font-bold uppercase"
            />
            <h1 className="font-neue-machina text-lg font-bold uppercase text-white-default">
              {gameData?.name}
            </h1>
            <div className="mt-6 mb-4 border-b-[1px] border-neutral-700" />
            <div className="mb-3 flex items-center gap-3">
              <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
                {t("genre")}
              </Typography>
              <GameTags gameTags={gameTags} />
            </div>
            <div className="flex items-center gap-3">
              <Typography className="font-neue-machina-semi text-xs uppercase text-neutral-600">
                {t("play_count_title")}
              </Typography>
              {gameData && (
                <Chip
                  variant="outlined"
                  size="small"
                  className="cursor-pointer uppercase"
                  label={gameData.play_total_count}
                />
              )}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-neutral-500">{`${t(
          "game_story_text"
        )}`}</p>
      </div>
    </div>
  )
}

export default memo(StoryLobby)
