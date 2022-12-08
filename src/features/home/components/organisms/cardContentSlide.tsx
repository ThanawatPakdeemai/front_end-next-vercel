import GAME_TAGS from "@constants/gameTags"
import React from "react"
import CardBodySlide, { ICardBodySlide } from "../molecules/cardBodySlide"
import CardFooterSlide from "../molecules/cardFooterSlide"
import CardGameTags from "../molecules/cardGameTags"

export interface ICardContentSlide extends ICardBodySlide {
  link: string
}

const CardContentSlide = ({ link, ...props }: ICardContentSlide) => (
  <div className="slide-item--content my-4 flex flex-col justify-between rounded-2xl bg-black-02 p-6 md:my-0 md:h-full md:rounded-3xl md:p-8">
    <CardGameTags gameTags={GAME_TAGS} />
    <CardBodySlide
      title={props.title}
      description={props.description}
    />
    <CardFooterSlide link={link} />
  </div>
)

export default CardContentSlide
