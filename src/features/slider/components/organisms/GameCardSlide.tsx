import { IGame } from "@feature/game/interfaces/IGameService"
import React from "react"
import useGameStore from "@src/stores/game/index"
import { ImageCustom } from "@components/atoms/image/Image"
import CardBuyItem from "@feature/gameItem/components/molecules/CardBuyItem"
import CardGameSlide, { ICardNextSlide } from "../molecules/CardGameSlide"

export interface IBannerCardSlide extends ICardNextSlide {
  slide: IGame
}

// eslint-disable-next-line no-unused-vars
const GameCardSlide = ({ slide, ...props }: IBannerCardSlide) => {
  // eslint-disable-next-line no-async-promise-executor
  const datagame = useGameStore((state) => state.data)
  return (
    <div className="slide-item relative h-full gap-4 align-middle text-white-default md:flex">
      <div className="slide-item--image h-full w-full overflow-hidden rounded-2xl md:w-3/5 xl:w-3/4">
        {datagame && (
          <ImageCustom
            width={300}
            height={300}
            src={datagame.image_background}
            // image="/images/gamePage/Image.png"
            alt={datagame.name}
          />
        )}
      </div>
      <div className="w-full justify-between md:flex md:w-3/5 md:flex-col md:gap-4 xl:w-1/4">
        <CardGameSlide
          slideNext={props.slideNext}
          gotoNext={props.gotoNext}
          gotoPrev={props.gotoPrev}
        />

        <CardBuyItem gameObject={datagame as IGame} />
      </div>
    </div>
  )
}

export default GameCardSlide
