import { Typography } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { IGame } from "@feature/game/interfaces/IGameService"

const ImageCustom = dynamic(() => import("@components/atoms/image/Image"), {
  suspense: true,
  ssr: false
})
const NextButtonSlide = dynamic(() => import("../atoms/NextButtonSlide"), {
  suspense: true,
  ssr: false
})

export interface ICardNextSlide {
  slideNext: IGame
  gotoNext?: () => void
}

export default function CardNextSlide({ slideNext, gotoNext }: ICardNextSlide) {
  return (
    <button
      onClick={gotoNext}
      type="button"
      aria-label="gotoNext"
      className="slide-next relative flex w-full items-center gap-4 rounded-3xl border-[1px] border-white-default/20 p-4 text-left"
    >
      <div className="slide-next--image w-1/3 overflow-hidden rounded-xl">
        <ImageCustom
          width={200}
          height={200}
          src={slideNext?.image_category_list || slideNext?.image_room}
          alt={slideNext?.name}
        />
      </div>
      <div className="slide-next--content relative w-3/4">
        <NextButtonSlide />
        <Typography
          variant="h3"
          className="text-sm"
        >
          {slideNext?.name}
        </Typography>
        {/* <ProgressBarSlide /> */}
      </div>
    </button>
  )
}
