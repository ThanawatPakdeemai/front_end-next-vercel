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
import { useRouter } from "next/router"
import useCountPlayGame from "@feature/game/containers/hooks/useCountPlayGame"
import useProfileStore from "@stores/profileStore"
import { useToast } from "@feature/toast/containers"
import CONFIGS from "@configs/index"
import Helper from "@utils/helper"
import { MESSAGES } from "@constants/messages"

const StoryLobby = () => {
  const { t } = useTranslation()
  const profile = useProfileStore((state) => state.profile.data)
  const data = useGameStore((state) => state.data)
  const [gameData, setGameData] = useState<IGame>()
  const route = useRouter()
  const { errorToast } = useToast()

  useEffect(() => {
    let load = false

    if (!load) {
      if (data) setGameData(data)
    }

    return () => {
      load = true
    }
  }, [data])

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
          category.slug ? category.slug : category.name.toLocaleLowerCase()
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

  const { gameDataCount } = useCountPlayGame(gameData?._id ?? "")

  const onPlayGame = async () => {
    if (gameData && profile) {
      /**
       * @description Send value play time to API before play game
       */
      if (!gameDataCount?.status) {
        errorToast(MESSAGES["room-id-not-found"])
      }
      const room_id = null
      const frontendUrl = `${CONFIGS.BASE_URL.FRONTEND}/${route.query.typeGame}/${gameData.path}/summary/${room_id}`
      const profile_id = profile.id
      const room_number = null
      const item_size = null
      const { email } = profile
      const token = Helper.getTokenFromLocal()
      const rank_name = null
      const date = null
      const stage_id = null
      const profile_name = profile.username
      const type_play = gameData.play_to_earn === true ? "free" : "not_free"

      window.location.href = `${CONFIGS.BASE_URL.GAME}/${
        gameData.id
      }/?${Helper.makeID(8)}${btoa(
        `${room_id}:|:${profile_id}:|:${item_size}:|:${email}:|:${token}:|:${frontendUrl}:|:${CONFIGS.BASE_URL.API?.slice(
          0,
          -4
        )}:|:${rank_name}:|:${room_number}:|:${date}:|:${stage_id}:|:${profile_name}:|:${type_play}`
      )}`
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto md:w-[578px]">
        <div className="mb-4 flex flex-wrap gap-4 sm:flex-nowrap">
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
              url=""
              onClick={onPlayGame}
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
