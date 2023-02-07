import React, { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ImageCustom from "@components/atoms/image/Image"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Chip, Typography } from "@mui/material"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import TagMultiple from "@components/molecules/TagMultiple"
import TagSingular from "@components/molecules/TagSingular"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"

const StoryLobby = () => {
  const { t } = useTranslation()
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()

  useEffect(() => {
    if (data) setGameData(data)
  }, [data])

  /**
   * @description Push game tags to array
   */
  const gameTags: IGameTag[] = []
  if (gameData && gameData.category_list && gameData.category_list.length > 0) {
    gameData.category_list.map((category) =>
      gameTags.push({
        name: category.name,
        link: `category/${category.id}`
      })
    )
  } else if (gameData && gameData.category) {
    const _categorySlug = gameData.category.name.split(" ")
    gameTags.push({
      name: gameData.category.name,
      link: `category/${_categorySlug[1].toLocaleLowerCase()}`
    })
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto w-[578px]">
        <div className="mb-4 flex gap-4">
          <div className="h-[230px] w-full justify-center overflow-hidden rounded-3xl border-[1px] border-neutral-700 border-opacity-80 sm:w-[230px] md:justify-start">
            <ImageCustom
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
            <TagMultiple
              title={t("genre")}
              tags={gameTags}
            />
            <TagSingular
              title={`${t("play_count_title")}`}
              label={
                gameData && gameData.play_total_count
                  ? gameData.play_total_count.toString()
                  : ""
              }
            />
          </div>
        </div>
        {gameData && (
          <div className="flex justify-center">
            <ButtonGame
              description={"ready to go. Let's start the game!"}
              textButton="Start"
              url={gameData.game_url}
            />
          </div>
        )}
        <Typography
          className="mt-3 text-center text-sm uppercase text-neutral-500"
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: t("game_story_text")
          }}
        />
      </div>
    </div>
  )
}

export default memo(StoryLobby)
