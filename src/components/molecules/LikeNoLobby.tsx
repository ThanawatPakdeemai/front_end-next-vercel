import ButtonLike from "@components/atoms/button/ButtonLike"
import { Image } from "@components/atoms/image/index"
import React from "react"
import GaugeStats from "./GaugeStats"

interface IProp {
  value: number
  maxValue?: number
  imgSrc?: string
  imgAlt?: string
}

/**
 *
 * @description default maxValue is 100
 */

const LikeNoLobby = ({ value, maxValue, imgSrc, imgAlt }: IProp) => (
  <div>
    <div className="mb-3 flex w-full flex-col gap-4 rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px]">
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
    <div className="flex h-[218px] w-full justify-center rounded-lg border-[1px] border-neutral-700 border-opacity-80 p-4 md:w-[218px] md:justify-start">
      <Image
        src={imgSrc || "/images/gameDetails/nakamoto-wars.webp"}
        alt={imgAlt || "nakamoto-wars"}
        width={186}
        height={186}
      />
    </div>
  </div>
)

export default LikeNoLobby
