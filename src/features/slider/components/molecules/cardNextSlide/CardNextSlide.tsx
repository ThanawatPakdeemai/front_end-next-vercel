import { CardMedia, Typography } from "@mui/material"
import React from "react"

import { IGame } from "@feature/game/interfaces/IGameService"
import { ProgressBarSlide } from "../../atoms/progressBarSlide"
import { NextButtonSlide } from "../../atoms/nextButtonSlide"

export interface ICardNextSlide {
  slideNext: IGame
  gotoNext?: () => void
}

export default function CardNextSlide({ slideNext, gotoNext }: ICardNextSlide) {
  return (
    <button
      onClick={gotoNext}
      type="button"
      className="slide-next relative flex w-full items-center gap-4 rounded-3xl border-[1px] border-white-default/20 p-4 text-left"
    >
      <div className="slide-next--image w-1/3">
        <CardMedia
          component="img"
          width={200}
          height={200}
          image={slideNext.image_category_list}
          alt={slideNext.name}
        />
      </div>
      <div className="slide-next--content relative w-3/4">
        <NextButtonSlide />
        <Typography variant="h3">{slideNext.name}</Typography>
        <ProgressBarSlide />
      </div>
    </button>
  )
}
