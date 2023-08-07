import React, { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Image } from "@components/atoms/image"
import useGameStore from "@stores/game"
import { IGame } from "@feature/game/interfaces/IGameService"
import { Chip, Typography } from "@mui/material"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import TagMultiple from "@components/molecules/TagMultiple"
import TagSingular from "@components/molecules/TagSingular"
import ButtonGame from "@feature/game/components/molecules/ButtonGame"
import useGlobal from "@hooks/useGlobal"

interface IStoryLobbyProps {
  hideButtonPlay?: boolean
  hideImage?: boolean
  hideHeader?: boolean
}

const StoryLobby = ({
  hideButtonPlay = false,
  hideImage = false,
  hideHeader = false
}: IStoryLobbyProps) => {
  const { t } = useTranslation()
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()
  const { handleClickPlayGameStoryMode } = useGlobal()

  /**
   * @description Push game tags to array
   */
  const gameTags: IGameTag[] = []
  if (gameData && gameData.category_list && gameData.category_list.length > 0) {
    gameData.category_list.map((category) =>
      gameTags.push({
        id: category.id,
        name: category.name,
        link: `/categories/${
          category.slug
            ? `${category.slug}?id=${category.id}`
            : `${category.name.toLocaleLowerCase().split(" ")[1]}?id=${
                category.id
              }`
        }`
      })
    )
  } else if (gameData && gameData.category) {
    const _categorySlug = gameData.category.name.split(" ")
    gameTags.push({
      id: gameData.category.id,
      name: gameData.category.name,
      link: `categories/${_categorySlug[1].toLocaleLowerCase()}`
    })
  }

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) setGameData(data)
    }

    return () => {
      load = true
    }
  }, [data])

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto md:w-[578px]">
        <div className="mb-4 flex flex-wrap gap-4 sm:flex-nowrap">
          {!hideImage && (
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
          )}
          <div className="w-full flex-1 rounded-3xl border-[1px] border-neutral-700 border-opacity-80 bg-neutral-780 p-4 sm:w-[calc(100%-230px)]">
            {!hideHeader && (
              <>
                <Chip
                  label={gameData?.game_type}
                  size="small"
                  color="info"
                  className="mb-4 font-bold uppercase"
                />
                <h1 className="font-neue-machina text-lg font-bold uppercase text-white-default">
                  {gameData?.name}
                </h1>
                <div className="mb-4 mt-6 border-b-[1px] border-neutral-700" />
              </>
            )}

            <TagMultiple
              title={`${t("genre")}`}
              tags={gameTags}
            />
            <TagSingular
              title={`${t("play_count_title")}`}
              label={gameData?.play_total_count?.toString() || ""}
            />
          </div>
        </div>
        {!hideButtonPlay && (
          <>
            {gameData && (
              <div className="flex justify-center">
                <ButtonGame
                  description={"ready to go. Let's start the game!"}
                  textButton="Start"
                  url=""
                  onClick={() => handleClickPlayGameStoryMode(gameData)}
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
          </>
        )}
      </div>
    </div>
  )
}

export default memo(StoryLobby)
