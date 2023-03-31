import ButtonLike from "@components/atoms/button/ButtonLike"
import { Image } from "@components/atoms/image/index"
import React from "react"
import GaugeStats from "./GaugeStats"

interface IProp {
  value: number
  maxValue?: number
  imgSrc?: string
  imgAlt?: string
  hideImage?: boolean
}

/**
 *
 * @description default maxValue is 100
 */

const LikeNoLobby = ({
  value,
  maxValue,
  imgSrc,
  imgAlt,
  hideImage = false
}: IProp) => (
  <div className="like-no_wrapper flex flex-[1_1_220px] gap-2 lg:block lg:flex-none lg:gap-0">
    <div className="like-no_score m-0 flex w-full flex-auto flex-col justify-center gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px] lg:mb-3 lg:flex-none">
      <GaugeStats
        value={value}
        maxValue={maxValue}
      />
      <span className="w-full text-center text-sm text-white-default">
        Did you like this game ?
      </span>
      <div className="flex w-full flex-row justify-center gap-2">
        <ButtonLike
          type="like"
          active={false}
          className="border-[1px] border-neutral-700 border-opacity-80 bg-neutral-700 p-4"
        />
        <ButtonLike
          type="unlike"
          active={false}
          className="border-[1px] border-neutral-700 border-opacity-60 bg-neutral-700 p-4"
        />
      </div>
    </div>
    {!hideImage && (
      <div className="like-no_image flex h-[218px] w-full justify-center rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px] md:justify-start">
        <Image
          src={imgSrc || "/images/gameDetails/nakamoto-wars.webp"}
          alt={imgAlt || "nakamoto-wars"}
          width={186}
          height={186}
          className="object-contain"
        />
      </div>
    )}
  </div>
)

export default LikeNoLobby
