import { CardBody } from "@components/molecules/cardBody"
import { IGame } from "@feature/game/interfaces/IGameService"
import { IGameTag } from "@feature/home/interfaces/IHomeService"
import React from "react"
import CardFooterSlide from "../molecules/CardFooterSlide"
import CardGameTags from "../molecules/GameTags"

export interface ICardContentSlide {
  slide: IGame
}

const CardContentSlide = ({ slide }: ICardContentSlide) => {
  const gameTags: IGameTag[] = []
  gameTags.push({
    name: slide.category.name,
    link: `category/${slide.category.slug}`
  })
  gameTags.push({
    name: slide.game_type,
    link: `${slide.game_type}`
  })
  gameTags.push({
    name: slide.game_free_status ? "Free" : "",
    link: `/free-to-play-games`
  })
  gameTags.push({
    name: slide.hot_game_status ? "Hot" : "",
    link: `/play-to-earn-games`
  })

  return (
    <div className="slide-item--content bg-black-02 my-4 flex flex-col justify-between rounded-2xl p-6 md:my-0 md:h-full md:rounded-3xl md:p-8">
      <CardGameTags gameTags={gameTags} />
      <CardBody
        title={slide.name}
        description={slide.banner_description}
      />
      <CardFooterSlide link={slide.path} />
    </div>
  )
}

export default CardContentSlide
