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
  /**
   * @description Push game tags to array
   */
  // TODO: change slide.category.id to slide.category.slug
  gameTags.push(
    {
      name: slide.category.name,
      link: `category/${slide.category.id}`
    },
    {
      name: slide.game_type,
      link: `/play-to-earn-games`
    },
    {
      name: slide.game_free_status ? "Free" : "",
      link: `/free-to-play-games`
    },
    {
      name: slide.hot_game_status ? "Hot" : "",
      link: `/play-to-earn-games`
    }
  )
  return (
    <div className="slide-item--content my-4 flex flex-col rounded-2xl bg-neutral-800 p-6 md:my-0 md:h-full md:rounded-3xl md:p-8">
      <GameTags gameTags={gameTags} />
      <CardBody
        title={slide.name}
        description={slide.banner_description}
      />
      <CardFooterSlide gameData={slide} />
    </div>
  )
}

export default CardContentSlide
