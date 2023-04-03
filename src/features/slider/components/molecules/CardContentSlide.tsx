import { Box } from "@mui/material"
import GameTags from "@feature/slider/components/atoms/GameTags"
import CardBody from "@components/molecules/CardBody"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameTag } from "@feature/slider/interfaces/IGameTags"
import React from "react"
import CardFooterSlide from "./CardFooterSlide"

export interface ICardContentSlide {
  slide: IGame
}

const CardContentSlide = ({ slide }: ICardContentSlide) => {
  const gameTags: IGameTag[] = []
  const gameCategories: IGameTag[] = []

  /**
   * @description Push game tags to array
   */
  // TODO: change slide.category.id to slide.category.slug
  gameTags.push(
    {
      id: "1",
      name: slide.category.name,
      link: `categories/${
        slide.category.slug ||
        (slide.category.name.toLocaleLowerCase().split(" ") &&
        slide.category.name.toLocaleLowerCase().split(" ").length > 1
          ? slide.category.name.toLocaleLowerCase().split(" ")[1]
          : slide.category.name.toLocaleLowerCase().split(" ").join("-"))
      }`
    },
    {
      id: "2",
      name: slide.game_free_status ? "Free" : "",
      link: `/free-to-play-games`
    },
    {
      id: "3",
      name: slide.hot_game_status ? "Hot" : "",
      link: `/play-to-earn-games`
    }
  )

  slide.category_list &&
    slide.category_list.length > 0 &&
    slide.category_list.map((category) =>
      gameCategories.push({
        id: category.id,
        name: category.name,
        link: `categories/${
          category.slug
            ? category.slug
            : category.name.toLocaleLowerCase().split(" ").join("-")
        }?id=${category.id}`
      })
    )

  return (
    <div className="slide-item--content my-4 flex h-full flex-col rounded-2xl bg-neutral-800 p-6 text-sm md:my-0 md:!h-[24.313rem] md:rounded-3xl md:p-8">
      <Box
        sx={{
          "&>div": {
            marginBottom: "0.5rem"
          }
        }}
      >
        {gameTags && gameTags.length < 0 && (
          // This is the old category single
          <GameTags gameTags={gameCategories} />
        )}
        <GameTags gameTags={gameTags} />
      </Box>
      <CardBody
        title={slide.name}
        description={slide.banner_description}
      />
      <CardFooterSlide gameData={slide} />
    </div>
  )
}

export default CardContentSlide
